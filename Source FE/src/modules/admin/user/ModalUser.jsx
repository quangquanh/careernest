import React, { useEffect, useState } from 'react';
import './ModalUser.scss';
import { db } from '../../../firebase/configFirebase';
import { CheckSquareOutlined } from "@ant-design/icons";
import { FooterToolbar, ModalForm, ProFormDatePicker, ProFormText, ProFormTextArea, ProFormSelect, ProTable } from "@ant-design/pro-components";
import { Button, Col, Form, Modal, Row, message } from "antd";
import { isMobile } from 'react-device-detect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDetailUser } from '../../../hooks/useDetailUer';
import withErrorBoundary from '../../../hoc/withErrorBoundary';
import ModalRoleSkeleton from '../../../components/skeleton/ModalRoleSkeleton';
import useFirebaseImage from '../../../hooks/useFireBaseImage';
import { getFirebaseImageUrl } from '../../../utils/getFirebaseImageURL';
import ImageUpload from '../../../components/image/ImageUpload';
import { toast } from 'react-toastify';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { putUpdateUser, postCreateNewUser } from '../../../services/userService';
import { Badge } from 'flowbite-react';
import { useCompanies } from '../../../hooks/useCompanies';

const ModalUser = ({ userId = '', setUserId = () => { }, openModal, setOpenModal, reloadTable }) => {
    const { res, isFetching, error, refetch } = useDetailUser(userId);
    const queryClient = useQueryClient()

    const [animation, setAnimation] = useState('open');
    const [form] = Form.useForm();
    const dataInit = res?.data ?? {};

    const [selectedRole, setSelectedRole] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [imageNameState, setImageName] = useState('');
    const imageRegex = /%2F(\S+)\?/gm.exec(avatar);
    const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
    const { imageURL, progress, handleOnchangeImage, handleDeleteImage } = useFirebaseImage("users", setImageName, imageNameState, imageName);

    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const { res: resCompanies, isFetching: isFetchingCompanies, refetch: refetchCompanies } = useCompanies(currentPage);
    const meta = resCompanies?.meta ?? {};
    const companies = resCompanies?.result?.length > 0 ? resCompanies.result : [];

    useEffect(() => {
        refetchCompanies();
    }, []);

    useEffect(() => {
        if (dataInit?.id) {
            setSelectedRole(dataInit?.role?.id);
            if (dataInit?.role?.id !== 2) {
                setAvatar(dataInit?.avatarUrl ? getFirebaseImageUrl(dataInit.avatarUrl, 'users') : '');
                form.setFieldsValue({
                    firstName: dataInit?.firstName,
                    lastName: dataInit?.lastName,
                    address: dataInit?.address,
                    dateOfBirth: dataInit?.dateOfBirth,
                    email: dataInit?.email,
                    phoneNumber: dataInit?.phoneNumber,
                    gender: dataInit?.gender,
                    role: dataInit?.role?.id,
                    company: dataInit?.company,
                });
            }
            else {
                setAvatar(dataInit?.avatarUrl ? getFirebaseImageUrl(dataInit.avatarUrl, 'companies') : '');
                form.setFieldsValue({
                    name: dataInit?.company?.name,
                    industry: dataInit?.company?.industry,
                    website: dataInit?.company?.website,
                    email: dataInit?.company?.email,
                    phone: dataInit?.company?.phone,
                    country: dataInit?.company?.country,
                    role: dataInit?.role?.id,
                    address: dataInit?.company?.address,
                });
            }

        }
    }, [dataInit]);

    useEffect(() => {
        if (imageURL)
            setAvatar(imageURL);
    }, [imageURL, setAvatar]);

    useEffect(() => {
        if (userId) return;
        setAvatar('');
        if (selectedCompany !== null)
            setSelectedCompany(null);
    }, [selectedRole])

    const mutation = useMutation({
        mutationFn: dataInit?.id ? putUpdateUser : postCreateNewUser,
        onSuccess: (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                if (userId)
                    queryClient.setQueryData(['detail_user', userId], res) //cập nhật data trong react-query-devtools
                message.success(dataInit?.id ? "Cập nhật user thành công" : "Thêm mới user thành công");
                handleReset();
                reloadTable();
                mutation.reset();
            } else {
                console.log(res?.data);
                toast.error(res?.data?.error);
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error?.message || 'Something wrong in Server');
        },
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên công ty",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button type="link" onClick={() => handleSelect(record)}> Chọn </Button>
            ),
        },
    ];

    useEffect(() => {
        if (selectedCompany?.id) {
            setAvatar(selectedCompany?.logoUrl ? getFirebaseImageUrl(selectedCompany?.logoUrl, 'companies') : '');
            form.setFieldsValue({
                name: selectedCompany?.name,
                industry: selectedCompany?.industry,
                website: selectedCompany?.website,
                email: selectedCompany?.email,
                phone: selectedCompany?.phone,
                country: selectedCompany?.country,
                address: selectedCompany?.address,
            });
        }
    }, [selectedCompany]);

    const handleSelect = (company) => {
        if (userId) return;
        setSelectedCompany(company);
        setVisible(false);
    };

    const submitUser = async (valuesForm) => {
        const data = userId ? { ...valuesForm, id: userId, avatar: imageName, role: { id: selectedRole } }
            :
            { ...valuesForm, avatar: imageName, role: { id: selectedRole } };

        if (userId && selectedRole === 2) {
            message.warning("Vui lòng cập nhật thông tin công ty bên trang Company!");
            return;
        }

        if (!userId && selectedRole === 2) { //nếu tạo mới "RECRUITER"
            const { avatar, email, name, password, phone, role } = data;
            await mutation.mutateAsync({
                avatar, email, firstName: name, password, phoneNumber: phone, role,
                company: { id: selectedCompany?.id }
            });
            return;
        }
        await mutation.mutateAsync(data);
    };

    const handleReset = async () => {
        form.resetFields();
        setUserId('');

        //add animation when closing modal
        setAnimation('close');
        await new Promise(r => setTimeout(r, 400));
        setOpenModal(false);
        setAnimation('open');
    };

    if (error) {
        console.log(error);
        return <></>
    }
    if (isFetching)
        return (<ModalRoleSkeleton />)
    return (
        <>
            <ModalForm
                title={dataInit?.id ? "Cập nhật User" : "Tạo mới User"}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    footer: null,
                    keyboard: false,
                    maskClosable: false,
                    className: `modal-user ${animation}`,
                    rootClassName: `modal-user-root ${animation}`
                }}
                onValuesChange={(changedValues) => {
                    if (changedValues?.role)
                        setSelectedRole(changedValues.role);
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitUser}
                initialValues={dataInit?.id ? dataInit : {}}
                submitter={{
                    render: (_, dom) => <FooterToolbar style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#fff', zIndex: 1000 }}>{dom}</FooterToolbar>,
                    submitButtonProps: {
                        icon: <CheckSquareOutlined />
                    },
                    searchConfig: {
                        resetText: "Hủy",
                        submitText: <>{dataInit?.id ? "Cập nhật" : "Tạo mới"}</>,
                    }
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <ProFormSelect label="Vai trò" name="role" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} options={[
                            { label: "ADMIN", value: 1 },
                            { label: "RECRUITER", value: 2 },
                            { label: "USER", value: 3 },
                        ]} placeholder="Chọn vai trò (Role)"
                        />
                    </Col>
                    {selectedRole === 2 && (
                        <>
                            {!userId &&
                                <Col span={12} className='flex items-center'>
                                    <Badge className='cursor-pointer' color="info" size='sm' onClick={() => setVisible(true)}>
                                        {selectedCompany ? selectedCompany.name : "Chọn công ty"}
                                    </Badge>
                                </Col>
                            }
                            {(selectedCompany !== null || dataInit?.id) &&
                                <>
                                    <Col span={24}>
                                        <div className="max-w-fit min-w-[250px] h-[250px] mx-auto mb-10">
                                            <ImageUpload
                                                className="h-full"
                                                image={avatar}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}><ProFormText label="Tên công ty" name="name" disabled /></Col>
                                    <Col span={12}><ProFormText label="Loại hình" name="industry" disabled /></Col>
                                    <Col span={12}><ProFormText label="Website" name="website" disabled /></Col>
                                    <Col span={12}><ProFormText label="Email" name="email" disabled /></Col>
                                    <Col span={12}><ProFormText label="Số điện thoại" name="phone" disabled /></Col>
                                    <Col span={12}>
                                        <ProFormSelect disabled label="Quốc gia" name="country"
                                            options={[
                                                { label: "Việt Nam", value: "Viet Nam" },
                                                { label: "Singapore", value: "Singapore" },
                                                { label: "Hoa kỳ", value: "USA" },
                                            ]} />
                                    </Col>
                                    <Col span={12}>
                                        <ProFormTextArea
                                            label="Địa chỉ"
                                            name="address"
                                            disabled
                                            fieldProps={{
                                                autoSize: { minRows: 3 }
                                            }}
                                        />
                                    </Col>
                                    {!userId &&
                                        <Col span={12}>
                                            <ProFormText.Password
                                                name="password"
                                                label="Mật khẩu"
                                                placeholder="Nhập mật khẩu"
                                                rules={[
                                                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                                                    {
                                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                        message: "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt!",
                                                    },
                                                ]}
                                            />
                                        </Col>
                                    }
                                </>
                            }
                            {visible &&
                                <Modal
                                    title="Chọn công ty"
                                    open={visible}
                                    onCancel={() => setVisible(false)}
                                    footer={null}
                                >
                                    {!isFetchingCompanies &&
                                        <ConfigProvider locale={viVN}>
                                            <ProTable
                                                columns={columns}
                                                dataSource={companies}
                                                rowKey="id"
                                                pagination={
                                                    {
                                                        current: currentPage,
                                                        pageSize: meta?.pageSize,
                                                        showSizeChanger: true,
                                                        total: meta?.total,
                                                        showTotal: (total, range) => { return (<div></div>) },
                                                        onChange: (page, pageSize) => {
                                                            setCurrentPage(page);
                                                        }

                                                    }
                                                }
                                                search={false}
                                            />
                                        </ConfigProvider>
                                    }
                                </Modal>
                            }
                        </>
                    )}

                    {selectedRole !== 2 && selectedRole !== null &&
                        <>
                            <Col span={24}>
                                <div className="max-w-fit min-w-[250px] h-[250px] mx-auto mb-10">
                                    <ImageUpload
                                        className="h-full"
                                        onChange={handleOnchangeImage}
                                        handleDeleteImage={() => { setAvatar(''); handleDeleteImage(); }}
                                        progress={progress}
                                        image={avatar}
                                        imageName={imageName}
                                    />
                                </div>
                            </Col>
                            <Col span={12}><ProFormText label="Họ & Tên đệm" name="lastName" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập họ và tên đệm" /></Col>
                            <Col span={12}><ProFormText label="Tên" name="firstName" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập tên" /></Col>
                            <Col span={12}>
                                <ProFormText
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    rules={[
                                        { required: true, message: 'Vui lòng không bỏ trống' },
                                        { pattern: /^0\d{9}$/, message: 'Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số' }
                                    ]}
                                    placeholder="Nhập số điện thoại"
                                />
                            </Col>
                            {userId ? <Col span={12}><ProFormText label="Email" name="email" disabled /></Col>
                                : <Col span={12}><ProFormText label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]} placeholder="Nhập email của bạn" /></Col>
                            }
                            {!userId &&
                                <Col span={12}>
                                    <ProFormText.Password
                                        name="password"
                                        label="Mật khẩu"
                                        placeholder="Nhập mật khẩu"
                                        rules={[
                                            { required: true, message: "Vui lòng nhập mật khẩu!" },
                                            {
                                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                message: "Mật khẩu phải có ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt!",
                                            },
                                        ]}
                                    />
                                </Col>
                            }
                            <Col span={12}>
                                <ConfigProvider locale={viVN}>
                                    <ProFormDatePicker
                                        label="Ngày sinh"
                                        name="dateOfBirth"
                                        placeholder="Chọn ngày sinh"
                                        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                                        transform={(value) => ({ dateOfBirth: value ? new Date(value) : null })}
                                    />
                                </ConfigProvider>
                            </Col>
                            <Col span={12}>
                                <ProFormSelect label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} options={[
                                    { label: "Nam", value: "MALE" },
                                    { label: "Nữ", value: "FEMALE" },
                                ]} placeholder="Chọn giới tính" />
                            </Col>
                            <Col span={24}>
                                <ProFormTextArea
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                    placeholder="Nhập địa chỉ công ty"
                                    fieldProps={{
                                        autoSize: { minRows: 3 }
                                    }}
                                />
                            </Col>
                        </>
                    }

                    {/* <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormSwitch label="Trạng thái" name="isActive" checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" initialValue fieldProps={{ defaultChecked: true }} />
                    </Col> */}
                </Row>
            </ModalForm>
        </>
    );
};

export default withErrorBoundary(ModalUser);
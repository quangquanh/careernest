import React, { useEffect, useRef, useState } from 'react';
import './ModalCompany.scss';
import { db } from '../../../firebase/configFirebase';
import { CheckSquareOutlined } from "@ant-design/icons";
import { FooterToolbar, ModalForm, ProCard, ProFormText, ProFormTextArea, ProFormSelect, ProFormSwitch, ProFormDigit } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import ReactQuill from 'react-quill';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDetailCompany } from '../../../hooks/useDetailCompany';
import withErrorBoundary from '../../../hoc/withErrorBoundary';
import ModalRoleSkeleton from '../../../components/skeleton/ModalRoleSkeleton';
import { useSkills } from '../../../hooks/useSkills';
import useFirebaseImage from '../../../hooks/useFireBaseImage';
import { getFirebaseImageUrl } from '../../../utils/getFirebaseImageURL';
import ImageUpload from '../../../components/image/ImageUpload';
import { postCreateNewCompany, putUpdateCompany } from '../../../services/companyService';
import { toast } from 'react-toastify';

const ModalCompany = ({ companyId = '', setCompanyId = () => { }, openModal, setOpenModal, reloadTable }) => {
    const { res, isFetching, error, refetch } = useDetailCompany(companyId);
    const { res: resSkills, isLoading: isLoadingSkills } = useSkills();
    const queryClient = useQueryClient()

    const [animation, setAnimation] = useState('open');
    const descriptionRef = useRef("");
    const [form] = Form.useForm();
    const dataInit = res?.data ?? {};

    const [logoUrl, setLogoUrl] = useState('');
    const [imageNameState, setImageName] = useState('');
    const imageRegex = /%2F(\S+)\?/gm.exec(logoUrl);
    const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
    const { imageURL, progress, handleOnchangeImage, handleDeleteImage } = useFirebaseImage("companies", setImageName, imageNameState, imageName);

    useEffect(() => {
        if (dataInit?.id) {
            setLogoUrl(dataInit?.logoUrl ? getFirebaseImageUrl(dataInit.logoUrl, 'companies') : '');
            descriptionRef.current = dataInit?.description ?? '';
            form.setFieldsValue({
                name: dataInit.name,
                address: dataInit.address,
                industry: dataInit.industry,
                website: dataInit.website,
                email: dataInit.email,
                phone: dataInit.phone,
                country: dataInit.country,
                expertise: dataInit.expertise,
                city: dataInit.city,
                size: dataInit.size,
                foundedYear: dataInit.foundedYear,
                isActive: dataInit.isActive || false
            });
        }
    }, [dataInit]);

    useEffect(() => {
        if (imageURL)
            setLogoUrl(imageURL);
    }, [imageURL, setLogoUrl]);

    const handleChangeQuill = (content) => {
        descriptionRef.current = content;
    };

    const transformData = (data) => data.length > 0 ? data.map(({ name }) => ({ label: name, value: name, desc: name })) : [];
    const mutation = useMutation({
        mutationFn: dataInit?.id ? putUpdateCompany : postCreateNewCompany,
        onSuccess: (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                if (companyId)
                    queryClient.setQueryData(['detail_company', companyId], res) //cập nhật data trong react-query-devtools
                message.success(dataInit?.id ? "Cập nhật công ty thành công" : "Thêm mới công ty thành công");
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

    const submitCompany = async (valuesForm) => {
        const data = companyId ? { id: companyId, logoUrl: imageName, description: descriptionRef.current, ...valuesForm }
            :
            { ...valuesForm, logoUrl: imageName, description: descriptionRef.current };
        await mutation.mutateAsync(data);
    };

    const handleReset = async () => {
        form.resetFields();
        descriptionRef.current = '';
        setCompanyId('');

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
    if (isFetching || isLoadingSkills)
        return (<ModalRoleSkeleton />)
    return (
        <>
            <ModalForm
                title={dataInit?.id ? "Cập nhật Company" : "Tạo mới Company"}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    footer: null,
                    keyboard: false,
                    maskClosable: false,
                    className: `modal-company ${animation}`,
                    rootClassName: `modal-company-root ${animation}`
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitCompany}
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
                    <Col span={24}>
                        <div className="max-w-fit min-w-[300px] h-[300px] mx-auto mb-10">
                            <ImageUpload
                                className="h-full"
                                onChange={handleOnchangeImage}
                                handleDeleteImage={() => { setLogoUrl(''); handleDeleteImage(); }}
                                progress={progress}
                                image={logoUrl}
                                imageName={imageName}
                            />
                        </div>
                    </Col>
                    <Col span={12}><ProFormText label="Tên công ty" name="name" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập tên công ty" /></Col>
                    <Col span={12}><ProFormText label="Loại hình" name="industry" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập loại hình công ty" /></Col>
                    <Col span={12}><ProFormText label="Website" name="website" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập website công ty" /></Col>
                    <Col span={12}><ProFormText label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]} placeholder="Nhập email công ty" /></Col>
                    <Col span={12}><ProFormText label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập số điện thoại" /></Col>
                    <Col span={12}>
                        <ProFormSelect label="Quốc gia" name="country" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} options={[
                            { label: "Việt Nam", value: "Viet Nam" },
                            { label: "Singapore", value: "Singapore" },
                            { label: "Hoa kỳ", value: "USA" },
                        ]} placeholder="Chọn quốc gia" />
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
                    <Col span={12}>
                        <ProFormSelect
                            label="Chuyên môn"
                            name="expertise"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Chọn chuyên môn"
                            options={transformData(resSkills?.data ?? [])} // Mảng chuyên môn gốc
                            mode="multiple"
                            fieldProps={{
                                optionRender: (option) => (
                                    <div className='text-blue-500'>
                                        {option.data.desc}
                                    </div>
                                ),
                                style: { width: '100%' },
                            }}
                        />
                    </Col>
                    <Col span={12}>
                        <ProFormSelect label="Tỉnh/Thành phố" name="city" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} options={[
                            { label: "Hà Nội", value: "Ha Noi" },
                            { label: "TP. Hồ Chí Minh", value: "Ho Chi Minh" },
                            { label: "Đà Nẵng", value: "Da Nang" },
                            { label: "Cần Thơ", value: "Can Tho" },
                            { label: "Huế", value: "Hue" }
                        ]} placeholder="Chọn tỉnh/thành phố" />
                    </Col>
                    <Col span={12}><ProFormText label="Quy mô" name="size" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập quy mô công ty" /></Col>
                    <Col span={12}><ProFormDigit label="Năm thành lập" name="foundedYear" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập năm thành lập" min={1900} max={new Date().getFullYear()} /></Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormSwitch label="Trạng thái" name="isActive" checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" initialValue fieldProps={{ defaultChecked: true }} />
                    </Col>
                    <Col span={24}>
                        <ProCard title="Miêu tả" headStyle={{ color: '#d81921' }} bordered>
                            <ReactQuill
                                theme="snow"
                                value={descriptionRef.current}
                                onChange={handleChangeQuill}
                            />
                        </ProCard>
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default withErrorBoundary(ModalCompany);
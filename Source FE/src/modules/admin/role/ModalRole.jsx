import { FooterToolbar, ModalForm, ProCard, ProFormSwitch, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { CheckSquareOutlined } from "@ant-design/icons";
import { useEffect } from 'react';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { usePermissions } from "../../../hooks/usePermissions";
import withErrorBoundary from "../../../hoc/withErrorBoundary";
import ModalRoleSkeleton from "../../../components/skeleton/ModalRoleSkeleton";
import ModuleApi from "./ModuleAPI";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreateNewRole, putUpdateRole } from "../../../services/roleService";
import { toast } from "react-toastify";
import { useDetailRole } from "../../../hooks/useDetailRole";
import { Spinner } from "flowbite-react";

const ModalRole = ({ roleId = '', setRoleId = () => { }, openModal, setOpenModal, reloadTable }) => {
    const { res: resDetailRole, isFetching: isFetchingDetailRole, error: errorDetailRole, refetch: refetchDetailRole } = useDetailRole(roleId);
    const [form] = Form.useForm();
    const { res, isLoading, isFetching, error, refetch } = usePermissions();
    const queryClient = useQueryClient()

    const groupByPermission = (data) => {
        const groupedData = groupBy(data, x => x.module);
        return map(groupedData, (value, key) => ({ module: key, permissions: value }));
    };

    const singleRole = {
        id: resDetailRole?.data?.id ?? '',
        name: resDetailRole?.data?.name ?? '',
        description: resDetailRole?.data?.description ?? '',
        active: resDetailRole?.data?.active ?? false,
        permissions: resDetailRole?.data?.permissions ?? []
    }

    const listPermissions = res?.data?.length > 0 ? groupByPermission(res?.data) : [];

    useEffect(() => {
        if (listPermissions?.length && singleRole?.id) {
            form.setFieldsValue({
                name: singleRole.name,
                active: singleRole.active,
                description: singleRole.description
            });

            const userPermissions = groupByPermission(singleRole?.permissions);
            let permissionValues = {};

            listPermissions.forEach(x => {
                let allCheck = true;
                x?.permissions?.forEach(y => {
                    const temp = userPermissions.find(z => z.module === x.module);
                    if (temp?.permissions?.some(k => k.id === y.id)) {
                        permissionValues[y.id] = true;
                    } else {
                        allCheck = false;
                        permissionValues[y.id] = false;
                    }
                });
                permissionValues[x.module] = allCheck;
            });

            // Đặt toàn bộ giá trị của permissions vào form cùng lúc
            form.setFieldsValue({ permissions: permissionValues });
        }
    }, [listPermissions, singleRole]);

    const mutation = useMutation({
        mutationFn: singleRole?.id ? putUpdateRole : postCreateNewRole,
        onSuccess: (res) => {
            if (+res?.statusCode === 200) {
                if (roleId)
                    queryClient.setQueryData(['detail_role', roleId], res) //cập nhật data trong react-query-devtools
                message.success(singleRole?.id ? "Cập nhật role thành công" : "Thêm mới role thành công");
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

    const submitRole = async (valuesForm) => {
        const { description, active, name, permissions } = valuesForm;
        const checkedPermissions = [];

        if (permissions) {
            for (const key in permissions) {
                if (/^[1-9][0-9]*$/.test(key) && permissions[key] === true) {
                    checkedPermissions.push({ id: key });
                }
            }
        }
        const role = roleId ? { id: roleId, name, description, active, permissions: checkedPermissions }
            :
            { name, description, active, permissions: checkedPermissions };
        await mutation.mutateAsync(role);
    };

    const handleReset = () => {
        form.resetFields();
        setOpenModal(false);
        setRoleId('');
    };

    if (error || errorDetailRole) {
        console.log(error || errorDetailRole);
        return <></>
    }
    if (isFetching || isLoading || isFetchingDetailRole)
        return (<ModalRoleSkeleton />)
    return (
        <ModalForm
            title={singleRole?.id ? "Cập nhật Role" : "Tạo mới Role"}
            open={openModal}
            modalProps={{
                onCancel: handleReset,
                afterClose: handleReset,
                destroyOnClose: true,
                width: isMobile ? "100%" : 900,
                keyboard: false,
                maskClosable: false
            }}
            scrollToFirstError
            preserve={false}
            form={form}
            onFinish={submitRole}
            submitter={{
                render: (_, dom) => <FooterToolbar style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#fff', zIndex: 1000 }}>{dom}</FooterToolbar>,
                submitButtonProps: { icon: <CheckSquareOutlined /> },
                searchConfig: {
                    resetText: "Hủy",
                    submitText: singleRole?.id ? "Cập nhật" : "Tạo mới",
                }
            }}
        >
            {mutation.isPending && (
                <div className="flex justify-center items-center absolute inset-0 bg-white bg-opacity-75 z-50">
                    <Spinner size="xl" />
                </div>
            )}
            <Row gutter={16}>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <ProFormText label="Tên Role" name="name" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập name" />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <ProFormSwitch label="Trạng thái" name="active" checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" initialValue fieldProps={{ defaultChecked: true }} />
                </Col>
                <Col span={24}>
                    <ProFormTextArea label="Miêu tả" name="description" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập miêu tả role" fieldProps={{ autoSize: { minRows: 2 } }} />
                </Col>
                <Col span={24}>
                    <ProCard title="Quyền hạn" subTitle="Các quyền hạn được phép cho vai trò này" headStyle={{ color: '#d81921' }} style={{ marginBottom: 20 }} headerBordered size="small" bordered>
                        <ModuleApi form={form} listPermissions={listPermissions} />
                    </ProCard>
                </Col>
            </Row>
        </ModalForm>
    );
};

export default withErrorBoundary(ModalRole);

import React from 'react';
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import withErrorBoundary from '../../../hoc/withErrorBoundary';
import { useMutation } from '@tanstack/react-query';
import { postCreateNewSkill } from '../../../services/skillService';
import { toast } from 'react-toastify';

const ModalSkill = ({ openModal = false, setOpenModal = () => { }, reloadTable = () => { } }) => {
    const [form] = Form.useForm();

    const mutation = useMutation({
        mutationFn: postCreateNewSkill,
        onSuccess: (res) => {
            if (+res?.statusCode === 200 || +res?.statusCode === 201) {
                message.success("Thêm mới skill thành công");
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

    const submitSkill = async (valuesForm) => {
        await mutation.mutateAsync(valuesForm);
    };

    const handleReset = () => {
        form.resetFields();
        setOpenModal(false);
    };

    return (
        <>
            <ModalForm
                title={"Tạo mới Skill"}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 600,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{"Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitSkill}
                initialValues={{}}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <ProFormText
                            label="Tên skill"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập tên skill"
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default withErrorBoundary(ModalSkill);
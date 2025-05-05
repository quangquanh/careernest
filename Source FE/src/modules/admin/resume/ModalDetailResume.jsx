import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Tag, Button, Select, Space } from 'antd';
import { FiFileText } from 'react-icons/fi';
import { getMainResumeUpload, putUpdateResume } from '../../../services/resumeService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const { Option } = Select;

const ModalDetailResume = ({ openModal = false, setOpenModal, detailResume = {}, setDetailResume = null, refetch = null }) => {
    const [localStatus, setLocalStatus] = useState(detailResume?.status || 'PENDING');

    useEffect(() => {
        // Cập nhật trạng thái khi detailResume thay đổi
        if (detailResume?.status) {
            setLocalStatus(detailResume.status);
        }
    }, [detailResume]);

    const handleClose = () => {
        setDetailResume(null);
        setOpenModal(false);
    };

    const handleStatusChange = (value) => {
        setLocalStatus(value);
    };
    const { url, email, rating, advantage, limit } = detailResume;

    const fullName = `${detailResume?.user?.lastName || ''} ${detailResume?.user?.firstName || ''}`.trim();

    const statusColor = {
        PENDING: 'default',
        REVIEWING: 'processing',
        APPROVED: 'success',
        REJECTED: 'error',
    }[localStatus] || 'default';

    const handleDownloadFile = async () => {
        try {
            let res = await getMainResumeUpload(url, 'resume');
            if (res) {
                const URL = window.URL.createObjectURL(res);
                const link = document.createElement('a');
                link.href = URL;
                link.download = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(URL);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message ?? 'Có lỗi khi download file!');
        }
    }

    const mutation = useMutation({
        mutationFn: putUpdateResume,
        onSuccess: (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                toast.success("Cập nhật hồ sơ thành công");
                refetch();
                mutation.reset();
                handleClose();
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

    const handleUpdateCV = async () => {
        const data = {
            id: detailResume?.id,
            url, email, advantage, rating, limit,
            user: { id: +detailResume?.user?.id },
            job: { id: +detailResume?.job?.id },
            status: localStatus
        }
        await mutation.mutateAsync(data);
    }

    return (
        <Modal
            open={openModal}
            onCancel={handleClose}
            footer={null}
            title={`Chi tiết hồ sơ - Ứng viên ${fullName || '—'}`}
            centered
            width={700}
            maskClosable
        >
            <Descriptions
                column={1}
                bordered
                labelStyle={{ fontWeight: 600, width: 200 }}
            >
                <Descriptions.Item label="Tên ứng viên">
                    {fullName || '—'}
                </Descriptions.Item>

                <Descriptions.Item label="File CV">
                    {url ? (
                        <a
                            href="#"
                            onClick={handleDownloadFile}
                            rel="noopener noreferrer"
                            className="text-blue-500 uppercase flex items-center gap-2"
                        >
                            <FiFileText className="text-xl" />
                            Xem file
                        </a>
                    ) : '—'}
                </Descriptions.Item>

                <Descriptions.Item label="Email">
                    {email || '—'}
                </Descriptions.Item>

                <Descriptions.Item label="Điểm CV (AI)">
                    <Tag color={rating > 70 ? 'green' : 'red'} style={{ fontSize: 16 }}>
                        {rating ?? '—'}
                    </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Điểm mạnh">
                    {advantage || '—'}
                </Descriptions.Item>

                <Descriptions.Item label="Điểm yếu">
                    {limit || '—'}
                </Descriptions.Item>

                <Descriptions.Item label="Trạng thái">
                    <Space>
                        <Tag
                            color={statusColor}
                            style={{
                                fontSize: 14,
                                padding: '4px 10px',
                                height: 'auto',
                                lineHeight: '22px',
                                borderRadius: '6px'
                            }}
                        >
                            {localStatus}
                        </Tag>
                        <Select
                            style={{ width: 160 }}
                            value={localStatus}
                            onChange={handleStatusChange}
                        >
                            <Option value="PENDING">PENDING</Option>
                            <Option value="REVIEWING">REVIEWING</Option>
                            <Option value="APPROVED">APPROVED</Option>
                            <Option value="REJECTED">REJECTED</Option>
                        </Select>
                    </Space>
                </Descriptions.Item>
            </Descriptions>

            <div className="text-right mt-4">
                <Button type="primary" onClick={handleUpdateCV}>
                    Cập nhật
                </Button>
            </div>
        </Modal>
    );
};

export default React.memo(ModalDetailResume);

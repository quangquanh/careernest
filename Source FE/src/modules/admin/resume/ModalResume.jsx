import './ModalResume.scss';
import React, { useRef, useState } from 'react';
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space, Tag } from "antd";
import queryString from 'query-string';
import { ALL_PERMISSIONS } from '../../../utils/constant';
import withErrorBoundary from '../../../hoc/withErrorBoundary';
import { toast } from 'react-toastify';
import { ModalForm, FooterToolbar } from '@ant-design/pro-components';
import { useJobResumes } from '../../../hooks/useJobResumes';
import DataTable from '../../client/DataTable';
import Access from '../../../components/share/Access';
import { convertMillisecondsToString } from '../../../utils/convertMiliSecondsToString';
import { isMobile } from 'react-device-detect';
import { CheckSquareOutlined } from "@ant-design/icons";
import viVN from 'antd/locale/vi_VN';
import ModalDetailResume from './ModalDetailResume';

const statusColorMap = {
    PENDING: 'default',
    REVIEWING: 'processing',
    APPROVED: 'green',
    REJECTED: 'red',
};

const ModalResume = ({ jobId = '', setJobId = null, openModal = false, setOpenModal = null }) => {
    const [animation, setAnimation] = useState('open');
    const [openDetailResumeModal, setOpenDetailResumeModal] = useState(false);
    const [detailResume, setDetailResume] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tableRef = useRef(null);

    const { res, isFetching, error, refetch } = useJobResumes(+jobId);

    const meta = res?.meta ?? {
        page: 1,
        pageSize: 6,
        pages: 0,
        total: res?.data?.length > 0 ? res.data.length : 0
    };
    const resumes = res?.data?.length > 0 ? res.data : [];

    const columns = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
            align: "center",
            render: (text, record, index) => {
                return (
                    <>
                        {(index + 1) + (currentPage - 1) * (meta.pageSize)}
                    </>)
            },
            hideInSearch: true,
        },
        {
            title: 'Email ứng viên',
            dataIndex: "email",
            hideInSearch: true,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            sorter: true,
            render: (text) => (
                <Tag color={statusColorMap[text] || 'default'} style={{ fontSize: '14px', padding: '4px 8px' }}>
                    {text}
                </Tag>
            ),
            hideInSearch: true,
        },
        {
            title: 'Job',
            dataIndex: ["job", "name"],
            hideInSearch: true,
        },
        {
            title: 'Advantage',
            dataIndex: "advantage",
            hideInSearch: true,
            render: (text) => (
                <p style={{ textAlign: 'justify', fontSize: '13px' }}>
                    {text?.length > 90 ? text.slice(0, 90) + "..." : text}
                </p>
            ),
        },

        {
            title: 'Limit',
            dataIndex: "limit",
            hideInSearch: true,
            render: (text) => (
                <p style={{ textAlign: 'justify', fontSize: '13px' }}>
                    {text?.length > 90 ? text.slice(0, 90) + "..." : text}
                </p>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag style={{ fontSize: '16px' }} color={entity.rating > 70 ? "lime" : "red"} >
                        {entity.rating}
                    </Tag>
                </>
            },
            hideInSearch: true,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{record?.createdAt ? convertMillisecondsToString(record.createdAt * 1000) : ""}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{record?.updatedAt ? convertMillisecondsToString(record.updatedAt * 1000) : ""}</>
                )
            },
            hideInSearch: true,
        },
        {

            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Access
                        permission={ALL_PERMISSIONS.JOBS.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => {
                                setDetailResume(entity);
                                setOpenDetailResumeModal(true);
                            }}
                        />
                    </Access>
                </Space>
            ),

        },
    ];

    const buildQuery = (params, sort, filter) => {
        const clone = { ...params };

        if (clone?.status?.length) {
            clone.filter = sfIn("status", clone.status).toString();
            delete clone.status;
        }

        clone.page = clone.current;
        clone.size = clone.pageSize;

        delete clone.current;
        delete clone.pageSize;

        let temp = queryString.stringify(clone);

        let sortBy = "";
        if (sort && sort.status) {
            sortBy = sort.status === 'ascend' ? "sort=status,asc" : "sort=status,desc";
        }

        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === 'ascend' ? "sort=createdAt,asc" : "sort=createdAt,desc";
        }
        if (sort && sort.updatedAt) {
            sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt,asc" : "sort=updatedAt,desc";
        }

        //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=updatedAt,desc`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        // temp += "&populate=companyId,jobId&fields=companyId.id, companyId.name, companyId.logo, jobId.id, jobId.name";
        return temp;
    }

    const handleReset = async () => {
        setJobId('')
        setAnimation('close');
        await new Promise(r => setTimeout(r, 400));
        setOpenModal(false);
    };

    if (error) {
        console.log(error);
        toast.error(error?.message || 'Đã xảy ra lỗi');
        return null;
    }

    return (
        <>
            <ConfigProvider locale={viVN}>
                <ModalForm
                    title={"Danh sách các CV ứng tuyển"}
                    open={openModal}
                    modalProps={{
                        onCancel: () => setOpenModal(false),
                        afterClose: () => handleReset(),
                        destroyOnClose: true,
                        width: isMobile ? "100%" : 1300,
                        footer: null,
                        keyboard: false,
                        maskClosable: false,
                        className: `modal-company ${animation}`,
                        rootClassName: `modal-company-root ${animation}`
                    }}
                    scrollToFirstError={true}
                    preserve={false}
                    submitter={{
                        render: (_, dom) => <FooterToolbar style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#fff', zIndex: 1000 }}>{dom}</FooterToolbar>,
                        submitButtonProps: {
                            icon: <CheckSquareOutlined />
                        },
                        searchConfig: {
                            resetText: "Cancel",
                            submitText: <>OK</>,
                        }
                    }}
                >
                    <Access permission={ALL_PERMISSIONS.JOBS.GET_PAGINATE} >
                        <DataTable
                            actionRef={tableRef}
                            rowKey="id"
                            loading={isFetching}
                            columns={columns}
                            dataSource={resumes}
                            request={async (params, sort, filter) => {
                                const query = buildQuery(params, sort, filter);
                            }}
                            scroll={{ x: true }}
                            pagination={
                                {
                                    current: currentPage,
                                    pageSize: meta?.pageSize,
                                    showSizeChanger: true,
                                    total: meta?.total,
                                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} hồ sơ ứng tuyển</div>) },
                                    onChange: (page, pageSize) => {
                                        setCurrentPage(page);
                                    }
                                }
                            }
                            rowSelection={false}
                            toolBarRender={(_action, _rows) => {
                                return (
                                    <Access
                                        permission={ALL_PERMISSIONS.JOBS.CREATE}
                                        hideChildren
                                    >
                                        <Button
                                            icon={<PlusOutlined />}
                                            type="primary"
                                            onClick={() => setOpenModal(true)}
                                        >
                                            Thêm mới
                                        </Button>
                                    </Access>
                                );
                            }}
                        />
                    </Access>
                </ModalForm>
            </ConfigProvider>

            {openDetailResumeModal &&
                <ModalDetailResume
                    detailResume={detailResume}
                    setDetailResume={setDetailResume}
                    openModal={openDetailResumeModal}
                    setOpenModal={setOpenDetailResumeModal}
                    refetch={refetch}
                />
            }
        </>
    );
};

export default withErrorBoundary(ModalResume);
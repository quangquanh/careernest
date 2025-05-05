import React, { useCallback, useRef, useState } from 'react';
import { db } from '../../firebase/configFirebase';;
import DataTable from '../../modules/client/DataTable';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, Tooltip, message } from "antd";
import queryString from 'query-string';
import { ALL_PERMISSIONS } from '../../utils/constant';
import Access from '../../components/share/Access';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { useJobs } from '../../hooks/useJobs';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ProFormSelect } from '@ant-design/pro-components';
import ModalJob from '../../modules/admin/job/ModalJob';
import { deleteJob } from '../../services/jobService';
import { useJobsByCompany } from '../../hooks/useJobsByCompany';
import { convertMillisecondsToString } from '../../utils/convertMiliSecondsToString';
import ModalResume from '../../modules/admin/resume/ModalResume';

const JobPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalResume, setOpenModalResume] = useState(false);
    const [jobId, setJobId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobName, setJobName] = useState('');
    const tableRef = useRef(null);

    const { res, isFetching, error, refetch } = useJobs(currentPage, jobName);
    const { res: resJobsByCompany, isFetching: isFetchJobsByCompany, error: errorJobsByCompany, refetch: refetchJobsByCompany }
        = useJobsByCompany(currentPage);

    const meta = res?.meta ?? {
        page: 1,
        pageSize: resJobsByCompany?.data?.size ?? 6,
        pages: resJobsByCompany?.data?.totalPages ?? 0,
        total: res?.data?.length > 0 ? res.data.length : resJobsByCompany?.data?.totalElements ? resJobsByCompany.data.totalElements : 0
    };

    const jobs = res?.result?.length > 0 ? res.result
        : resJobsByCompany?.data?.content?.length > 0
            ? resJobsByCompany.data.content
            : [];

    const mutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: async (res) => {
            if (+res?.statusCode === 200 || +res?.statusCode === 201) {
                message.success("Xóa thành công");
                reloadTable();
                mutation.reset();
            } else {
                console.log(res?.data ?? res);
                toast.error(`${res?.data?.error}: ${res?.data?.message}`);
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error?.message || 'Something wrong in Server');
        },
    });

    const handleDeleteJob = async (id) => {
        if (!id) return;
        await mutation.mutateAsync(+id);
    }

    const reloadTable = useCallback(() => {
        res?.result?.length > 0 ? refetch() : refetchJobsByCompany();
    }, []);

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
            title: 'Tên Job',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Công ty',
            dataIndex: ["company", "name"],
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            sorter: true,
            render(dom, entity, index, action, schema) {
                const str = "" + entity.salary;
                return <>{str?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} $</>
            },
        },
        {
            title: 'Level',
            dataIndex: 'level',
            renderFormItem: (item, props, form) => (
                <ProFormSelect
                    showSearch
                    mode="multiple"
                    allowClear
                    valueEnum={{
                        INTERN: 'INTERN',
                        FRESHER: 'FRESHER',
                        JUNIOR: 'JUNIOR',
                        MIDDLE: 'MIDDLE',
                        SENIOR: 'SENIOR',
                    }}
                    placeholder="Chọn level"
                />
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag color={entity.active ? "lime" : "red"} >
                        {entity.active ? "ACTIVE" : "INACTIVE"}
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
                                setJobId(entity?.id);
                                setOpenModal(true);
                            }}
                        />
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.JOBS.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa Job"}
                            description={"Bạn có chắc chắn muốn xóa Job này ?"}
                            onConfirm={() => handleDeleteJob(entity.id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 10px" }}>
                                <DeleteOutlined
                                    style={{
                                        fontSize: 20,
                                        color: '#ff4d4f',
                                    }}
                                />
                            </span>
                        </Popconfirm>
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.JOBS.UPDATE}
                        hideChildren
                    >
                        <Tooltip title="Xem danh sách ứng tuyển">
                            <EyeOutlined
                                style={{
                                    fontSize: 20,
                                    color: '#ffa500',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setJobId(entity?.id);
                                    setOpenModalResume(true);
                                }}
                            />
                        </Tooltip>
                    </Access>
                </Space>
            ),

        },
    ];

    const buildQuery = (params, sort, filter) => {

        const clone = { ...params };
        setJobName(clone?.name);

        let parts = [];
        if (clone.name) parts.push(`${clone.name}`);
        if (clone.salary) parts.push(`${clone.salary}`);
        if (clone?.level?.length) {
            parts.push(`${sfIn("level", clone.level).toString()}`);
        }

        clone.filter = parts.join(' and ');
        if (!clone.filter) delete clone.filter;

        clone.page = clone.current;
        clone.size = clone.pageSize;

        delete clone.current;
        delete clone.pageSize;
        delete clone.name;
        delete clone.salary;
        delete clone.level;

        let temp = queryString.stringify(clone);

        let sortBy = "";
        const fields = ["name", "salary", "createdAt", "updatedAt"];
        if (sort) {
            for (const field of fields) {
                if (sort[field]) {
                    sortBy = `sort=${field},${sort[field] === 'ascend' ? 'asc' : 'desc'}`;
                    break;  // Remove this if you want to handle multiple sort parameters
                }
            }
        }

        //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=updatedAt,desc`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    }

    if (error || errorJobsByCompany) {
        console.log(error || errorJobsByCompany);
        toast.error(error?.message || errorJobsByCompany?.message || 'Đã xảy ra lỗi');
        return null;
    }
    return (
        <>
            <Access permission={ALL_PERMISSIONS.JOBS.GET_PAGINATE} >
                <DataTable
                    actionRef={tableRef}
                    headerTitle="Danh sách các công việc"
                    rowKey="id"
                    loading={isFetching || isFetchJobsByCompany}
                    columns={columns}
                    dataSource={jobs}
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
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} công việc</div>) },
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
            {openModal &&
                <ModalJob
                    jobId={jobId}
                    setJobId={setJobId}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={reloadTable}
                />
            }
            {openModalResume &&
                <ModalResume
                    jobId={jobId}
                    setJobId={setJobId}
                    openModal={openModalResume}
                    setOpenModal={setOpenModalResume}
                />
            }
        </>
    );
};

export default withErrorBoundary(JobPage);
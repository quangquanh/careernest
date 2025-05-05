import React, { useCallback, useRef, useState } from 'react';
import { db } from '../../firebase/configFirebase';;
import DataTable from '../../modules/client/DataTable';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, message } from "antd";
import queryString from 'query-string';
import { ALL_PERMISSIONS } from '../../utils/constant';
import Access from '../../components/share/Access';
import { sfLike } from "spring-filter-query-builder";
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { useCompanies } from '../../hooks/useCompanies';
import ModalCompany from '../../modules/admin/company/ModalCompany';
import { useMutation } from '@tanstack/react-query';
import { deleteCompany } from '../../services/companyService';
import { toast } from 'react-toastify';
import { convertMillisecondsToString } from '../../utils/convertMiliSecondsToString';

const CompanyPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [companyId, setCompanyId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const tableRef = useRef(null);

    const { res, isFetching, error, refetch } = useCompanies(currentPage);

    const meta = res?.meta ?? {};
    const companies = res?.result?.length > 0 ? res.result : [];

    const mutation = useMutation({
        mutationFn: deleteCompany,
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

    const handleDeleteCompany = async (id) => {
        await mutation.mutateAsync(+id);
    }

    const reloadTable = useCallback(() => {
        refetch();
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
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag color={entity.isActive ? "lime" : "red"} >
                        {entity.isActive ? "ACTIVE" : "INACTIVE"}
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
                        permission={ALL_PERMISSIONS.COMPANIES.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => {
                                setCompanyId(entity?.id);
                                setOpenModal(true);
                            }}
                        />
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.COMPANIES.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa company"}
                            description={"Bạn có chắc chắn muốn xóa company này ?"}
                            onConfirm={() => handleDeleteCompany(entity.id)}
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
                </Space>
            ),

        },
    ];

    const buildQuery = (params, sort, filter) => {
        const clone = { ...params };
        const q = {
            page: params.current,
            size: params.pageSize,
            filter: ""
        }

        if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
        if (clone.address) {
            q.filter = clone.name ?
                q.filter + " and " + `${sfLike("address", clone.address)}`
                : `${sfLike("address", clone.address)}`;
        }


        if (!q.filter) delete q.filter;

        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name,asc" : "sort=name,desc";
        }
        if (sort && sort.address) {
            sortBy = sort.address === 'ascend' ? "sort=address,asc" : "sort=address,desc";
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

        return temp;
    }

    if (error)
        console.log(error);
    return (
        <>
            <Access permission={ALL_PERMISSIONS.COMPANIES.GET_PAGINATE} >
                <DataTable
                    actionRef={tableRef}
                    headerTitle="Danh sách các công ty"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={companies}
                    request={async (params, sort, filter) => {
                        const query = buildQuery(params, sort, filter);

                        // dispatch(fetchCompany({ query }))
                    }}
                    scroll={{ x: true }}
                    pagination={
                        {
                            current: currentPage,
                            pageSize: meta?.pageSize,
                            showSizeChanger: true,
                            total: meta?.total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} công ty</div>) },
                            onChange: (page, pageSize) => {
                                setCurrentPage(page);
                            }
                        }
                    }
                    rowSelection={false}
                    toolBarRender={(_action, _rows) => {
                        return (
                            <Access
                                permission={ALL_PERMISSIONS.COMPANIES.CREATE}
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
                <ModalCompany
                    companyId={companyId}
                    setCompanyId={setCompanyId}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={reloadTable}
                />
            }
        </>
    );
};

export default withErrorBoundary(CompanyPage);
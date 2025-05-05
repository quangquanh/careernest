import React, { useCallback, useRef, useState } from 'react';
import DataTable from '../../modules/client/DataTable';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import queryString from 'query-string';
import { ALL_PERMISSIONS } from '../../utils/constant';
import Access from '../../components/share/Access';
import { sfLike } from "spring-filter-query-builder";
import { useRoles } from '../../hooks/useRoles';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { convertTimeStampToString } from '../../utils/convertTimeStampToString';
import ModalRole from '../../modules/admin/role/ModalRole';
import { convertMillisecondsToString } from '../../utils/convertMiliSecondsToString';

const RolePage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [roleId, setRoleId] = useState('');
    const tableRef = useRef(null);

    const { res, isFetching, error, refetch } = useRoles();

    const meta = {
        page: 1,
        pageSize: 10,
        pages: 0,
        total: res?.data?.length > 0 ? res.data.length : 0
    };
    const roles = res?.data?.length > 0 ? res.data : [];

    const handleDeleteRole = async (id) => {
        message.warning("Không được xóa! Vì đây là 3 role bắt buộc.");
        // if (id) {
        //     const res = await callDeleteRole(id);
        //     if (res && res.statusCode === 200) {
        //         message.success('Xóa Role thành công');
        //         reloadTable();
        //     } else {
        //         notification.error({
        //             message: 'Có lỗi xảy ra',
        //             description: res.message
        //         });
        //     }
        // }
    }

    const reloadTable = useCallback(() => {
        refetch();
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 250,
            render: (text, record, index, action) => {
                return (
                    <span>
                        {record.id}
                    </span>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
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
                        permission={ALL_PERMISSIONS.ROLES.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => {
                                setRoleId(entity?.id);
                                setOpenModal(true);
                            }}
                        />
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.ROLES.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa role"}
                            description={"Bạn có chắc chắn muốn xóa role này ?"}
                            onConfirm={() => handleDeleteRole(entity.id)}
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

        if (!q.filter) delete q.filter;

        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name,asc" : "sort=name,desc";
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
            <Access
                permission={ALL_PERMISSIONS.ROLES.GET_PAGINATE}
            >
                <DataTable
                    actionRef={tableRef}
                    headerTitle="Danh sách Roles (Vai Trò)"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={roles}
                    request={async (params, sort, filter) => {
                        const query = buildQuery(params, sort, filter);
                        // dispatch(fetchRole({ query }))
                    }}
                    scroll={{ x: true }}
                    pagination={
                        {
                            current: meta.page,
                            pageSize: meta.pageSize,
                            showSizeChanger: true,
                            total: meta.total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }
                    }
                    rowSelection={false}
                    toolBarRender={(_action, _rows) => {
                        return (
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Thêm mới
                            </Button>
                        );
                    }}
                />
            </Access>
            {openModal &&
                <ModalRole
                    roleId={roleId}
                    setRoleId={setRoleId}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={reloadTable}
                />}
        </>
    );
};

export default withErrorBoundary(RolePage);
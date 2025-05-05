import React, { useCallback, useRef, useState } from 'react';
import { db } from '../../firebase/configFirebase';;
import DataTable from '../../modules/client/DataTable';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";
import queryString from 'query-string';
import { ALL_PERMISSIONS } from '../../utils/constant';
import Access from '../../components/share/Access';
import { sfLike } from "spring-filter-query-builder";
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { convertTimeStampToString } from '../../utils/convertTimeStampToString';
import { useUsers } from '../../hooks/useUsers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ModalUser from '../../modules/admin/user/ModalUser';
import { deleteUser } from '../../services/userService';
import { convertMillisecondsToString } from '../../utils/convertMiliSecondsToString';

const UserPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const tableRef = useRef(null);

    const { res, isFetching, error, refetch } = useUsers();

    const meta = res?.meta ?? {
        page: 1,
        pageSize: 6,
        pages: 0,
        total: res?.data?.length > 0 ? res.data.length : 0
    };
    const users = res?.data?.length > 0 ? res.data : [];

    const mutation = useMutation({
        mutationFn: deleteUser,
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

    const handleDeleteUser = async (id) => {
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
            title: 'First Name',
            dataIndex: 'firstName',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },

        {
            title: 'Role',
            dataIndex: ["role", "name"],
            sorter: true,
            hideInSearch: true
        },

        {
            title: 'Company',
            dataIndex: ["company", "name"],
            sorter: true,
            hideInSearch: true
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
                        permission={ALL_PERMISSIONS.USERS.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => {
                                setUserId(entity?.id);
                                setOpenModal(true);
                            }}
                        />
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.USERS.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => handleDeleteUser(entity.id)}
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
        if (sort && sort.email) {
            sortBy = sort.email === 'ascend' ? "sort=email,asc" : "sort=email,desc";
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
            <Access permission={ALL_PERMISSIONS.USERS.GET_PAGINATE} >
                <DataTable
                    actionRef={tableRef}
                    headerTitle="Danh sách User"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={users}
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
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} user</div>) },
                            onChange: (page, pageSize) => {
                                setCurrentPage(page);
                            }
                        }
                    }
                    rowSelection={false}
                    toolBarRender={(_action, _rows) => {
                        return (
                            <Access
                                permission={ALL_PERMISSIONS.USERS.CREATE}
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
                <ModalUser
                    userId={userId}
                    setUserId={setUserId}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={reloadTable}
                />
            }
        </>
    );
};

export default withErrorBoundary(UserPage);
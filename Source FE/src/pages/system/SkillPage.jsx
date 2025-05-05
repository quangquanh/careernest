import React, { useCallback, useRef, useState } from 'react';
import DataTable from '../../modules/client/DataTable';
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import queryString from 'query-string';
import { sfLike } from "spring-filter-query-builder";
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { useSkills } from '../../hooks/useSkills';
import ModalSkill from '../../modules/admin/skill/ModalSkill';
import { convertMillisecondsToString } from '../../utils/convertMiliSecondsToString';

const SkillPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tableRef = useRef(null);

    const { res, isFetching, error, refetch } = useSkills();

    const meta = res?.meta ?? {
        page: 1,
        pageSize: 7,
        pages: 0,
        total: res?.data?.length > 0 ? res.data.length : 0
    };
    const skills = res?.data?.length > 0 ? res.data : [];

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
            title: 'Created By',
            dataIndex: 'createdBy',
            hideInSearch: true,
        },

        {
            title: 'Updated By',
            dataIndex: 'updatedBy',
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
                    <>{record?.updatedAt ? convertMillisecondsToString(record.updatedAt, true) : ""}</>
                )
            },
            hideInSearch: true,
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
            <DataTable
                actionRef={tableRef}
                headerTitle="Danh sách Skill"
                rowKey="id"
                loading={isFetching}
                columns={columns}
                dataSource={skills}
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
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} kĩ năng</div>) },
                        onChange: (page, pageSize) => {
                            setCurrentPage(page);
                        }
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
            {openModal &&
                <ModalSkill
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={reloadTable}
                />
            }
        </>
    );
};

export default withErrorBoundary(SkillPage);
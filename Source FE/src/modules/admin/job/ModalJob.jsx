import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ModalJob.scss';
import { CheckSquareOutlined } from "@ant-design/icons";
import { FooterToolbar, ModalForm, ProCard, ProFormText, ProFormSelect, ProFormSwitch, ProFormDigit, ProFormSlider, ProFormDatePicker, ProTable } from "@ant-design/pro-components";
import { Button, Col, ConfigProvider, Form, Modal, Row, message, } from "antd";
import viVN from 'antd/locale/vi_VN';
import { isMobile } from 'react-device-detect';
import ReactQuill from 'react-quill';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import withErrorBoundary from '../../../hoc/withErrorBoundary';
import ModalRoleSkeleton from '../../../components/skeleton/ModalRoleSkeleton';
import { toast } from 'react-toastify';
import { useDetailJob } from '../../../hooks/useDetatilJob';
import { isBefore, startOfToday } from 'date-fns';
import { useCompanies } from '../../../hooks/useCompanies';
import { Badge } from 'flowbite-react';
import { useSkills } from '../../../hooks/useSkills';
import { postCreateNewJob, putUpdateJob } from '../../../services/jobService';

const ModalJob = ({ jobId = '', setJobId = () => { }, openModal, setOpenModal, reloadTable }) => {
    const queryClient = useQueryClient()

    const { res, isFetching, error, refetch } = useDetailJob(jobId);
    const dataInit = res?.data ?? {};

    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const { res: resSkills, isFetchingSkills, error: errSkills } = useSkills();
    const { res: resCompanies, isFetching: isFetchingCompanies, error: errCompanies, refetch: refetchCompanies } = useCompanies(currentPage);
    const meta = resCompanies?.meta ?? {};
    const companies = resCompanies?.result?.length > 0 ? resCompanies.result : [];

    const [animation, setAnimation] = useState('open');
    const [, forceRender] = useState(0); // ép component render lại 1 lần, để hiển thị các text trong ReactQuil
    const descriptionRef = useRef("");
    const requirementRef = useRef("");
    const benefitRef = useRef("");

    const [form] = Form.useForm();

    useEffect(() => {
        refetchCompanies();
    }, []);

    const buildSkillsInitialSelect = (skillsArray) => {
        if (!Array.isArray(skillsArray)) return [];
        return skillsArray.map(item => item.id);
    };

    useEffect(() => {
        if (dataInit?.id) {
            descriptionRef.current = dataInit?.description ?? '';
            benefitRef.current = dataInit?.benefits ?? '';
            requirementRef.current = dataInit?.requirements ?? '';
            form.setFieldsValue({
                name: dataInit.name,
                location: dataInit.location,
                salary: dataInit.salary,
                quantity: dataInit.quantity,
                company: dataInit?.company?.name,
                skills: buildSkillsInitialSelect(dataInit?.skills),
                level: dataInit.level,
                jobType: dataInit.jobType,
                startDate: dataInit.startDate * 1000,
                endDate: dataInit.endDate * 1000,
                expertise: dataInit.expertise,
                active: dataInit.active || false
            });
            forceRender((prev) => prev + 1);
        }
    }, [dataInit]);

    const buildSkillsSelect = (parentArray, childArray) => {
        if (!parentArray?.length || !childArray?.length) return [];

        return parentArray
            .filter(({ name }) =>
                childArray.some(n =>
                    typeof n === 'object' && n !== null
                        ? n.name?.toLowerCase() === name.toLowerCase()
                        : n.toLowerCase() === name.toLowerCase()
                )
            )
            .map(({ id, name }) => ({ id, name }));
    };
    const transformData = (data) => data?.length > 0 ? data?.map(({ id, name }) => ({ label: name, value: id, desc: name })) : [];
    const transformIds = (ids) => ids?.map(id => ({ id }));

    const handleSelect = (company) => {
        if (jobId) return;
        setSelectedCompany(company);
        setVisible(false);
    };

    const columns = useMemo(() => [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên công ty",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button type="link" onClick={() => handleSelect(record)}> Chọn </Button>
            ),
        },
    ], [handleSelect]);

    const mutation = useMutation({
        mutationFn: dataInit?.id ? putUpdateJob : postCreateNewJob,
        onSuccess: (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                if (jobId)
                    queryClient.setQueryData(['detail_job', jobId], res) //cập nhật data trong react-query-devtools
                message.success(dataInit?.id ? "Cập nhật công việc thành công" : "Thêm mới công việc thành công");
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

    const submitJob = async (valuesForm) => {
        const data = jobId ?
            {
                id: jobId, description: descriptionRef.current, requirements: requirementRef.current,
                benefits: benefitRef.current, ...valuesForm, skills: transformIds(valuesForm.skills), company: { id: selectedCompany?.id ?? dataInit?.company?.id }
            }
            :
            {
                ...valuesForm, description: descriptionRef.current, requirements: requirementRef.current,
                benefits: benefitRef.current, skills: transformIds(valuesForm.skills), company: { id: selectedCompany?.id ?? dataInit?.company?.id }
            };
        await mutation.mutateAsync(data);
    };

    const handleReset = async () => {
        form.resetFields();
        descriptionRef.current = '';
        benefitRef.current = '';
        requirementRef.current = '';
        setJobId('');

        //add animation when closing modal
        setAnimation('close');
        await new Promise(r => setTimeout(r, 400));
        setOpenModal(false);
        setAnimation('open');
    };

    if (error || errCompanies) {
        console.log(error || errCompanies);
        return <></>
    }
    if (isFetching || isFetchingSkills)
        return (<ModalRoleSkeleton />)
    return (
        <>
            <ModalForm
                title={dataInit?.id ? "Cập nhật Job" : "Tạo mới Job"}
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
                onFinish={submitJob}
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
                    <Col span={12}><ProFormText label="Tên công việc" name="name" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} placeholder="Nhập tên công việc" /></Col>
                    <Col span={12}>
                        <ProFormSelect label="Tỉnh/Thành phố" name="location" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} options={[
                            { label: "TP. Hồ Chí Minh", value: "Ho Chi Minh" },
                            { label: "Hà Nội", value: "Ha Noi" },
                            { label: "Đà Nẵng", value: "Da Nang" },
                            { label: "Cần Thơ", value: "Can Tho" },
                            { label: "Huế", value: "Hue" }
                        ]} placeholder="Chọn tỉnh/thành phố" />
                    </Col>
                    <Col span={12}>
                        <ProFormSlider
                            label="Mức lương"
                            name="salary"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            min={0}
                            max={50000}
                            step={500}
                            marks={{
                                0: '0$',
                                50000: '50.000$',
                            }}
                        />
                    </Col>
                    <Col span={12}>
                        <ProFormDigit
                            label="Số lượng tuyển dụng"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập số lượng tuyển dụng"
                            min={1}
                        />
                    </Col>
                    <Col span={12}>
                        <ProFormSelect label="Cấp bậc" name="level" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} options={[
                            { label: "INTERN", value: "INTERN" },
                            { label: "FRESHER", value: "FRESHER" },
                            { label: "MIDDLE", value: "MIDDLE" },
                            { label: "JUNIOR", value: "JUNIOR" },
                            { label: "SENIOR", value: "SENIOR" }
                        ]} placeholder="Chọn cấp bậc" />
                    </Col>
                    {!jobId &&
                        <Col span={12} className='flex items-center'>
                            <Badge className='cursor-pointer' color="info" size='sm' onClick={() => setVisible(true)}>
                                {selectedCompany ? selectedCompany.name : "Chọn công ty"}
                            </Badge>
                        </Col>
                    }
                    {jobId && <Col span={12}><ProFormText label="Công ty" name="company" disabled /></Col>}
                    {visible &&
                        <Modal
                            title="Chọn công ty"
                            open={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            {!isFetchingCompanies &&
                                <ConfigProvider locale={viVN}>
                                    <ProTable
                                        columns={columns}
                                        dataSource={companies}
                                        rowKey="id"
                                        pagination={
                                            {
                                                current: currentPage,
                                                pageSize: meta?.pageSize,
                                                showSizeChanger: true,
                                                total: meta?.total,
                                                showTotal: (total, range) => { return (<div></div>) },
                                                onChange: (page, pageSize) => {
                                                    setCurrentPage(page);
                                                }

                                            }
                                        }
                                        search={false}
                                    />
                                </ConfigProvider>
                            }
                        </Modal>
                    }
                    <Col span={12}>
                        <ProFormSelect label="Hình thức làm việc" name="jobType" rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]} options={[
                            { label: "Toàn thời gian", value: "FULL_TIME" },
                            { label: "Bán thời gian", value: "PART_TIME" },
                            { label: "Theo hợp đồng", value: "CONTRACT" },
                        ]} placeholder="Chọn hình thức làm việc" />
                    </Col>
                    {selectedCompany !== null &&
                        <Col span={12}>
                            <ProFormSelect
                                label="Kĩ năng"
                                name="skills"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder="Chọn kĩ năng"
                                options={transformData(buildSkillsSelect(resSkills?.data, selectedCompany?.expertise))} // Mảng kĩ năng gốc
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
                    }
                    {jobId &&
                        <Col span={12}>
                            <ProFormSelect
                                label="Kĩ năng"
                                name="skills"
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder="Chọn kĩ năng"
                                options={transformData(buildSkillsSelect(resSkills?.data, dataInit?.company?.expertise))} // Mảng kĩ năng gốc
                                mode="multiple"
                                fieldProps={{
                                    optionRender: (option) => {
                                        return (
                                            <div className='text-blue-500'>
                                                {option.data.desc}
                                            </div>
                                        )
                                    },
                                    style: { width: '100%' },
                                }}
                            />
                        </Col>
                    }
                    <Col span={8}>
                        <ConfigProvider locale={viVN}>
                            <ProFormDatePicker
                                label="Ngày bắt đầu"
                                name="startDate"
                                initialValue={new Date()}
                                disabled
                                transform={(value) => ({ startDate: value ? new Date(value) : null })}
                            />
                        </ConfigProvider>
                    </Col>
                    <Col span={8}>
                        <ConfigProvider locale={viVN}>
                            <ProFormDatePicker
                                label="Ngày kết thúc"
                                name="endDate"
                                placeholder="Chọn ngày kết thúc"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                                transform={(value) => ({ endDate: value ? new Date(value) : null })}
                                onChange={(date) => {
                                    if (date && isBefore(new Date(date), startOfToday())) {
                                        message.error('Không thể chọn ngày nhỏ hơn ngày hiện tại!');
                                    }
                                }}
                            />
                        </ConfigProvider>
                    </Col>

                    <Col span={8}>
                        <ProFormSwitch label="Trạng thái" name="active" checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" initialValue fieldProps={{ defaultChecked: true }} />
                    </Col>
                    <Col span={24}>
                        <ProCard title="Miêu tả" headStyle={{ color: '#d81921' }} bordered>
                            <ReactQuill
                                theme="snow"
                                value={descriptionRef.current}
                                onChange={(content) => { descriptionRef.current = content }}
                            />
                        </ProCard>
                    </Col>
                    <Col span={24}>
                        <ProCard title="Yêu cầu công việc" headStyle={{ color: '#d81921' }} bordered>
                            <ReactQuill
                                theme="snow"
                                value={requirementRef.current}
                                onChange={(content) => { requirementRef.current = content }}
                            />
                        </ProCard>
                    </Col>
                    <Col span={24}>
                        <ProCard title="Quyền lợi" headStyle={{ color: '#d81921' }} bordered>
                            <ReactQuill
                                theme="snow"
                                value={benefitRef.current}
                                onChange={(content) => { benefitRef.current = content }}
                            />
                        </ProCard>
                    </Col>
                </Row>
            </ModalForm>
        </>
    );
};

export default withErrorBoundary(ModalJob);
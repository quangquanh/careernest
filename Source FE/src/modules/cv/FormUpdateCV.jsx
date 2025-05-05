import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import { putUpdateOnlineResume } from "../../services/resumeService";
import { Datepicker, Spinner, Button } from "flowbite-react";
import { useSkills } from "../../hooks/useSkills";
import { ProFormSelect } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { Form, message } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
import { useTranslation } from 'react-i18next';
import { useForm } from "antd/es/form/Form";

const FormUpdateCV = ({ dataResume = {}, ...props }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const containerRef = useRef(null);

    const [form] = useForm();

    useEffect(() => {
        if (dataResume?.skills) {
            form.setFieldsValue({
                skills: dataResume.skills.map(item => item.id)
            });
        }
    }, [dataResume]);

    const formRef = useRef({
        title: dataResume?.title ?? "",
        fullName: dataResume?.fullName ?? "",
        email: dataResume?.email ?? "",
        phoneNumber: dataResume?.phone ?? "",
        dateOfBirth: dataResume?.dateOfBirth ?? null,
        address: dataResume?.address ?? "",
        summary: dataResume?.summary ?? "",
        languages: dataResume?.languages ?? "",
        educations: dataResume?.educations ?? "",
        certifications: dataResume?.certifications ?? "",

        // workExperience:
        workExperiences: dataResume?.workExperiences ?? []
    });
    const [renderCounter, setRenderCounter] = useState(0); // Rerender khi push thêm
    const { res: resSkills, isLoading: isLoadingSkills } = useSkills();

    const transformData = (data) => data?.length > 0 ? data?.map(({ id, name }) => ({ label: name, value: id, desc: name })) : [];
    const buildSkillsSelect = (skillsArray) => {
        return skillsArray?.length > 0 ? skillsArray.map(({ id, name }) => ({ id, name })) : [];
    };
    const transformIds = (ids) => ids?.map(id => ({ id }));

    const handleOnChange = (field, value) => {
        formRef.current[field] = value;
    };

    const handleAddWorkExperience = () => {
        formRef.current.workExperiences.push({
            companyName: "", location: "", startDate: "", endDate: "", description: ""
        });
        setRenderCounter(prev => prev + 1); // Trigger rerender
    };

    const handleWorkExperienceChange = (index, field, value) => {
        formRef.current.workExperiences[index][field] = value;
        setRenderCounter(prev => prev + 1); // Rerender nếu cần hiển thị giá trị ngay
    };

    const mutationResumeOnline = useMutation({
        mutationFn: putUpdateOnlineResume,
        onSuccess: async (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                message.success("Chỉnh sửa hồ sơ CV thành công");
                mutationResumeOnline.reset();
                navigate(`${path.CV}/${path.CV__MANAGE}`);
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

    const handleSubmit = async () => {
        if (containerRef?.current)
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });

        const dataResumeOnl = {
            id: dataResume?.id,
            title: formRef.current.title,
            address: formRef.current.address,
            email: formRef.current.email,
            fullName: formRef.current.fullName,
            dateOfBirth: formRef.current.dateOfBirth,
            phone: formRef.current.phoneNumber,
            summary: formRef.current.summary,
            skills: transformIds(form.getFieldValue("skills")),
            languages: formRef.current.languages,
            educations: formRef.current.educations,
            certifications: formRef.current.certifications,
            workExperiences: formRef.current.workExperiences.map(exp => ({
                ...exp,
                onlineResume: { id: +dataResume?.id }
            }))
        }

        await mutationResumeOnline.mutateAsync(dataResumeOnl)
    };

    if (!dataResume) return null;
    return (
        <div className="relative" ref={containerRef}>
            {/* Overlay + Loading */}
            {mutationResumeOnline?.isPending && (
                <div className="absolute rounded-sm inset-0 h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-10">
                    <Spinner size="xl" color="white" />
                </div>
            )}

            <div className="mb-5 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {/* Input Fields */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {t('cv_create_page.cv_title')}
                    </label>
                    <input
                        defaultValue={formRef.current?.title ?? ''}
                        type="text"
                        className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm dark:bg-slate-800 dark:text-white"
                        onChange={(e) => handleOnChange("title", e.target.value)}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <input
                        readOnly
                        type="text"
                        className="outline-none block w-full rounded-lg dark:bg-slate-800 dark:text-white border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        defaultValue={formRef.current?.email ?? ''}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {t('cv_create_page.full_name')}

                    </label>
                    <input
                        readOnly
                        type="text"
                        className="outline-none block w-full rounded-lg dark:bg-slate-800 dark:text-white border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        defaultValue={formRef.current?.fullName ?? ''}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {t('cv_create_page.phone')}
                    </label>
                    <input
                        readOnly
                        type="text"
                        className="outline-none block w-full rounded-lg dark:bg-slate-800 dark:text-white border border-gray-300 bg-gray-50 p-2.5 text-sm"
                        defaultValue={formRef.current?.phoneNumber ?? ''}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="birthDay_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {t('cv_create_page.dob')}

                    </label>
                    <Datepicker
                        key={formRef.current?.dateOfBirth}
                        value={formRef.current?.dateOfBirth}
                        language="vi"
                        placeholder="Chọn ngày sinh"
                        disabled
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">  {t('cv_create_page.address')} </label>
                    <input
                        type='text'
                        defaultValue={formRef.current?.address ?? ''}
                        rows={3}
                        readOnly
                        className="block w-full outline-none rounded-lg dark:bg-slate-800 dark:text-white border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter here your address" />
                </div>

                {/* Select Fields */}

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">  {t('cv_create_page.skills')} </label>
                    <Form form={form} layout="vertical">
                        <ProFormSelect
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Chọn chuyên môn"
                            name="skills"
                            options={transformData(buildSkillsSelect(resSkills?.data))} // Mảng chuyên môn gốc
                            mode="multiple"
                            fieldProps={{
                                optionRender: (option) => (
                                    <div className='text-blue-500'>
                                        {option.data.desc}
                                    </div>
                                ),
                                style: { width: '100%' },
                                onChange: (value) => handleOnChange("skills", value), // Lưu dữ liệu vào formRef
                            }}
                        />
                    </Form>
                </div>


                {/* ReactQuill Fields */}
                {[
                    { label: t('cv_create_page.description'), field: "summary", value: formRef.current.summary },
                    { label: t('cv_create_page.language'), field: "languages", value: formRef.current.languages },
                    { label: t('cv_create_page.education'), field: "educations", value: formRef.current.educations },
                    { label: t('cv_create_page.certificate'), field: "certifications", value: formRef.current.certifications },
                ].map(({ label, field, value }) => (
                    <div key={field} className="col-span-2 mb-8">
                        <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                            {label}
                        </label>
                        <ReactQuill
                            defaultValue={value}
                            className="h-[400px] custom-quill-editor dark:text-white dark:font-medium"
                            theme="snow"
                            onChange={(value) => handleOnChange(field, value)}
                        />
                    </div>
                ))}

                {/* Kinh nghiệm làm việc */}
                <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white col-span-2">
                    {t('cv_create_page.work_experience')}
                    <Button className="mt-3" size="xs" color="light" onClick={handleAddWorkExperience}>
                        + {t('cv_create_page.work_expe_button')}
                    </Button>
                </label>

                {/* Input fields cho "Kinh nghiệm làm việc" */}
                {formRef.current.workExperiences.map((exp, index) => (
                    <React.Fragment key={index}>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {t('cv_create_page.work_expe.company_name')}
                            </label>
                            <input
                                defaultValue={exp?.companyName ?? ''}
                                placeholder="Nhập tên công ty làm việc"
                                type="text"
                                className="outline-none block w-full dark:bg-slate-800 dark:text-white rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                onChange={(e) => handleWorkExperienceChange(index, "companyName", e.target.value)}
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {t('cv_create_page.work_expe.address')}
                            </label>
                            <input
                                defaultValue={exp?.location ?? ''}
                                type="text"
                                className="outline-none block w-full dark:bg-slate-800 dark:text-white rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                onChange={(e) => handleWorkExperienceChange(index, "location", e.target.value)}
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {t('cv_create_page.work_expe.start_date')}
                            </label>
                            <input
                                defaultValue={
                                    exp?.startDate
                                        ? new Date(exp.startDate).toISOString().split('T')[0]
                                        : null
                                }
                                type="date"
                                className="outline-none dark:bg-slate-800 dark:text-white block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                onChange={(e) => handleWorkExperienceChange(index, "startDate", new Date(e.target.value))}
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {t('cv_create_page.work_expe.end_date')}
                            </label>
                            <input
                                defaultValue={
                                    exp?.endDate
                                        ? new Date(exp.endDate).toISOString().split('T')[0]
                                        : null
                                }
                                type="date"
                                className="outline-none dark:bg-slate-800 dark:text-white block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                onChange={(e) => handleWorkExperienceChange(index, "endDate", new Date(e.target.value))}
                            />
                        </div>

                        <div className="col-span-2 mb-10">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {t('cv_create_page.work_expe.job_description')}
                            </label>
                            <ReactQuill
                                defaultValue={exp?.description ?? ''}
                                theme="snow"
                                className="h-[200px] custom-quill-editor dark:text-white dark:font-medium"
                                onChange={(value) => handleWorkExperienceChange(index, "description", value)}
                            />
                        </div>

                    </React.Fragment>
                ))}
            </div>

            {/* Buttons */}
            <div className="text-right border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5 mt-14">
                <Button
                    loading={mutationResumeOnline.isPending}
                    className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-4 py-1 text-center text-sm font-medium text-white hover:bg-primary-800"
                    onClick={handleSubmit}
                >
                    {localStorage.getItem('i18nextLng') === 'vi' ? "Chỉnh sửa CV CV" : "Update CV"}
                </Button>
                <button
                    type="button"
                    className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                    {localStorage.getItem('i18nextLng') === 'vi' ? "Hủy" : "Cancel"}
                </button>
            </div>
        </div >
    );
};

export default withErrorBoundary(FormUpdateCV);

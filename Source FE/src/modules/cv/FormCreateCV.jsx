import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import { useSelector } from 'react-redux';
import { postCreateOnlineCV } from "../../services/resumeService";
import { postCreateWorkExperience } from "../../services/workExperience";
import { Datepicker, Spinner, Button } from "flowbite-react";
import { useSkills } from "../../hooks/useSkills";
import { ProFormSelect } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
import { useTranslation } from 'react-i18next';

const FormCreateCV = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const containerRef = useRef(null);
    const user = useSelector(state => state?.user?.info);
    const formRef = useRef({
        title: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: null,
        address: "",
        skills: [],
        summary: "",
        languages: "",
        educations: "",
        certifications: "",

        // workExperience:
        workExperiences: [
            // { companyName: "", location: "", startDate: "", endDate: "", description: "" }
        ]
    });
    const [renderCounter, setRenderCounter] = useState(0); // Rerender khi push thêm
    const { res: resSkills, isLoading: isLoadingSkills } = useSkills();

    useEffect(() => {
        if (user?.dateOfBirth)
            formRef.current.dateOfBirth = new Date(user.dateOfBirth)
        if (user?.address)
            formRef.current.address = user.address;
        if (user?.phoneNumber)
            formRef.current.phoneNumber = user.phoneNumber;
        if (user?.email)
            formRef.current.email = user.email;
        if (user?.firstName || user?.lastName)
            formRef.current.fullName = `${user.lastName} ${user.firstName}`;

    }, [user]);

    const buildSkillsSelect = (skillsArray) => {
        return skillsArray?.length > 0 ? skillsArray.map(({ id, name }) => ({ id, name })) : [];
    };

    const transformData = (data) => data?.length > 0 ? data?.map(({ id, name }) => ({ label: name, value: id, desc: name })) : [];

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
        mutationFn: postCreateOnlineCV,
        onSuccess: async (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                if (formRef.current.workExperiences.length <= 0) {
                    message.success("Tạo hồ sơ CV thành công");
                    mutationResumeOnline.reset();
                    navigate(`${path.CV}/${path.CV__MANAGE}`);
                    return;
                }
                for (const exp of formRef.current.workExperiences) {
                    await mutationWorkExpe.mutateAsync({
                        ...exp,
                        onlineResume: { id: +res?.data?.id }
                    });
                }
                mutationResumeOnline.reset();
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

    const mutationWorkExpe = useMutation({
        mutationFn: postCreateWorkExperience,
        onSuccess: (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                message.success("Tạo hồ sơ CV thành công");
                mutationWorkExpe.reset();
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
            user: { id: user?.id },
            title: formRef.current.title,
            address: formRef.current.address,
            email: formRef.current.email,
            fullName: formRef.current.fullName,
            dateOfBirth: formRef.current.dateOfBirth,
            phone: formRef.current.phoneNumber,
            summary: formRef.current.summary,
            skills: transformIds(formRef.current.skills),
            languages: formRef.current.languages,
            educations: formRef.current.educations,
            certifications: formRef.current.certifications,
        }

        await mutationResumeOnline.mutateAsync(dataResumeOnl)
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Overlay + Loading */}
            {mutationResumeOnline?.isPending || mutationWorkExpe?.isPending && (
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
                        defaultValue={user?.email ?? ''}
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
                        defaultValue={user?.firstName && user?.lastName ? `${user.lastName} ${user.firstName}` : ''}
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
                        defaultValue={user?.phoneNumber ?? ''}
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="birthDay_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        {t('cv_create_page.dob')}

                    </label>
                    <Datepicker
                        key={user?.dateOfBirth}
                        value={user?.dateOfBirth}
                        language="vi"
                        placeholder="Chọn ngày sinh"
                        disabled
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">  {t('cv_create_page.address')} </label>
                    <input
                        type='text'
                        defaultValue={user?.address ?? ''}
                        rows={3}
                        readOnly
                        className="block w-full outline-none rounded-lg dark:bg-slate-800 dark:text-white border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900" placeholder="Enter here your address" />
                </div>

                {/* Select Fields */}
                <div className="col-span-2 sm:col-span-1">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">  {t('cv_create_page.skills')} </label>
                    <ProFormSelect
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                        placeholder="Chọn chuyên môn"
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
                </div>


                {/* ReactQuill Fields */}
                {[
                    { label: t('cv_create_page.description'), field: "summary" },
                    { label: t('cv_create_page.language'), field: "languages" },
                    { label: t('cv_create_page.education'), field: "educations" },
                    { label: t('cv_create_page.certificate'), field: "certifications" },
                ].map(({ label, field }) => (
                    <div key={field} className="col-span-2 mb-8">
                        <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
                            {label}
                        </label>
                        <ReactQuill
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
                    loading={mutationResumeOnline.isPending || mutationWorkExpe.isPending}
                    className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-4 py-1 text-center text-sm font-medium text-white hover:bg-primary-800"
                    onClick={handleSubmit}
                >
                    {localStorage.getItem('i18nextLng') === 'vi' ? "Tạo CV" : "Create CV"}
                </Button>
                <button
                    type="button"
                    className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                    {localStorage.getItem('i18nextLng') === 'vi' ? "Hủy" : "Cancel"}
                </button>
            </div>
        </div>
    );
};

export default withErrorBoundary(FormCreateCV);

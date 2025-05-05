import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { path } from '../../utils/constant';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { Tabs, Badge, Dropdown } from "flowbite-react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import AppliedJob from '../../modules/job/AppliedJob';
import SavedJob from '../../modules/job/SavedJob';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Việc làm của tôi" : "My jobs", path: "#" }
]

const MyJobPage = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const ref = useRef(null);

    const user = useSelector(state => state?.user?.info);
    const appliedJobs = useSelector(state => state?.user?.appliedJobs);

    const listSaveJobs = useMemo(() => {
        return user?.saveJob?.length > 0 ? user.saveJob : [];
    }, [user?.saveJob]);

    const [activeTab, setActiveTab] = useState(location?.state === 'saved' ? 1 : 0);
    const [selected, setSelected] = useState(localStorage.getItem('i18nextLng') === 'vi' ? "Ngày ứng tuyển gần nhất" : t('my_job_page.sort_opt_1'));

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Việc làm của tôi';
    }, []);

    return (
        <div ref={ref} className='ct-container py-4 pt-20 bg-[#f7f7f7] dark:bg-slate-900'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] dark:bg-slate-800 px-6 py-3 rounded-lg'>
                <h1 className='font-semibold text-xl mb-3 dark:text-white'>
                    {t('my_job_page.title')}
                </h1>
                <Tabs
                    variant="underline"
                    onActiveTabChange={(index) => setActiveTab(index)}
                    theme={{
                        tablist: {
                            base: 'flex border-b border-gray-200 space-x-4',
                            tabitem: {
                                base: '!outline-none focus:!outline-none focus:!ring-0 ring-0 text-xs',
                            }
                        }
                    }}
                >
                    <Tabs.Item
                        active={activeTab === 0}
                        title={
                            <div className='flex items-center gap-2'>
                                {t('my_job_page.applied_jobs')}
                                <Badge color={activeTab === 0 ? "info" : "gray"} size="sm" className='rounded-full'>
                                    3
                                </Badge>
                            </div>
                        }>
                    </Tabs.Item>

                    <Tabs.Item
                        active={activeTab === 1}
                        title={
                            <div className='flex items-center gap-2'>
                                {t('my_job_page.saved_jobs')}
                                <Badge color={activeTab === 1 ? "info" : "gray"} size="sm" className='rounded-full'>
                                    {user?.saveJob?.length ?? 0}
                                </Badge>
                            </div>
                        }>
                    </Tabs.Item>
                </Tabs>
            </div>
            <div className='w-full my-4 flex flex-col md:flex-row md:justify-between md:items-center px-6'>
                <div className='flex items-center gap-2 mb-4 md:mb-0 dark:text-gray-400'>
                    {activeTab === 1 &&
                        <>
                            <IoMdInformationCircleOutline size={15} />
                            <span >  {t('my_job_page.limit')}</span>
                        </>
                    }
                </div>
                <div className='flex gap-2 dark:text-white'>
                    <span>{t('my_job_page.sort_by')}:</span>
                    <Dropdown label={selected} inline>
                        <Dropdown.Item onClick={() => setSelected(`${activeTab === 0 ? t('my_job_page.sort_opt_1') : t('my_job_page.sort_opt_2')}`)}>
                            {activeTab === 0 ? t('my_job_page.sort_opt_1') : t('my_job_page.sort_opt_2')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelected(`${activeTab === 0 ? t('my_job_page.sort_opt_3') : t('my_job_page.sort_opt_4')}`)}>
                            {activeTab === 0 ? t('my_job_page.sort_opt_3') : t('my_job_page.sort_opt_4')}
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
            <div className='w-full px-6 py-3'>
                {/* Render component theo activeTab */}
                {activeTab === 0 && <AppliedJob listJobs={appliedJobs} />}
                {activeTab === 1 && <SavedJob listJobs={listSaveJobs} />}
            </div>
        </div>
    );
};

export default MyJobPage;

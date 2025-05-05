import React, { useCallback, useEffect, useRef, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import './DetailJobPage.scss';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { Badge, Button, Dropdown, Pagination, Select } from 'flowbite-react';
import FilterJobModal from '../../modules/job/FilterJobModal';
import { FaFilter } from "react-icons/fa";
import { useFilterJobs } from '../../hooks/useFilterJobs';
import FindJobCard from '../../modules/job/FindJobCard';
import DetailJobCard from '../../modules/job/DetailJobCard';
import { GrPowerReset } from "react-icons/gr";
import { useTranslation } from 'react-i18next';

const FindJobPage = () => {
    const { t } = useTranslation();

    const ref = useRef(null);
    const params = useParams();

    const [openModalFilter, setOpenModalFilter] = useState(false);
    const detailRef = useRef(null); // ref cho thẻ div bên phải
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedLocations, setLocation] = useState([params?.location === 'all' ? '' : params?.location]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState('');
    const { res, isLoading, isFetching, error, refetch } = useFilterJobs(currentPage, params?.name, selectedLocations, selectedLevels, selectedSalary);
    const listJobs = res?.result?.length > 0 ? res.result : [];
    const [selectedJob, setSelectedJob] = useState(null); // State lưu job được chọn
    const meta = res?.meta ?? {};

    useEffect(() => {
        document.title = 'Tìm việc làm';
        if (currentPage !== 1)
            setCurrentPage(1);
    }, [params?.name, params?.location, selectedLevels]);

    useEffect(() => {
        setLocation([params?.location === 'all' ? '' : params?.location]);
    }, [params?.location]);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        if (listJobs?.length > 0)
            setSelectedJob(listJobs[0]);
    }, [listJobs]);

    const toggleLevel = (level) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    const onPageChange = (page) => {
        setCurrentPage(+page);
        if (detailRef.current) {
            detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleResetFilter = () => {
        setSelectedLevels([]);
        setSelectedSalary('');
    }

    const handleSelectJob = useCallback((job) => {
        setSelectedJob(job);
        detailRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [setSelectedJob]);

    if (!params?.name && !params?.location) return null;
    if (error) return null;
    if (listJobs?.length <= 0)
        return (
            <div className='ct-container flex flex-col items-center justify-center'>
                <div className="hidden mb-6 w-full md:flex items-center justify-between rounded-md shadow-md dark:shadow-lg p-4 dark:bg-gray-700">
                    <div className='flex items-center gap-4'>
                        {/* Cấp bậc */}
                        <Dropdown label={t('find_job_page.filter_section.level')} color='light' className="border-gray-300">
                            <div className="p-2 w-32 lg:w-40">
                                {["INTERN", "FRESHER", "JUNIOR", "MIDDLE", "SENIOR"].map((level) => (
                                    <label key={level} className="flex items-center gap-2 p-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedLevels.includes(level)}
                                            onChange={() => toggleLevel(level)}
                                            className="w-4 h-4"
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </Dropdown>

                        {/* Hình thức làm việc */}
                        <Select className="w-44 lg:w-48 rounded-full border-gray-300">
                            <option>{t('find_job_page.filter_section.work_type')}</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Freelance</option>
                        </Select>

                        {/* Mức lương */}
                        <Select
                            className="w-fit rounded-full border-gray-300"
                            value={selectedSalary}
                            onChange={(e) => setSelectedSalary(e.target.value)}
                        >
                            <option value="">{t('find_job_page.filter_section.salary')}</option>
                            <option value="under-1000-$">Dưới 1000$</option>
                            <option value="1000-1500-$">Từ 1000 - 1500$</option>
                            <option value="1500-2000-$">Từ 1500-2000$</option>
                            <option value="2000-2500-$">Từ 2000-2500$</option>
                            <option value="2500-3000-$">Từ 2500-3000$</option>
                            <option value="over-3000-$">Trên 3000$</option>
                        </Select>
                    </div>
                    <GrPowerReset onClick={handleResetFilter} size={22} className='ml-4 dark:text-white hover:cursor-pointer hover:text-red-500 hover:transition-all' />
                </div>
                <div className='w-full md:hidden flex justify-end'>
                    <Button color="light" onClick={() => setOpenModalFilter(true)}>
                        <FaFilter size={18} className='mr-2' /> Bộ lọc
                    </Button>
                </div>
                <Badge color="gray" size="sm" className='w-fit text-xl uppercase tracking-wide'>Không tìm thấy thông tin việc làm.</Badge>
            </div>
        )
    if (isLoading || isFetching)
        return (
            <div role="status" className="ct-container space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
                <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                </div>
                <span className="sr-only">Loading...</span>
            </div>

        )
    return (
        <>
            <div ref={ref} className='ct-container flex flex-col gap-y-6'>
                <div className='font-semibold text-lg md:text-2xl tracking-wide dark:text-white upper'>
                    {meta?.total ?? ''} {localStorage.getItem('i18nextLng') === 'vi' ? " việc làm" : " Jobs"} <span className='text-red-500'>{params?.name} </span>
                    {selectedLevels?.length > 0 &&
                        <span>{localStorage.getItem('i18nextLng') === 'vi' ? " dành cho" : " for"} <span className='text-red-500 text-xl'>{selectedLevels.toString()}</span> </span>
                    }
                    {localStorage.getItem('i18nextLng') === 'vi' ? " tại" : " in"} <span className='text-blue-500'>{selectedLocations[0] !== '' ? selectedLocations[0] : "Việt Nam"}</span>
                </div>
                <div className="hidden mb-6 w-full md:flex items-center justify-between rounded-md shadow-md dark:shadow-lg p-4 dark:bg-slate-800">
                    <div className='flex items-center gap-4'>
                        {/* Cấp bậc */}
                        <Dropdown label={t('find_job_page.filter_section.level')} color='light' className="border-gray-300">
                            <div className="p-2 w-32 lg:w-40">
                                {["INTERN", "FRESHER", "JUNIOR", "MIDDLE", "SENIOR"].map((level) => (
                                    <label key={level} className="flex items-center gap-2 p-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedLevels.includes(level)}
                                            onChange={() => toggleLevel(level)}
                                            className="w-4 h-4"
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </Dropdown>

                        {/* Hình thức làm việc */}
                        <Select className="w-44 lg:w-48 rounded-full border-gray-300">
                            <option>{t('find_job_page.filter_section.work_type')}</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                        </Select>

                        {/* Mức lương */}
                        <Select
                            className="w-fit rounded-full border-gray-300"
                            value={selectedSalary}
                            onChange={(e) => setSelectedSalary(e.target.value)}
                        >
                            <option value="">{t('find_job_page.filter_section.salary')}</option>
                            <option value="under-1000-$">Dưới 1000$</option>
                            <option value="1000-1500-$">Từ 1000 - 1500$</option>
                            <option value="1500-2000-$">Từ 1500-2000$</option>
                            <option value="2000-2500-$">Từ 2000-2500$</option>
                            <option value="2500-3000-$">Từ 2500-3000$</option>
                            <option value="over-3000-$">Trên 3000$</option>
                        </Select>
                    </div>
                    <GrPowerReset onClick={handleResetFilter} size={22} className='ml-4 dark:text-white hover:cursor-pointer hover:text-red-500 hover:transition-all' />
                </div>
                <div className='w-full md:hidden flex justify-end'>
                    <Button color="light" onClick={() => setOpenModalFilter(true)}>
                        <FaFilter size={18} className='mr-2' /> Bộ lọc
                    </Button>
                </div>

                {/* Hiển thị danh sách jobs và detail job */}
                <div className='hidden w-full md:flex gap-6'>
                    <div className='flex flex-col gap-7 basis-2/5'>
                        {listJobs?.map((job) => (
                            <FindJobCard
                                key={job?.id}
                                job={job}
                                selectedJob={selectedJob}
                                handleSelectJob={handleSelectJob}
                            />
                        ))}
                    </div>
                    <DetailJobCard ref={detailRef} job={selectedJob} />
                </div>

                <div className='md:hidden flex flex-col gap-8'>
                    {listJobs?.map((job) => (
                        <FindJobCard
                            key={job?.id}
                            job={job}
                            selectedJob={selectedJob}
                            handleSelectJob={handleSelectJob}
                        />
                    ))}
                </div>
            </div>
            <div className="flex overflow-x-auto justify-center mb-8">
                <Pagination currentPage={currentPage} totalPages={meta?.pages} onPageChange={onPageChange} showIcons />
            </div>
            {openModalFilter && <FilterJobModal isOpen={openModalFilter} setOpenModal={setOpenModalFilter} />}
        </>
    );
};

export default withErrorBoundary(FindJobPage);
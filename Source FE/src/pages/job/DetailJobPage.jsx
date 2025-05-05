import React, { useEffect, useRef, useState, } from 'react';
import icons from '../../utils/icons';
import { Alert, Badge, Button, List, Tooltip, Popover } from "flowbite-react";
import { message } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { path } from '../../utils/constant';
import slugify from 'slugify';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { getDetailJob } from '../../services/jobService';
import { getDetailRecruitment } from '../../services/recruitmentService';
import _ from 'lodash';
import './DetailJobPage.scss';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { HiInformationCircle } from "react-icons/hi";
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { SiHyperskill } from "react-icons/si";
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { postSaveJob } from '../../services/userService';
import { toast } from 'react-toastify';
import { useDetailUser } from '../../hooks/useDetailUer';
import { RiRobot2Line } from "react-icons/ri";
import ModalJobMatching from '../../modules/job/ModalJobMatching';
import { motion, AnimatePresence } from 'framer-motion';
import ModalApplyCV from '../../modules/cv/ModalApplyCV';
import { useTranslation } from 'react-i18next';

const { FaRegBuilding, FaMoneyCheckDollar, IoMdTime, IoPeople, GrLocation, FaCircleInfo, HiCheckCircle, FaHeart } = icons;
const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Chi tiết công việc" : "Job Detail", path: "#" }
]

const DetailJobPage = () => {
    const { t } = useTranslation();

    const user = useSelector(state => state?.user?.info);
    const appliedJobs = useSelector(state => state?.user?.appliedJobs);

    const { refetch } = useDetailUser(user?.id);

    const navigate = useNavigate();
    const ref = useRef(null);
    const params = useParams();
    const queryClient = useQueryClient()

    const [openModal, setOpenModal] = useState(false);
    const [openModalApplyJob, setOpenModalApplyJob] = useState(false);

    const [openPopup, setOpenPopup] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Chi tiết công việc';
    }, []);

    const { data: res, isLoading, isFetching } = useQuery({
        queryKey: ['job', +params?.id],
        queryFn: () => getDetailJob(+params?.id),
        enabled: !!params?.id,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: true,
    })
    const detailJob = res?.data;

    const mutation = useMutation({
        mutationFn: postSaveJob,
        onSuccess: (res) => {
            if (+res?.statusCode === 201 || +res?.statusCode === 200) {
                message.success('Lưu tin thành công');
                refetch();
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

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenPopup(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setOpenPopup(false), 150);
    };

    const handlePrefetchRecruitment = (id) => {
        if (!id) return;
        queryClient.prefetchQuery({
            queryKey: ['recruitment', id],
            queryFn: () => getDetailRecruitment(id),
            staleTime: 10 * 1000,
        })
    }

    const isExpired = (date) => new Date(date * 1000) < new Date();

    const convertTimeStampToString = (timestamp) => {
        if (!timestamp) return '';
        try {
            const date = new Date(timestamp * 1000);
            return format(date, 'dd/MM/yyyy');
        } catch (error) {
            console.error('Error converting timestamp:', error);
            return '';
        }
    };

    const checkIsSavedJob = (id, saveJobs) => {
        if (!saveJobs || saveJobs?.length === 0) return false;
        return saveJobs.some(job => +job.id === +id);
    };

    const checkIsAppliedJob = (id, appliedJobs) => {
        if (!appliedJobs || appliedJobs?.length === 0) return false;
        return appliedJobs.some(item => +item?.job?.id === +id);
    };

    const handleSaveJob = async () => {
        if (!params?.id) return;
        if (!user?.id) {
            message.warning("Vui lòng đăng nhập trước khi lưu tin");
            return;
        }

        await mutation.mutateAsync({ userId: +user?.id, jobId: +params.id });
    }

    const handleApplyJob = () => {
        if (!params?.id) return;
        if (!user?.id) {
            message.warning("Vui lòng đăng nhập trước khi ứng tuyển");
            return;
        }
        setOpenModalApplyJob(true);
    }

    if (!params?.id) return null;
    if (isLoading || isFetching)
        return (
            <div className='ct-container flex flex-col gap-8 mt-20 dark:text-gray-800'>
                <div>
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
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
                    <div role="status" className="w-full animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            </div>
        );
    if (detailJob?.statusCode === 500) {
        return (
            <Alert className='mt-20' color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Không tìm  thấy thông tin công việc!</span>
            </Alert>
        );
    }
    return (
        <>
            <div ref={ref} className='ct-container flex flex-col gap-8 pt-20'>
                <Breadcrumbs data={data} />
                <div className='w-full shadow-md dark:shadow-lg flex items-center justify-between py-3 gap-3 xs:gap-6 rounded-lg pl-2 dark:bg-slate-800'>
                    <img
                        src={detailJob?.company?.logoUrl ? getFirebaseImageUrl(detailJob.company.logoUrl, 'companies') : ''}
                        alt="thumbnail"
                        className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] object-contain rounded-md`}
                    />

                    <div className='flex flex-auto flex-col gap-1'>
                        <div className='flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:items-center md:justify-between md:pr-6'>
                            <div className='text-sm order-2 md:order-1 md:text-base lg:text-lg xl:text-xl font-medium uppercase dark:text-white' >
                                {detailJob?.name}
                            </div>
                            <div className='flex order-1 md:order-2 items-center gap-4'>
                                {isExpired(detailJob?.endDate)
                                    ? <Badge color="failure" size='sm' className='uppercase'>
                                        {localStorage.getItem('i18nextLng') === 'vi' ? "Hết hạn ứng tuyển" : "Expired"}
                                    </Badge>
                                    :
                                    <>
                                        <Button size='xs' className="block sm:hidden" gradientDuoTone="pinkToOrange"
                                            onClick={!checkIsAppliedJob(params?.id, appliedJobs) ? handleApplyJob : () => { message.warning("Bạn đã ứng tuyển công việc này!") }}>
                                            {checkIsAppliedJob(params?.id, appliedJobs) ? t('job_detail_page.already_applied_button') : t('job_detail_page.apply_button')}
                                        </Button>
                                        <Button size='sm' className="hidden sm:block" gradientDuoTone="pinkToOrange"
                                            onClick={!checkIsAppliedJob(params?.id, appliedJobs) ? handleApplyJob : () => { message.warning("Bạn đã ứng tuyển công việc này!") }}>
                                            {checkIsAppliedJob(params?.id, appliedJobs) ? t('job_detail_page.already_applied_button') : t('job_detail_page.apply_button')}
                                        </Button>

                                        <Button size='xs' className="block sm:hidden" gradientDuoTone="pinkToOrange"
                                            onClick={!checkIsSavedJob(params?.id, user?.saveJob) ? handleSaveJob : () => { message.warning("Bạn đã lưu tin tuyển dụng này") }}>
                                            <FaHeart size={18} className='mr-2' />
                                            {checkIsSavedJob(params?.id, user?.saveJob) ? t('job_detail_page.already_saved_button') : t('job_detail_page.save_button')}
                                        </Button>
                                        <Button size='sm' className="hidden sm:block" gradientDuoTone="pinkToOrange"
                                            onClick={!checkIsSavedJob(params?.id, user?.saveJob) ? handleSaveJob : () => { message.warning("Bạn đã lưu tin tuyển dụng này") }}>
                                            <FaHeart size={18} className='mr-2' />
                                            {checkIsSavedJob(params?.id, user?.saveJob) ? t('job_detail_page.already_saved_button') : t('job_detail_page.save_button')}
                                        </Button>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='flex gap-2 items-center text-sm md:text-base font-medium text-[#23527c] dark:text-blue-500 cursor-pointer hover:underline'
                            onClick={() => navigate(`${path.RECRUITMENT}/detail/${detailJob?.company?.id}/${slugify(detailJob?.company?.name, { lower: true, strict: true })}`)}
                            onMouseEnter={() => { handlePrefetchRecruitment(+detailJob?.company?.id); handleMouseEnter(); }}
                            onTouchStart={() => { handlePrefetchRecruitment(+detailJob?.company?.id); handleMouseEnter(); }}
                            onMouseLeave={handleMouseLeave}
                            onTouchEnd={handleMouseLeave}
                        >
                            <FaRegBuilding size={15} /> {detailJob?.company?.name}
                        </div>
                        {openPopup &&
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    className="hidden lg:block absolute z-50 right-[550px] w-[300px] h-fit bg-white shadow-md dark:shadow-sm rounded-lg dark:bg-slate-900 border border-gray-200 dark:border-gray-700 p-4 transition-all"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onTouchStart={handleMouseEnter}     // hoạt động như hover vào
                                    onTouchEnd={handleMouseLeave}       // hoạt động như hover vào
                                >
                                    <div className="h-fit dark:bg-gray-700 bg-gray-200 ">
                                        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 overflow-hidden">
                                            <div className="border-b px-4 pb-6">
                                                <div className="text-center my-4">
                                                    <img className="h-28 w-28 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                                                        src={getFirebaseImageUrl(detailJob?.company?.logoUrl, "companies")} alt />
                                                    <div className="py-2">
                                                        <h3 className="font-bold text-xl text-wrap text-gray-800 dark:text-white mb-1">{detailJob?.company?.name}</h3>
                                                        <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                                <path className d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                                            </svg>
                                                            {detailJob?.company?.city}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 px-2">
                                                    <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                                                        {t('job_detail_page.follow')}
                                                    </button>
                                                    <button
                                                        className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2"
                                                        onClick={() => navigate(`${path.RECRUITMENT}/detail/${detailJob?.company?.id}/${slugify(detailJob?.company?.name, { lower: true, strict: true })}`)}
                                                    >
                                                        {t('job_detail_page.message')}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </motion.div>
                            </AnimatePresence>
                        }
                        <div className='flex gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                            <FaMoneyCheckDollar /> {t('job_detail_page.salary')}: {detailJob?.salary}$
                        </div>
                        {detailJob?.skills?.length > 0 &&
                            <div className="flex flex-wrap mb-6 gap-2 items-center text-xs md:text-sm font-light dark:text-white dark:tracking-wide">
                                <SiHyperskill color='gray' /> {t('job_detail_page.skills')}:
                                {detailJob.skills.map((skill) => (
                                    <span key={skill?.id}
                                        className="bg-gray-200 text-slate-800 px-3 py-1 rounded-full border border-gray-300 text-xs cursor-pointer hover:transition-all hover:bg-red-500 hover:text-white"
                                        onClick={() => navigate(`${path.FIND__JOB}/all/${skill?.name?.toLowerCase()}`)}
                                    >
                                        {skill?.name}
                                    </span>
                                ))}
                            </div>
                        }
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light dark:text-white dark:tracking-wide'>
                            <IoMdTime /> {t('job_detail_page.deadline')}: {convertTimeStampToString(detailJob?.endDate, true)}
                        </div>
                        <Tooltip content="Kiểm tra độ phù hợp với công việc" placement="right">
                            <div className="relative inline-block">
                                <Button onClick={() => setOpenModal(true)} color="light" className="mt-2 pr-3">
                                    <RiRobot2Line className="mr-2 h-5 w-5" />
                                    {t('job_detail_page.consult_ai_button')}
                                </Button>
                                <span className="absolute animate-bounce top-0 right-0 mt-1 -mr-1 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-full shadow">
                                    New
                                </span>
                            </div>
                        </Tooltip>


                    </div>
                </div>

                <div className='hidden w-full sm:flex gap-6'>
                    <div className='basis-2/5 h-fit rounded-lg flex flex-col gap-3 bg-[#ebeeef] p-4 dark:bg-slate-800'>
                        <h1 className='flex items-center gap-2 text-lg font-medium dark:text-white'> <FaCircleInfo className='text-gray-500 ' size={15} /> {t('job_detail_page.recruiter')}</h1>
                        <div className='flex gap-2 text-base font-semibold text-[#23527c] dark:text-blue-500 cursor-pointer hover:underline'
                            onClick={() => navigate(`${path.RECRUITMENT}/detail/${detailJob?.company?.id}/${slugify(detailJob?.company?.name, { lower: true, strict: true })}`)}
                            onMouseEnter={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                            onTouchStart={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                        >
                            <FaRegBuilding size={15} /> {detailJob?.company?.name}
                        </div>
                        <div className='text-justify text-sm px-3 font-light'>
                            <div className='dark:text-gray-400 text-justify' dangerouslySetInnerHTML={{ __html: detailJob?.company?.description }}></div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoPeople className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'> {t('job_detail_page.scale')}</span> <span className='dark:text-white dark:font-light'>{detailJob?.company?.size}  {t('job_detail_page.employees')}</span>
                        </div>
                        <div className='flex gap-2 items-center '>
                            <GrLocation className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'> {t('job_detail_page.address')}</span> <span className='dark:text-white dark:font-light'>{detailJob?.company?.address}</span>
                        </div>
                    </div>
                    <div className='basis-3/5 flex flex-col gap-3 dark:text-white'>
                        <h1 className='uppercase text-lg sm:text-xl font-semibold'>{t('job_detail_page.description')}</h1>
                        <div>
                            <List ordered className='flex flex-col gap-6'>
                                <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                    {t('job_detail_page.information')}
                                    <List nested className='text-black text-sm font-normal'>
                                        <List.Item icon={HiCheckCircle} >{t('job_detail_page.salary')}: {detailJob?.salary}$</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Hình thức làm việc" : "Work type"}: {detailJob?.jobType}</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Giới tính" : "Gender"}: Nam.</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Số lượng" : "Quantity"}: {detailJob?.quantity}.</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Cấp bậc" : "Level"}: {detailJob?.level}.</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Địa điểm" : "Location"}: {detailJob?.location}</List.Item>
                                    </List>
                                </List.Item>
                                <div className='flex flex-col job-description'>
                                    <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                        2. {t('job_detail_page.job_detail')}
                                    </div>
                                    <div className='text-black text-justify dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailJob?.description }}></div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                        3. {t('job_detail_page.requirements')}
                                    </div>
                                    <div className='text-black text-justify dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailJob?.requirements?.replace(/\*/g, '<br>•') }}></div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                        4. {t('job_detail_page.benefits')}
                                    </div>
                                    <div className='text-black text-justify dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailJob?.benefits?.replace(/\*/g, '<br>•') }}></div>
                                </div>
                            </List>
                        </div>
                    </div>
                </div>

                <div className='w-full sm:hidden flex flex-col gap-6'>
                    <div className='h-fit rounded-lg flex flex-col gap-3 bg-[#ebeeef] p-4 dark:bg-slate-800'>
                        <h1 className='flex items-center gap-2 text-lg font-medium dark:text-white'> <FaCircleInfo className='text-gray-500' size={15} /> {t('job_detail_page.recruiter')}:</h1>
                        <div className='flex gap-2 text-base font-semibold text-[#23527c] dark:text-blue-500 cursor-pointer hover:underline'
                            onClick={() => navigate(`${path.RECRUITMENT}/detail/${detailJob?.company?.id}/${slugify(detailJob?.company?.name, { lower: true, strict: true })}`)}
                            onMouseEnter={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                            onTouchStart={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                        >
                            <FaRegBuilding size={15} /> {detailJob?.company?.name}
                        </div>
                        <div className='text-sm px-3 font-light'>
                            <div className='text-justify dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailJob?.company?.description }}></div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoPeople className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'> {t('job_detail_page.scale')}:</span> <span className='dark:text-gray-400'>{detailJob?.company?.size} {t('job_detail_page.employees')}</span>
                        </div>
                        <div className='flex gap-2 items-center '>
                            <GrLocation className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'> {t('job_detail_page.address')}:</span> <span className='dark:text-gray-400'>{detailJob?.company?.address}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='uppercase text-lg sm:text-xl font-semibold dark:text-white'>{t('job_detail_page.description')}</h1>
                        <div>
                            <List ordered className='flex flex-col gap-6'>
                                <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                    {t('job_detail_page.information')}
                                    <List nested className='text-black text-sm font-normal'>
                                        <List.Item icon={HiCheckCircle} >{t('job_detail_page.salary')}: {detailJob?.salary}$</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Hình thức làm việc" : "Work type"}: {detailJob?.jobType}</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Giới tính" : "Gender"}: Nam.</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Số lượng" : "Quantity"}: {detailJob?.quantity}.</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Cấp bậc" : "Level"}: {detailJob?.level}.</List.Item>
                                        <List.Item icon={HiCheckCircle} >{localStorage.getItem('i18nextLng') === 'vi' ? "Địa điểm" : "Location"}: {detailJob?.location}</List.Item>
                                    </List>
                                </List.Item>
                                <div className='flex flex-col job-description'>
                                    <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                        2. {t('job_detail_page.job_detail')}
                                    </div>
                                    <div className='text-black text-justify dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailJob?.description?.replace(/\*/g, '<br>•') }}></div>

                                </div>

                                <div className='flex flex-col'>
                                    <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                        3. {t('job_detail_page.requirements')}
                                    </div>
                                    <div className='text-black text-justify dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailJob?.requirements?.replace(/\*/g, '<br>•') }}></div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                        4. {t('job_detail_page.benefits')}
                                    </div>
                                    <div className='text-black text-justify dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailJob?.benefits?.replace(/\*/g, '<br>•') }}></div>
                                </div>
                            </List>
                        </div>
                    </div>
                </div>
            </div >

            {openModal &&
                <ModalJobMatching
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    job={detailJob} />
            }

            {/* Modal apply job */}
            {
                openModalApplyJob &&
                <ModalApplyCV
                    openModal={openModalApplyJob}
                    setOpenModal={setOpenModalApplyJob}
                    jobData={detailJob}
                />
            }
        </>

    );
};

export default withErrorBoundary(DetailJobPage);
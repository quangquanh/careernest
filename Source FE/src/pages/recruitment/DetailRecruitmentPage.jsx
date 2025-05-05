import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Badge, Button, Card, Pagination, TextInput } from 'flowbite-react';
import icons from '../../utils/icons';
import JobCard from '../../components/card/JobCard';
import { CgWebsite } from "react-icons/cg";
import { TbMapSearch } from "react-icons/tb";
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { getDetailRecruitment } from '../../services/recruitmentService';
import { useQuery } from '@tanstack/react-query';
import { HiInformationCircle } from "react-icons/hi";
import { getJobsByCompany } from '../../services/jobService';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import '../job/DetailJobPage.scss';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import slugify from 'slugify';
import ModalRecruitmentMatching from '../../modules/recruitment/ModalRecruitmentMatching';
import { FiMessageSquare } from "react-icons/fi";
import RecruitmentComment from '../../modules/recruitment/RecruitmentComment';
import { useTranslation } from 'react-i18next';
import { useJobsByCompany } from '../../hooks/useJobsByCompany';

const { IoPeople, GrLocation, FaCircleInfo } = icons;
const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Nhà tuyển dụng" : "Recruiter", path: "#" }
]
const DetailRecruitmentPage = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const ref = useRef(null);
    const { id, slug } = useParams();
    const [copied, setCopied] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Chi tiết công ty';
    }, []);

    const { data: resRecruitment, isLoading, isFetching } = useQuery({
        queryKey: ['recruitment', +id],
        queryFn: () => getDetailRecruitment(+id),
        enabled: !!id,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: true,
    })
    const detailCompany = resRecruitment?.data?.company;
    const link = `http://localhost:3000/${path.RECRUITMENT}/detail/${detailCompany?.id}/${slugify(detailCompany?.name ?? '', { lower: true, strict: true })}`;

    const { res: resJobs, isFetching: isFetchJobsByCompany, error: errorJobsByCompany } = useJobsByCompany(currentPage);
    const jobsByCompany = resJobs?.data?.content ?? [];
    const meta = {
        pageSize: resJobs?.data?.size,
        pages: resJobs?.data?.totalPages,
        total: resJobs?.data?.totalElements
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const onPageChange = (page) => {
        setCurrentPage(+page);
    };

    if (!id || !slug) return null;
    if (isLoading || isFetching || isFetchJobsByCompany)
        return (
            <div className='ct-container flex flex-col gap-8 mt-20 dark:bg-gray-800'>
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
    if (detailCompany?.statusCode === 500) {
        return (
            <Alert className='mt-20' color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Không tìm  thấy thông tin nhà tuyển dụng!</span>
            </Alert>
        );
    }
    return (
        <>
            <div className='ct-container pt-20'>
                <Breadcrumbs data={data} />
                <div ref={ref} className='w-full h-[250px] rounded-md relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(/cover-default.jpg)` }}>
                    {/* Button Flowbite nằm trên cùng bên phải */}
                    <Button
                        size="sm"
                        color="light"
                        className="absolute hidden sm:block top-2 right-2 z-10 pr-4 text-blue-800"
                        onClick={() => setOpenModal(true)}
                    >
                        {t('company_detail_page.analyze_company_culture')}
                        <span className="absolute animate-bounce top-0 right-0 mt-0 -mr-1 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-md shadow">
                            New
                        </span>
                    </Button>
                    <Button
                        size="xs"
                        color="light"
                        className="absolute sm:hidden top-2 right-2 z-10 pr-4 text-blue-800"
                        onClick={() => setOpenModal(true)}
                    >
                        {t('company_detail_page.analyze_company_culture')}
                        <span className="absolute animate-bounce top-0 right-0 mt-0 -mr-1 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-md shadow">
                            New
                        </span>
                    </Button>

                    {/* Lớp overlay + nội dung */}
                    <div className='w-full h-full py-3 flex flex-col gap-4 items-center justify-end bg-gray-900 bg-opacity-30'>
                        <img
                            src={detailCompany?.logoUrl ? getFirebaseImageUrl(detailCompany.logoUrl, 'companies') : ''}
                            alt="company Logo"
                            className="w-40 h-40 object-contain dark:object-contain"
                        />
                        <h1 className='uppercase text-center font-semibold text-white text-base xs:text-xl sm:text-2xl'>
                            {detailCompany?.name}
                        </h1>
                    </div>
                </div>


                <div className='hidden w-full sm:flex mt-8 gap-6'>
                    <div className='basis-3/5 flex flex-col gap-10'>
                        <div className='flex flex-col gap-4'>
                            <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                1.   {t('company_detail_page.introduction')}
                            </div>
                            <div className='text-justify text-sm px-3 job-description'>
                                <div className='text-justify text-black dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailCompany?.description }}></div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                2.  {t('company_detail_page.current_job')}
                            </div>
                            <div className='w-full flex flex-col gap-y-4 overflow-y-auto h-[calc(100vh-300px)]'>
                                {jobsByCompany?.length <= 0 ?
                                    <Badge color="gray" size="sm" className='w-fit uppercase'>
                                        {localStorage.getItem('i18nextLng') === 'vi' ? "Chưa có thông tin tuyển dụng nào" : "No recruitment information yet."}
                                    </Badge>
                                    :
                                    <>
                                        {
                                            jobsByCompany.map(item => (
                                                <div key={item?.id} className='shadow-lg'>
                                                    <JobCard data={item} className="min-w-full xs:min-w-0" />
                                                </div>
                                            ))
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        {meta?.pages > 1 &&
                            <div className="flex overflow-x-auto justify-center mb-8">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={meta?.pages}
                                    onPageChange={onPageChange}
                                    showIcons
                                />
                            </div>
                        }
                        <div className='flex flex-col gap-6'>
                            <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                3. {t('company_detail_page.review')}
                            </div>
                            <RecruitmentComment
                                companyId={detailCompany?.id ?? null}
                            />
                        </div>
                    </div>
                    <div className='basis-2/5 flex flex-col gap-3'>
                        <h1 className='flex items-center gap-2 md:text-base lg:text-lg font-medium uppercase dark:text-white'> <FaCircleInfo className='text-gray-500' size={15} />
                            {t('company_detail_page.information')}
                        </h1>
                        <div className='flex gap-2 items-center'>
                            <CgWebsite className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'> Website:</span> <a className='text-blue-600 hover:underline' target='blank' href={detailCompany?.website}>
                                {detailCompany?.website}
                            </a>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoPeople className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'>  {t('company_detail_page.scale')}:</span> <span className='dark:text-gray-400'>{detailCompany?.size}  {t('company_detail_page.employees')}</span>
                        </div>
                        <div className='flex gap-2 items-center '>
                            <GrLocation className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'> {t('company_detail_page.address')}:</span> <span className='dark:text-gray-400'>{detailCompany?.address}</span>
                        </div>

                        <Button
                            onClick={() => { navigate('/chat/detail', { state: { receiver: resRecruitment?.data?.hr ?? {} } }) }}
                            color="light"
                            className='mt-4 dark:bg-slate-800'
                        >
                            <FiMessageSquare className="text-lg mr-2" />
                            {t('company_detail_page.chat_with_recruiter')}
                        </Button>

                        <h1 className='mt-6 flex items-center gap-2 text-lg font-medium uppercase dark:text-white'> <TbMapSearch className='text-gray-500' size={15} />
                            {t('company_detail_page.maps')}
                        </h1>
                        <iframe className='w-full h-[300px] md:h-[400px]'
                            src={`https://maps.google.com/maps?q=${detailCompany?.address}&output=embed`}>
                        </iframe>

                        {/* Clipboard */}
                        <Card className="w-full mt-8 dark:bg-slate-800 dark:shadow-lg">
                            <h2 className="text-lg font-medium uppercase dark:text-white">
                                {t('company_detail_page.share')}
                            </h2>

                            <div className="flex items-center space-x-2">
                                <TextInput
                                    type="text"
                                    value={link}
                                    readOnly
                                    className="flex-1"
                                />
                                <Button onClick={handleCopy} color="light">
                                    📋
                                </Button>
                            </div>
                            {copied && <p className="text-green-600 text-sm mt-1">
                                {localStorage.getItem('i18nextLng') === 'vi' ? "Đã sao chép" : "Copied!"}
                            </p>}

                            <p className="text-sm text-gray-500 mt-4 dark:text-gray-300">
                                {localStorage.getItem('i18nextLng') === 'vi' ? "Chia sẻ qua mạng xã hội" : "Share via social platform"}

                            </p>
                            <div className="flex gap-4 text-xl">
                                <a href="#" className="text-blue-600 border border-gray-200 rounded-full p-2 hover:scale-110 transition-transform"><FaFacebook size={30} /></a>
                                <a href="#" className="text-blue-400 border border-gray-200 rounded-full p-2 hover:scale-110 transition-transform"><FaTwitter size={30} /></a>
                                <a href="#" className="text-blue-700 border border-gray-200 rounded-full p-2 hover:scale-110 transition-transform"><FaLinkedin size={30} /></a>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Resonsive for Mobile */}
                <div className='sm:hidden w-full flex flex-col px-2 mt-8'>
                    <div className='w-full flex flex-col gap-2 mb-8'>
                        <h1 className='flex items-center gap-2 text-lg font-medium uppercase dark:text-white'> <FaCircleInfo className='text-gray-500' size={15} />
                            {t('company_detail_page.information')}
                        </h1>
                        <div className='flex gap-2 items-center'>
                            <CgWebsite className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'> Website:</span> <a className='text-blue-600 hover:underline' target='blank' href={detailCompany?.website}>
                                <span className='dark:text-gray-400'>{detailCompany?.website}</span>
                            </a>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoPeople className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'>  {t('company_detail_page.scale')}:</span> <span className='dark:text-gray-400'>{detailCompany?.size}  {t('company_detail_page.employees')}</span>
                        </div>
                        <div className='flex gap-2 items-center '>
                            <GrLocation className='text-[#23527c]' size={15} />
                            <span className='font-medium dark:text-white'>  {t('company_detail_page.address')}:</span> <span className='dark:text-gray-400'>{detailCompany?.address}</span>
                        </div>

                        <Button
                            onClick={() => { navigate('/chat/detail', { state: { receiver: resRecruitment?.data?.hr ?? {} } }) }}
                            color="light"
                            className='mt-4'
                        >
                            <FiMessageSquare className="text-lg mr-2" />
                            {t('company_detail_page.chat_with_recruiter')}
                        </Button>

                        <h1 className='mt-6 flex items-center gap-2 text-lg font-medium uppercase dark:text-white'> <TbMapSearch className='text-gray-500' size={15} />
                            {t('company_detail_page.maps')}
                        </h1>
                        <iframe className='w-full h-[300px] md:h-[400px]'
                            src='https://maps.google.com/maps?q=15/4%20Đặng%20Lộ%20P7%20Q.Tân%20Bình,%20TP.HCM&output=embed'>
                        </iframe>
                    </div>
                    <Card className="w-full my-8 dark:bg-slate-800 dark:shadow-lg">
                        <h2 className="text-lg font-medium uppercase dark:text-white">
                            {t('company_detail_page.share')}
                        </h2>

                        <div className="flex items-center space-x-2">
                            <TextInput
                                type="text"
                                value={link}
                                readOnly
                                className="flex-1"
                            />
                            <Button onClick={handleCopy} color="light">
                                📋
                            </Button>
                        </div>
                        {copied && <p className="text-green-600 text-sm mt-1">
                            {localStorage.getItem('i18nextLng') === 'vi' ? "Đã sao chép" : "Copied!"}
                        </p>}

                        <p className="text-sm text-gray-500 mt-4 dark:text-gray-300">
                            {localStorage.getItem('i18nextLng') === 'vi' ? "Chia sẻ qua mạng xã hội" : "Share via social platform"}

                        </p>
                        <div className="flex gap-4 text-xl">
                            <a href="#" className="text-blue-600 border border-gray-200 rounded-full p-2 hover:scale-110 transition-transform"><FaFacebook size={30} /></a>
                            <a href="#" className="text-blue-400 border border-gray-200 rounded-full p-2 hover:scale-110 transition-transform"><FaTwitter size={30} /></a>
                            <a href="#" className="text-blue-700 border border-gray-200 rounded-full p-2 hover:scale-110 transition-transform"><FaLinkedin size={30} /></a>
                        </div>
                    </Card>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-4'>
                            <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                1.  {t('company_detail_page.introduction')}
                            </div>
                            <div className='text-justify text-sm px-0 xs:px-3'>
                                <div className='text-justify text-black dark:text-gray-400  ' dangerouslySetInnerHTML={{ __html: detailCompany?.description }}></div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                2.  {t('company_detail_page.current_job')}
                            </div>
                            <div className='mt-3 w-full flex flex-col gap-y-4 overflow-y-auto h-[calc(100vh-300px)]'>
                                {jobsByCompany?.length <= 0 ?
                                    <Badge color="gray" size="xs" className='w-fit uppercase tracking-wide'>
                                        {localStorage.getItem('i18nextLng') === 'vi' ? "Chưa có thông tin tuyển dụng nào" : "No recruitment information yet."}
                                    </Badge>
                                    :
                                    <>
                                        {
                                            jobsByCompany.map(item => (
                                                <div key={item?.id} className='shadow-lg'>
                                                    <JobCard data={item} className="min-w-full xs:min-w-0" />
                                                </div>
                                            ))
                                        }
                                    </>

                                }
                            </div>
                        </div>
                        {meta?.pages > 1 &&
                            <div className="flex overflow-x-auto justify-center mb-8">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={meta?.pages}
                                    onPageChange={onPageChange}
                                    showIcons
                                />
                            </div>
                        }
                        <div className='flex flex-col gap-6'>
                            <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                3.  {t('company_detail_page.review')}
                            </div>
                            <RecruitmentComment
                                companyId={detailCompany?.id ?? null}
                            />
                        </div>
                    </div>

                </div>

            </div >
            {openModal &&
                <ModalRecruitmentMatching
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    company={detailCompany}
                />
            }
        </>

    );
};

export default withErrorBoundary(DetailRecruitmentPage);
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import icons from '../../utils/icons';
import slugify from 'slugify';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Tooltip } from "flowbite-react";
import ModalApplyCV from '../../modules/cv/ModalApplyCV';
import { convertTimeStampToString } from '../../utils/convertTimeStampToString';
import { getDetailJob } from '../../services/jobService';
import { path } from '../../utils/constant';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { useTranslation } from 'react-i18next';
import { convertMillisecondsToString } from '../../utils/convertMiliSecondsToString';

const { FaMoneyCheckDollar, FaRegBuilding, GrLocation, GrNetworkDrive, FaRegCalendarAlt, HiCheckCircle, FaHeart } = icons;

const JobCard = ({ className = '', data = {}, isApplied = false, isSaved = false, ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpenModal, setOpenModal] = useState(false);
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const handlePrefetchJob = (id) => {
        if (!id) return;
        queryClient.prefetchQuery({  // prefetchQuery: dùng khi muốn gọi API trước khi component mounting
            queryKey: ['job', id],
            queryFn: () => getDetailJob(id),
            staleTime: 10 * 1000,
        })
    }

    const isNew = (startDate) => {
        if (!startDate) return false;

        const now = new Date();
        const startTime = new Date(startDate * 1000); // Chuyển timestamp sang Date object

        // Chỉ lấy ngày, tháng, năm của cả hai ngày để so sánh
        now.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây là 0
        startTime.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây là 0

        // Tính số ngày khác biệt
        const diffDays = (now - startTime) / (1000 * 60 * 60 * 24);

        // Kiểm tra nếu số ngày khác biệt <= 2 (tính là mới)
        return diffDays <= 2;
    };
    const isExpired = (date) => new Date(date * 1000) < new Date();

    const getDaysUntilExpiration = (endDate) => {
        if (!endDate)
            return localStorage.getItem('i18nextLng') === 'vi' ? "Không xác định" : "Undefined";
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const end = new Date(endDate * 1000);
        end.setHours(0, 0, 0, 0);

        const days = (end - now) / 86400000;
        return days > 0
            ? localStorage.getItem('i18nextLng') === 'vi'
                ? `Hết hạn trong ${days} ngày tới`
                : `Expires in ${days} days left`
            : localStorage.getItem('i18nextLng') === 'vi'
                ? 'Đã hết hạn'
                : 'Expired';
    };

    const getJobType = (type) => ({
        FULL_TIME: "Toàn thời gian",
        PART_TIME: "Bán thời gian",
        CONTRACT: "Theo hợp đồng"
    }[type] || "");

    if (!data?.active) return null;
    return (
        <>
            <div
                className={`${className} ${isExpired(data?.endDate) && 'opacity-60'}
                relative rounded-lg w-full flex gap-4 md:gap-6 p-[12px] items-center justify-between cursor-pointer hover:rounded-md ct-hover-transition text-black hover:bg-white dark:hover:bg-gray-700`}
                onMouseEnter={() => handlePrefetchJob(+data?.id)}
                onTouchStart={() => handlePrefetchJob(+data?.id)}
            >
                {/* Thêm tag "New" */}
                {isNew(data?.startDate) && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-md">
                        NEW
                    </span>
                )}
                <div className='flex flex-col gap-2'>
                    <img
                        src={data?.company?.logoUrl ? getFirebaseImageUrl(data.company.logoUrl, 'companies') : ''}
                        alt="thumbnail"
                        className={`w-14 h-14 border border-gray-300  sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] object-contain rounded-md`}
                    />
                    <div className="w-full py-1 text-[8px] md:text-[10px] flex gap-1 items-center justify-center text-white font-semibold rounded bg-red-500">
                        <GrLocation size={18} /> {data?.location}
                    </div>
                </div>
                <div className='flex flex-auto flex-col gap-1'>
                    {(isApplied && !isSaved) ?
                        <>
                            <div className='hidden sm:flex items-center justify-between'>
                                <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase dark:text-white`}
                                    onClick={() => navigate(`/job/detail/${data?.id}/${slugify(data?.name, { lower: true, strict: true })}`)}
                                >
                                    {data?.name}
                                </div>
                                <span className='text-xs md:text-sm text-gray-700 dark:text-gray-400'>Ứng tuyển vào ngày: {convertMillisecondsToString(+props?.createdAt * 1000)}</span>
                            </div>
                            <div className='sm:hidden'>
                                <span className='text-xs md:text-sm text-gray-400 dark:text-gray-400'>Ứng tuyển vào ngày: {convertMillisecondsToString(+props?.createdAt * 1000)}</span>
                                <div className={`mt-4 text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase dark:text-white`}
                                    onClick={() => navigate(`/job/detail/${data?.id}/${slugify(data?.name, { lower: true, strict: true })}`)}
                                >
                                    {data?.name}
                                </div>
                            </div>
                        </>
                        :
                        isSaved ?
                            <>
                                <div className='hidden sm:flex items-center justify-between'>
                                    <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase dark:text-white`}
                                        onClick={() => navigate(`/job/detail/${data?.id}/${slugify(data?.name, { lower: true, strict: true })}`)}
                                    >
                                        {data?.name}
                                    </div>
                                    <div className='text-right flex flex-col gap-y-2'>
                                        <span className='text-xs md:text-sm text-orange-600'>{getDaysUntilExpiration(data?.endDate)}</span>
                                        <div className='flex items-center justify-between'>
                                            {isApplied ?
                                                <Badge icon={HiCheckCircle} color="success" size="sm">
                                                    {t('job_card.already_apply_button')}
                                                </Badge>
                                                :
                                                <>
                                                    {!isExpired(data?.endDate) ?
                                                        <Button gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>
                                                            {t('job_card.apply_button')}
                                                        </Button>
                                                        : <div></div>
                                                    }
                                                </>
                                            }
                                            <Tooltip content="Đã lưu" className='w-20' style="dark">
                                                <FaHeart size={28} color='red' />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                                <div className='sm:hidden mb-4'>
                                    <div className='flex flex-col gap-y-2'>
                                        <div className='flex gap-x-2'>
                                            <span className='text-[10px] xs:text-xs md:text-sm text-orange-600'>
                                                {getDaysUntilExpiration(data?.endDate)}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-x-4'>
                                            {isApplied ?
                                                <Badge icon={HiCheckCircle} color="success" size="xs">
                                                    {t('job_card.already_apply_button')}
                                                </Badge>
                                                : <Button size='xs' gradientDuoTone="pinkToOrange"
                                                    onClick={() => setOpenModal(true)}
                                                >
                                                    {t('job_card.apply_button')}
                                                </Button>
                                            }
                                            <Tooltip content="Đã lưu" style="dark">
                                                <FaHeart size={20} color='red' />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className={`mt-4 text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase dark:text-white`}
                                        onClick={() => navigate(`/job/detail/${data?.id}/${slugify(data?.name, { lower: true, strict: true })}`)}
                                    >
                                        {data?.name}
                                    </div>
                                </div>
                            </>
                            :
                            <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase dark:text-white`}
                                onClick={() => navigate(`/job/detail/${data?.id}/${slugify(data?.name, { lower: true, strict: true })}`)}
                            >
                                {(location.pathname === path.HOME && data?.name?.length > 22) ?
                                    data?.name?.slice(0, 22) + "..."
                                    : data?.name
                                }
                            </div>
                    }

                    <div className='flex gap-2 items-center text-xs md:text-sm font-light dark:text-gray-400'>
                        <FaRegBuilding size={15} />
                        {(location.pathname === path.HOME && data?.company?.name?.length > 24) ?
                            data?.company?.name?.slice(0, 25) + "..."
                            : data?.company?.name
                        }
                    </div>
                    <div className='flex gap-2 items-center text-xs md:text-sm font-light dark:text-gray-400'>
                        <FaRegCalendarAlt /> {convertTimeStampToString(data?.createdAt)} {t('job_card.created_time')}
                    </div>
                    <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                        <FaMoneyCheckDollar /> {t('job_card.salary')}: {data?.salary} $
                    </div>
                    <div className='flex gap-2 items-center text-xs md:text-sm font-light dark:text-gray-400'>
                        {isExpired(data?.endDate)
                            ? <Badge color="failure" size='sm' >{t('job_card.expired')}</Badge>
                            : <><GrNetworkDrive /> {getJobType(data?.jobType)} </>
                        }
                    </div>
                </div>
            </div>

            {/* Modal apply job */}
            {isOpenModal &&
                <ModalApplyCV
                    openModal={isOpenModal}
                    setOpenModal={setOpenModal}
                    jobData={data}
                />
            }
        </>

    );
};

export default JobCard;
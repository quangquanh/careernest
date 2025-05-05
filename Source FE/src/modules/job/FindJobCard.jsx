import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { path } from '../../utils/constant';
import { FaDollarSign, FaMapMarkerAlt, FaLaptop } from "react-icons/fa";
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { convertTimeStampToString } from '../../utils/convertTimeStampToString';
import { SiOpslevel } from "react-icons/si";
import { useTranslation } from 'react-i18next';

const FindJobCard = ({ job = {}, selectedJob = {}, handleSelectJob = () => { } }) => {
    const { t } = useTranslation();

    const isExpired = (date) => new Date(date * 1000) < new Date();
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

    const getJobType = (type) => ({
        FULL_TIME: "Toàn thời gian",
        PART_TIME: "Bán thời gian",
        CONTRACT: "Theo hợp đồng"
    }[type] || "");

    if (!job?.active) return null;
    return (
        <div
            className={`relative shadow-lg dark:bg-slate-800 rounded-lg p-4 cursor-pointer 
            ${selectedJob?.id === job?.id ? "border border-red-300 bg-red-50 transition-all" : ""}
            ${isExpired(job?.endDate) && 'opacity-60'}`}
            onClick={() => handleSelectJob(job)} // Cập nhật job được chọn
        >
            {/* Thêm tag "expired" */}
            {isExpired(job?.endDate) && (
                <span className="absolute bottom-0 right-0 bg-red-500 text-white text-sm uppercase font-semibold px-2 py-1">
                    {t('find_job_card.expired')}
                </span>
            )}
            {/* Thêm tag "New" */}
            {isNew(job?.startDate) && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-md">
                    NEW
                </span>
            )}
            <p className="text-gray-500 text-sm ">
                {convertTimeStampToString(job?.startDate)} {t('find_job_card.created_time')}
            </p>
            <h2 className="hidden md:block text-lg font-bold mt-1 dark:text-white">{job?.name}</h2>
            <Link to={`/job/detail/${job?.id}/${slugify(job?.name, { lower: true, strict: true })}`} target="_blank"
                className="md:hidden text-lg font-bold mt-1 dark:text-white text-md hover:underline hover:transition-all
            ">
                {job?.name}
            </Link>

            <div className="flex items-center gap-2 mt-2">
                <img
                    src={job?.company?.logoUrl ? getFirebaseImageUrl(job.company.logoUrl, 'companies') : ''}
                    alt={'company_logo'}
                    className="w-16 h-16 rounded-lg object-contain"
                />
                <Link to={`${path.RECRUITMENT}/detail/${job?.company?.id}/${slugify(job?.company?.name, { lower: true, strict: true })}`} className="text-gray-700 font-medium hover:underline hover:text-red-500 hover:transition-all dark:text-white">{job?.company?.name}</Link>
            </div>

            <p className="flex items-center gap-2 text-red-600 dark:text-blue-500 font-semibold mt-2">
                <FaDollarSign className="text-lg" /> {job?.salary} $
            </p>
            <p className="flex items-center gap-2 text-blue-500 font-semibold mt-2">
                <SiOpslevel className="text-base" /> {job?.level}
            </p>

            <div className="mt-2 text-gray-600 space-y-1 dark:text-gray-400">
                <p className="flex items-center gap-2 ">
                    <FaLaptop className="text-gray-500" /> {getJobType(job?.jobType)}
                </p>
                <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" /> {job?.location}
                </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {job?.skills?.map((skill) => (
                    <span key={skill} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:transition-all hover:bg-red-500 hover:text-white">
                        {skill?.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default React.memo(FindJobCard);
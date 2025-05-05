import React, { forwardRef, useState } from 'react';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { Link } from 'react-router-dom';
import { path } from '../../utils/constant';
import slugify from 'slugify';
import { Badge } from 'flowbite-react';
import { convertTimeStampToString } from '../../utils/convertTimeStampToString';
import { useSelector } from 'react-redux';
import { message } from "antd";
import { useMutation } from '@tanstack/react-query';
import { postSaveJob } from '../../services/userService';
import { toast } from 'react-toastify';
import { useDetailUser } from '../../hooks/useDetailUer';
import ModalApplyCV from '../../modules/cv/ModalApplyCV';
import { useTranslation } from 'react-i18next';

const DetailJobCard = forwardRef(({ job = {} }, ref) => {
    const { t } = useTranslation();

    const appliedJobs = useSelector(state => state?.user?.appliedJobs);
    const user = useSelector(state => state?.user?.info);
    const { refetch } = useDetailUser(user?.id);
    const [isOpenModal, setOpenModal] = useState(false);

    const isExpired = (date) => new Date(date * 1000) < new Date();

    const checkIsAppliedJob = (id, appliedJobs) => {
        if (!appliedJobs || appliedJobs?.length === 0) return false;
        return appliedJobs.some(item => +item?.job?.id === +id);
    };

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

    const handleSaveJob = async () => {
        if (!job?.id) return;
        if (!user?.id) {
            message.warning("Vui lòng đăng nhập trước khi lưu tin");
            return;
        }
        if (checkIsSavedJob(job?.id, user?.saveJob)) {
            message.warning("Bạn đã lưu tin tuyển dụng này!");
            return;
        }
        await mutation.mutateAsync({ userId: +user.id, jobId: +job.id });
    }

    const handleApplyJob = async () => {
        if (!job?.id) return;
        if (!user?.id) {
            message.warning("Vui lòng đăng nhập trước khi ứng tuyển");
            return;
        }
        setOpenModal(true);
    }

    if (!job) return null;
    return (
        <>
            <div ref={ref}
                className="h-fit basis-3/5 bg-white rounded-lg shadow-md dark:shadow-lg p-6 border dark:border-gray-600 overflow-hidden dark:bg-slate-800"
            >
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <img
                            src={job?.company?.logoUrl ? getFirebaseImageUrl(job.company.logoUrl, 'companies') : ''}
                            alt="Company Logo"
                            className="w-20 h-20 object-contain"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-1 dark:text-white">
                                {job?.name}
                                <Link to={`/job/detail/${job?.id}/${slugify(job?.name, { lower: true, strict: true })}`} target="_blank" className="text-blue-500 text-md hover:underline">↗</Link>
                            </h2>
                            <Link to={`${path.RECRUITMENT}/detail/${job?.company?.id}/${slugify(job?.company?.name || '', { lower: true, strict: true })}`} className="text-gray-600 hover:underline dark:text-gray-400 hover:text-red-500 hover:transition-all">
                                {job?.company?.name}
                            </Link>
                            <p className="text-green-600 font-medium mt-1">
                                $ {new Intl.NumberFormat('de-DE').format(job?.salary)} USD
                            </p>
                        </div>
                    </div>
                    {!isExpired(job?.endDate) &&
                        <button className="text-red-500 text-xl hover:text-red-600" onClick={handleSaveJob}>❤️</button>
                    }

                </div>

                {/* Apply Button */}
                {!isExpired(job?.endDate) ?
                    <button
                        className="w-full bg-red-500 hover:bg-red-600 hover:transition-colors text-white font-semibold py-2 rounded-lg mt-4"
                        onClick={!checkIsAppliedJob(job?.id, appliedJobs) ? handleApplyJob : () => { message.warning("Bạn đã ứng tuyển công việc này!") }}
                    >
                        {checkIsAppliedJob(job?.id, appliedJobs) ? t('job_detail_page.already_applied_button') : t('detail_job_card.apply_button')}
                    </button>
                    : <Badge className='uppercase text-base w-fit' color="failure" size='sm' >
                        {t('detail_job_card.expired')}
                    </Badge>
                }


                <hr className='mt-4' />

                {/* Nội dung công việc */}
                <div className="max-h-96 overflow-y-auto border-t px-6 py-4 space-y-4">
                    <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            📍 <span>{job?.company?.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            🏢 <span>{t('detail_job_card.at_office')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            ⏳ <span>
                                {convertTimeStampToString(job?.startDate)}
                                {t('detail_job_card.created_time')}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {job?.skills?.map(skill => (
                                <span key={skill?.name} className="bg-gray-200 px-2 py-1 rounded-md text-xs text-gray-800 cursor-pointer hover:transition-all hover:bg-red-500 hover:text-white">{skill?.name}</span>
                            ))}
                        </div>
                    </div>

                    {/* description */}
                    <div className="mt-6">
                        <h3 className="font-bold text-[#ee4d2d] mb-2">1.  {t('detail_job_card.description')}</h3>
                        <div className='text-black text-justify text-wrap dark:text-gray-400' dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                    </div>
                    {/* requirements */}
                    <div className="mt-6">
                        <h3 className="font-bold text-[#ee4d2d] mb-2">2.  {t('detail_job_card.requirements')}</h3>
                        <div className='text-black text-justify text-wrap dark:text-gray-400' dangerouslySetInnerHTML={{ __html: job?.requirements }}></div>
                    </div>
                    {/* benefits */}
                    <div className="mt-6">
                        <h3 className="font-bold text-[#ee4d2d] mb-2">3.  {t('detail_job_card.benefits')}</h3>
                        <div className='text-black text-justify text-wrap dark:text-gray-400' dangerouslySetInnerHTML={{ __html: job?.benefits }}></div>
                    </div>

                </div>
            </div>
            {/* Modal apply job */}
            {isOpenModal &&
                <ModalApplyCV
                    openModal={isOpenModal}
                    setOpenModal={setOpenModal}
                    jobData={job}
                />
            }
        </>

    );
});

export default React.memo(DetailJobCard);

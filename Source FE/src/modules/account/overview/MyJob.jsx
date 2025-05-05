import { Avatar, Badge } from 'flowbite-react';
import React from 'react';
import { path } from '../../../utils/constant';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MyJob = () => {
    const user = useSelector(state => state?.user?.info);
    const appliedJobs = useSelector(state => state?.user?.appliedJobs);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className='w-full flex flex-col gap-y-4 shadow-md dark:shadow-lg p-4 rounded-lg dark:bg-slate-800'>
            <Badge className='w-fit text-base sm:text-lg' color="warning" size='sm'>{t('overview_page.user_activity.title')}</Badge>
            <div className='w-full flex gap-4'>
                <div className='basis-1/2 bg-[#eaf0fa] dark:bg-gray-300 flex rounded-lg cursor-pointer hover:border hover:border-blue-500 ct-hover-transition'
                    onClick={() => navigate(`${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`, { state: 'applied' })}
                >
                    <div className='basis-2/3 flex flex-col gap-y-4 p-3'>
                        <div className='text-slate-800 font-medium text-sm xs:text-lg sm:text-xl'>{t('overview_page.user_activity.applied_jobs')}</div>
                        <span className='text-[#085bdd] font-bold text-2xl sm:text-3xl flex items-center gap-3'>
                            {appliedJobs?.length > 0 ? appliedJobs.length : 0} <MdKeyboardDoubleArrowRight size={18} />
                        </span>
                    </div>
                    <div className='basis-1/3 flex items-center'>
                        <Avatar size='lg' className='hidden xs:block'
                            img={'https://itviec.com/assets/profile/paper-plane-8a851b897473226130bc976102c2b0c3ba7883876b92aa9f8961c40433694f83.svg'}
                        />
                        <Avatar size='md' className='xs:hidden'
                            img={'https://itviec.com/assets/profile/paper-plane-8a851b897473226130bc976102c2b0c3ba7883876b92aa9f8961c40433694f83.svg'}
                        />
                    </div>
                </div>
                <div className='basis-1/2 bg-[#fff5f5] dark:bg-gray-300 flex rounded-lg cursor-pointer hover:border hover:border-red-500 ct-hover-transition'
                    onClick={() => navigate(`${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`, { state: 'saved' })}
                >
                    <div className='basis-2/3 flex flex-col gap-y-4 p-3'>
                        <div className='text-slate-800 font-medium text-sm xs:text-lg sm:text-xll'>{t('overview_page.user_activity.saved_jobs')}</div>
                        <span className='text-[#c82222] font-bold text-2xl sm:text-3xl flex items-center gap-3'>
                            {user?.saveJob?.length > 0 ? user.saveJob.length : 0} <MdKeyboardDoubleArrowRight size={18} />
                        </span>
                    </div>
                    <div className='basis-1/3 flex items-center'>
                        <Avatar size='lg' className='hidden xs:block'
                            img={'https://itviec.com/assets/profile/healthcare-fea9f68443eab63e2b652d0cfd2c9e53a3856f78ea5d3a88b536bffb4258913c.svg'}
                        />
                        <Avatar size='md' className='xs:hidden'
                            img={'https://itviec.com/assets/profile/healthcare-fea9f68443eab63e2b652d0cfd2c9e53a3856f78ea5d3a88b536bffb4258913c.svg'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyJob;
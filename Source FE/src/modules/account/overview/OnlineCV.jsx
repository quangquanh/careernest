import { Badge } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../../utils/constant';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useOnlineResumes } from '../../../hooks/useOnlineResumes';
import withErrorBoundary from '../../../hoc/withErrorBoundary';
import CompanyCardSkeleton from '../../../components/skeleton/CompanyCardSkeleton';
import { useTranslation } from 'react-i18next';

const OnlineCV = () => {
    const { res, isFetching, error } = useOnlineResumes();
    const onlResumes = res?.data ?? [];
    const { t } = useTranslation();

    if (error) {
        console.log(error);
        return null;
    }
    if (isFetching)
        return <CompanyCardSkeleton />
    return (
        <div className='w-full flex flex-col gap-y-4 shadow-md dark:shadow-lg p-4 rounded-lg mb-6 dark:bg-slate-800'>
            <Badge className='w-fit text-sm sm:text-lg' color="success" size='sm'>{t('overview_page.online_cv.title')}</Badge>
            <div className='w-full flex gap-x-3 rounded-lg bg-[#f7f7f7] dark:bg-gray-800 p-2 xs:p-6 border border-gray-200 dark:border-gray-600'>
                <div className='basis-1/3 flex flex-col gap-y-2 items-center justify-center'>
                    <span className='rounded-full bg-red-500 w-12 xs:w-16 h-12 xs:h-16 sm:w-20 sm:h-20 flex items-center justify-center text-white text-lg xs:text-2xl sm:text-3xl font-bold'>{onlResumes?.length ?? 0}</span>
                    <span className='text-xs dark:text-white xs:text-[13px] sm:text-lg font-medium text-center'>{t('overview_page.online_cv.created')}</span>
                </div>
                <div className='basis-2/3 flex flex-col gap-y-3'>
                    <p className='text-[11px] xs:tex-sm sm:text-base text-justify dark:text-gray-400'>
                        {t('overview_page.online_cv.description')}
                    </p>
                    <Link to={`${path.CV}/${path.CV__MANAGE}`} className='flex text-xs xs:text-sm items-center text-blue-600'>
                        {t('overview_page.online_cv.manage_cv')} <MdKeyboardDoubleArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default withErrorBoundary(OnlineCV);
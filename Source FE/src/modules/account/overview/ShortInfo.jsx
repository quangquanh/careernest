import { Avatar } from 'flowbite-react';
import React from 'react';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import icons from '../../../utils/icons';
import { Link } from 'react-router-dom';
import { path } from '../../../utils/constant';
import { useSelector } from 'react-redux';
import { getFirebaseImageUrl } from '../../../utils/getFirebaseImageURL';
import { useTranslation } from 'react-i18next';

const { CiMail, MdOutlineSubtitles } = icons;

const ShortInfo = () => {
    const user = useSelector(state => state?.user?.info);
    const { t } = useTranslation();

    if (!user?.id) return null;
    return (
        <div className='w-full flex gap-x-4 shadow-md p-4 rounded-lg mb-6 dark:shadow-lg dark:bg-slate-800'>
            <Avatar img={user?.avatarUrl ? getFirebaseImageUrl(user.avatarUrl, 'users') : ''} size='lg' rounded />
            <div className='flex flex-col gap-y-3'>
                <h1 className='font-semibold text-xl xs:text-3xl text-slate-800 dark:text-white'>
                    {`${user?.lastName} ${user?.firstName}`}
                </h1>
                <div className='flex gap-2 items-center text-gray-600 dark:text-gray-400'>
                    <MdOutlineSubtitles size={15} />
                    <span className='font-medium'> Fresher Web Developer</span>
                </div>
                <div className='flex gap-2 items-center text-gray-600 dark:text-gray-400'>
                    <CiMail size={15} />
                    <span className='font-medium'> {user?.email}</span>
                </div>
                <Link to={`${path.ACCOUNT}/profile`} className='flex items-center text-blue-600'>
                    {t('overview_page.short_info.detail')} <MdKeyboardDoubleArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default ShortInfo;
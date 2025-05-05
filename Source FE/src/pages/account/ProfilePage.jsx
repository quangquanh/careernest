import React, { useEffect, useRef, useState } from 'react';
import { path } from '../../utils/constant';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import UpdateAccount from '../../modules/account/UpdateAccount';
import { ChangePasswordModal } from '../../modules/account/ChangePasswordModal';
import { Avatar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { convertMillisecondsToString } from '../../utils/convertMiliSecondsToString';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { useTranslation } from 'react-i18next';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Tài khoản" : "Account", path: "#" }
]
const ProfilePage = () => {
    const { t } = useTranslation();

    const user = useSelector(state => state?.user?.info);
    const ref = useRef(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Thông tin tài khoản';
    }, []);


    if (!user)
        return (
            <div className='ct-container flex flex-col gap-8 mt-[60px] pt-12 dark:text-gray-800'>
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
    return (
        <>
            <div ref={ref} className='w-full mt-14 px-6 md:px-10 lg:px-[150px]'>
                <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
                    <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
                        <Breadcrumbs data={data} />
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                                {t('profile_page.title')}
                            </h2>
                            <span onClick={() => setOpenChangePasswordModal(true)} className=' text-xs xs:text-sm text-gray-500 cursor-pointer hover:underline hover:transition-all'>
                                {t('profile_page.change_password')}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 xs:gap-6 border-b border-t border-gray-200 py-4 dark:border-gray-700 md:py-8 lg:grid-cols-4 xl:gap-16">
                            <div>
                                <svg className="mb-2 h-6 w-6 xs:h-8 xs:w-8 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth={2} d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                </svg>
                                <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                                    {t('profile_page.applied_jobs')}
                                </h3>
                                <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                                    0
                                </span>
                            </div>
                            <div>
                                <svg className="mb-2 h-6 w-6 xs:h-8 xs:w-8 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                </svg>
                                <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                                    {t('profile_page.saved_jobs')}
                                </h3>
                                <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                                    {user?.saveJob?.length ?? 0}
                                </span>
                            </div>
                        </div>
                        <div className="py-4 md:py-8">
                            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
                                <div className="space-y-4">
                                    <div className="flex space-x-4">
                                        <Avatar img={user?.avatarUrl ? getFirebaseImageUrl(user.avatarUrl, 'users') : ''} size='lg' rounded />
                                        <div>
                                            <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> STANDARD Account </span>
                                            <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">{`${user?.lastName} ${user?.firstName}`}</h2>
                                        </div>
                                    </div>
                                    <dl className>
                                        <dt className="font-semibold text-gray-900 dark:text-white">{t('profile_page.email')}</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">{user?.email}</dd>
                                    </dl>
                                    <dl>
                                        <dt className="font-semibold text-gray-900 dark:text-white">{t('profile_page.address')}</dt>
                                        <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                            <svg className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                            </svg>
                                            {user?.address ?? "Chưa có dữ liệu"}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt className="font-semibold text-gray-900 dark:text-white">{t('profile_page.gender')}</dt>
                                        <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                            {user?.gender === 'MALE' ? 'Nam' : "Nữ"}
                                        </dd>
                                    </dl>
                                </div>
                                <div className="space-y-4">
                                    <dl>
                                        <dt className="font-semibold text-gray-900 dark:text-white">{t('profile_page.phone')}</dt>
                                        <dd className="text-gray-500 dark:text-gray-400">{user?.phoneNumber ?? 'Chưa có dữ liệu'}</dd>
                                    </dl>
                                    <dl>
                                        <dt className="font-semibold text-gray-900 dark:text-white">{t('profile_page.dob')}</dt>
                                        <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                            {user?.dateOfBirth ? convertMillisecondsToString(user.dateOfBirth) : 'Chưa có dữ liệu'}
                                        </dd>
                                    </dl>
                                    {/* <dl>
                                        <dt className="mb-1 font-semibold text-gray-900 dark:text-white">Payment Methods</dt>
                                        <dd className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                                <img className="h-4 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt />
                                                <img className="hidden h-4 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt />
                                            </div>
                                            <div>
                                                <div className="text-sm">
                                                    <p className="mb-0.5 font-medium text-gray-900 dark:text-white">Visa ending in 7658</p>
                                                    <p className="font-normal text-gray-500 dark:text-gray-400">Expiry 10/2024</p>
                                                </div>
                                            </div>
                                        </dd>
                                    </dl> */}
                                </div>
                            </div>
                            <button onClick={() => setOpenModal(true)} type="button" data-modal-target="accountInformationModal2" data-modal-toggle="accountInformationModal2" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto">
                                <svg className="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                                {t('profile_page.edit_button')}
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Account Information Modal */}
            {isOpenModal && <UpdateAccount isOpen={isOpenModal} setOpenModal={setOpenModal} />}
            {openChangePasswordModal && <ChangePasswordModal isOpen={openChangePasswordModal} setOpenModal={setOpenChangePasswordModal} />}
        </>
    );
};

export default ProfilePage;
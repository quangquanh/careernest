import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { FiMapPin } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

const FindJob = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('all');

    const handleSearch = () => {
        if (keyword)
            navigate(`${path.FIND__JOB}/${location}/${keyword.toLowerCase()}`);
        else
            navigate(`${path.FIND__JOB}/${location}`);
    };

    return (
        <div className={`w-full h-[500px] bg-slider-bg bg-cover bg-no-repeat bg-bottom mb-6 md:mb-16`}>
            <div className='w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-60'>
                <div className='mx-16 text-white text-center'>
                    <div className='mt-14 sm:mt-0 font-medium text-xl sm:text-3xl md:text-4xl mb-6 animate-pulse'>
                        {t('homepage.find_job_section.hero_title')}
                    </div>
                    <div className='font-medium text-xs sm:text-lg lg:text-base mb-8 animate-fadeIn'>
                        {t('homepage.find_job_section.hero_subtitle')}
                    </div>
                    <div className='hidden sm:flex gap-x-4 lg:gap-x-8 mb-8'>
                        <div className="basis-2/3">
                            <input
                                type="text"
                                id="default-input"
                                placeholder={t('homepage.find_job_section.search_placeholder')}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <form className="basis-1/3 max-w-sm mx-auto relative">
                            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-gray-50 border text-xs lg:text-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="all">{localStorage.getItem('i18nextLng') === 'vi' ? "Tất cả tỉnh thành" : "All cities"}</option>
                                <option value="ho chi minh">{localStorage.getItem('i18nextLng') === 'vi' ? "Hồ Chí Minh" : "Ho Chi Minh"}</option>
                                <option value="ha noi">{localStorage.getItem('i18nextLng') === 'vi' ? "Hà Nội" : "Ha Noi"}</option>
                                <option value="da nang">{localStorage.getItem('i18nextLng') === 'vi' ? "Đà Nẵng" : "Da Nang"}</option>
                            </select>
                        </form>

                        <Button className="w-fit" gradientMonochrome="info" onClick={handleSearch}>
                            <span className='flex items-center justify-center' >
                                <svg className="text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /> </svg>
                            </span>
                        </Button>
                    </div>
                    <div className='sm:hidden flex flex-col gap-3 mb-6'>
                        <div className="w-full">
                            <input type="text" id="default-input" placeholder="Từ khóa công việc..."
                                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <form className="w-[50%] relative">
                                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    id="countries"
                                    className="bg-gray-50 border text-xs lg:text-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="all">{localStorage.getItem('i18nextLng') === 'vi' ? "Tất cả tỉnh thành" : "All cities"}</option>
                                    <option value="ho chi minh">{localStorage.getItem('i18nextLng') === 'vi' ? "Hồ Chí Minh" : "Ho Chi Minh"}</option>
                                    <option value="ha noi">{localStorage.getItem('i18nextLng') === 'vi' ? "Hà Nội" : "Ha Noi"}</option>
                                    <option value="da nang">{localStorage.getItem('i18nextLng') === 'vi' ? "Đà Nẵng" : "Da Nang"}</option>
                                </select>
                            </form>
                        </div>
                        <div className='w-full mt-3 flex justify-center'>
                            <Button className="w-fit" gradientMonochrome="info" onClick={handleSearch}>
                                <span className='flex items-center justify-center gap-2' >
                                    {t('homepage.find_job_section.search_button')}
                                    <svg className="text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /> </svg>
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className='hidden w-full sm:flex items-center gap-x-4'>
                        <span className='text-base'> {t('homepage.find_job_section.suggestions')}: </span>
                        <span onClick={() => setKeyword("ReactJS")} className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'>ReactJS</span>
                        <span onClick={() => setKeyword("NodeJS")} className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'>NodeJS</span>
                        <span onClick={() => setKeyword("Java")} className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'>Java</span>
                        <span onClick={() => setKeyword("Python")} className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'>Python</span>
                    </div>
                    <div className='sm:hidden w-full flex flex-col gap-y-4'>
                        <span className='text-base'>{t('homepage.find_job_section.suggestions')}: </span>
                        <div className='flex gap-x-2 xs:gap-x-4 items-center justify-center'>
                            <span className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'
                                onClick={() => setKeyword("ReactJS")}>
                                ReactJS
                            </span>
                            <span className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'
                                onClick={() => setKeyword("NodeJS")}>
                                NodeJS
                            </span>
                            <span className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'
                                onClick={() => setKeyword("Java")}>
                                Java
                            </span>
                            <span className='text-white px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-500 ct-hover-transition hover:cursor-pointer'
                                onClick={() => setKeyword("Python")}>
                                Python
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FindJob;
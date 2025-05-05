import React from 'react';
import { Card } from "flowbite-react";
import { useTranslation } from 'react-i18next';

const OutstandingPost = () => {
    const { t } = useTranslation();

    return (
        <div className='ct-container py-10 bg-gray-100 dark:bg-slate-800'>
            <h1 className='text-xl mb-10 text-center text-slate-800 font-bold uppercase dark:text-white'>
                {t('homepage.featured_posts_section.section_title')}
            </h1>
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10'>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="https://itviec.com/blog/wp-content/uploads/2025/01/cau-hoi-phong-van-sql-vippro.jpg"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide text-gray-900 dark:text-white">
                        {t('homepage.featured_posts_section.sql.title')}
                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        {t('homepage.featured_posts_section.sql.description')}
                    </p>
                    <a href="#" className='dark:text-white'>
                        {t('homepage.featured_posts_section.sql.button')}
                    </a>
                </Card>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="https://itviec.com/blog/wp-content/uploads/2025/02/cau-hoi-phong-va-html-css-vippro.jpeg"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide   text-gray-900 dark:text-white">
                        {t('homepage.featured_posts_section.html_css.title')}

                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        {t('homepage.featured_posts_section.html_css.description')}
                    </p>
                    <a href="#" className='dark:text-white'>
                        {t('homepage.featured_posts_section.html_css.button')}
                    </a>
                </Card>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="https://itviec.com/blog/wp-content/uploads/2023/04/Artboard-1-950x500.webp"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide text-gray-900 dark:text-white">
                        {t('homepage.featured_posts_section.writing_contest.title')}

                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        {t('homepage.featured_posts_section.writing_contest.description')}
                    </p>
                    <a href="#" className='dark:text-white'>
                        {t('homepage.featured_posts_section.writing_contest.button')}
                    </a>
                </Card>
            </div>
        </div>
    );
};

export default OutstandingPost;
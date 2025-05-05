import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../utils/constant';
import { useTranslation } from 'react-i18next';

const cards = [
    {
        id: 1,
        image: "https://itviec.com/assets/homepage/user-profile-704fabd6761d6f9a4efc54371bc6cc0bef771ff9ae1dce97b2cb137aa74732d6.svg", // Thay bằng đường dẫn icon thực tế
        title: "homepage.cv_section.profile.title",
        description: "homepage.cv_section.profile.description",
        buttonText: "homepage.cv_section.profile.button",
        isNew: false,
        path: `${path.ACCOUNT}/${path.ACCOUNT__OVERVIEW}`
    },
    {
        id: 2,
        image: "https://itviec.com/assets/homepage/cv-template-c6f6a4b0c4211ea345421e77c4e1ce22c2392cfebee8993324eee7015ea44d89.svg",
        title: "homepage.cv_section.cv.title",
        description: "homepage.cv_section.cv.description",
        buttonText: "homepage.cv_section.cv.button",
        isNew: true,
        path: `${path.CV}/${path.CV__MANAGE}`

    },
    {
        id: 3,
        image: "https://itviec.com/assets/homepage/blog-a0cee7c69f270172e8c4470bde32d5c15e0a113cb4c3aa92f9d8bfc9ab92c8c7.svg",
        title: "homepage.cv_section.blog.title",
        description: "homepage.cv_section.blog.description",
        buttonText: "homepage.cv_section.blog.button",
        isNew: false,
        path: '/blog'

    },
];

const CVSection = () => {
    const { t } = useTranslation();

    return (
        <div className="main-cv tracking-wider ct-container ">
            <h1 className='text-center text-base sm:text-lg xs:text-xl mb-10 text-slate-800 font-bold uppercase dark:text-white'>{t('homepage.cv_section.section_title')}</h1>
            <div className="hidden lg:flex justify-center gap-6">
                {cards.map((card) => (
                    <div key={card.id} className="flex items-center gap-3 p-3 border rounded-lg shadow-md w-96 bg-white dark:bg-gray-800">
                        {/* Icon bên trái */}
                        <div className="w-14 h-14 flex-shrink-0">
                            <img src={card.image} alt={t(card.title)} className="w-full h-full object-contain" />
                        </div>

                        {/* Nội dung bên phải */}
                        <div className="flex flex-col gap-y-3">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg dark:text-white">{t(card.title)}</h3>
                                {card?.isNew && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">{t('homepage.cv_section.cv.tag')}</span>}
                            </div>
                            <p className="text-gray-600 text-sm dark:text-white">{t(card.description)}</p>
                            <Link to={card?.path} className="w-2/3 text-center mt-3 p-2 border border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-500 hover:text-white transition">
                                {t(card.buttonText)}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="lg:hidden flex flex-col gap-6">
                {cards.map((card) => (
                    <div key={card.id} className="flex items-center justify-center gap-3 p-6 border rounded-lg w-full bg-white dark:bg-gray-800">
                        {/* Icon bên trái */}
                        <div className="w-16 h-16 flex-shrink-0">
                            <img src={card.image} alt={t(card.title)} className="w-full h-full object-contain" />
                        </div>

                        {/* Nội dung bên phải */}
                        <div className="flex flex-col gap-y-3">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg dark:text-white">{t(card.title)}</h3>
                                {card?.isNew && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">Mới</span>}
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-400">{t(card.description)}</p>
                            <Link to={card?.path} className="w-2/3 text-center mt-3 p-2 border border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-500 hover:text-white transition">
                                {t(card.buttonText)}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CVSection;
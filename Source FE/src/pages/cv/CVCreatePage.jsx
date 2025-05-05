import React, { useEffect, useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Badge } from 'flowbite-react';
import './CVCreatePage.scss';
import FormCreateCV from '../../modules/cv/FormCreateCV';
import { useTranslation } from 'react-i18next';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Quản lý CV" : "Manage CV", path: path.CV + '/' + path.CV__MANAGE },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Tạo CV" : "Create CV", path: '#' },
]
const CVCreatePage = () => {
    const { t } = useTranslation();
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Tạo CV';
    }, []);

    return (
        <div ref={ref} className='ct-container py-4 pt-20 bg-[#f7f7f7] dark:bg-slate-900'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] dark:bg-slate-800 px-6 py-3 rounded-lg'>
                <Badge className='py-2 rounded-md mb-4 tracking-wider text-base dark:bg-slate-800' color="gray" size='sm'>
                    {t('cv_create_page.title')}
                </Badge>
                <FormCreateCV />
            </div>
        </div>
    );
};

export default CVCreatePage;
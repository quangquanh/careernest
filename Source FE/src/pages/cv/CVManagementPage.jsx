import React, { useEffect, useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Badge, Button } from 'flowbite-react';
import icons from '../../utils/icons';
import { useNavigate } from 'react-router-dom';
import CVCard from '../../components/card/CVCard';
import AttachedCV from '../../modules/account/overview/AttachedCV';
import { useSelector } from "react-redux";
import { useOnlineResumes } from '../../hooks/useOnlineResumes';
import CompanyCardSkeleton from '../../components/skeleton/CompanyCardSkeleton';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { useTranslation } from 'react-i18next';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Quản lý CV" : "Manage CV", path: "#" }
]

const { CiCirclePlus } = icons;

const CVManagementPage = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const ref = useRef(null);
    const user = useSelector(state => state?.user?.info);

    const { res, isFetching, error, refetch } = useOnlineResumes();
    const onlResumes = res?.data ?? [];

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Quản lý CV';
    }, []);

    if (!user?.id) return null;
    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div ref={ref} className='ct-container py-4 pt-20 bg-[#f7f7f7] dark:bg-slate-900'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] dark:bg-slate-800 px-3 xs:px-6 py-4 rounded-lg'>
                <Badge className='py-2 rounded-md dark:bg-slate-800' color="gray" size='sm'>
                    {t('cv_manage_page.title')}
                </Badge>
                <Button className='my-4' size='sm' gradientDuoTone="cyanToBlue" onClick={() => navigate(`${path.CV}/${path.CV__CREATE}`)}>
                    <CiCirclePlus className='mr-2' size={22} />  {t('cv_manage_page.button_add')}
                </Button>

                <AttachedCV />

                <Badge className='w-fit mt-20 text-sm sm:text-lg' color="success" size='sm'>
                    {t('cv_manage_page.online_cv.title')}
                </Badge>
                {isFetching && <CompanyCardSkeleton />}
                <div className='w-full mt-4 flex flex-col gap-y-4 overflow-y-auto h-fit max-h-[400px]'>
                    {onlResumes?.length > 0 ?
                        <>
                            {onlResumes.map(item => (
                                <CVCard
                                    key={item?.id}
                                    className='border border-gray-200 dark:border-gray-500'
                                    data={item}
                                    refetchOnlResumes={refetch}
                                />
                            ))}
                        </>
                        :
                        <Badge color="gray" size="sm" className='w-fit uppercase'>
                            {t('cv_manage_page.empty')}
                        </Badge>
                    }
                </div>
            </div>
        </div>
    );
};

export default withErrorBoundary(CVManagementPage);
import React, { useEffect, useRef, useState } from 'react';
import EmployerLogoCard from '../../components/card/EmployerLogoCard';
import './TopEmployer.scss';
import { getAllRecruitment } from '../../services/recruitmentService';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import CompanyCardSkeleton from '../../components/skeleton/CompanyCardSkeleton';
import { Pagination } from 'flowbite-react';
import { useTranslation } from 'react-i18next';

const TopEmployer = () => {
    const { t } = useTranslation();

    const [listCompanies, setListCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState({
        page: 1,
        pageSize: 0,
        pages: 0,
        total: 0
    });
    const containerRef = useRef(null);  // Tạo ref để cuộn đến div chứa danh sách công ty

    const fetchAllCompanies = async () => {
        setIsLoading(true);
        try {
            let res = await getAllRecruitment(currentPage);
            if (res?.result?.length > 0) {
                setMeta(res?.meta);
                setListCompanies(res?.result);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message ?? 'Error when fetching all companies');
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCompanies();
    }, [currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(+page);
        // Cuộn đến phần tử chứa danh sách công ty
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (listCompanies.length <= 0) return null;
    if (isLoading)
        return (
            <div className='ct-container mt-20'>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7'>
                    <CompanyCardSkeleton /> <CompanyCardSkeleton /> <CompanyCardSkeleton />
                </div>
            </div>
        )
    return (
        <>
            <div className='ct-container' ref={containerRef}>
                <h1 className='text-base sm:text-lg xs:text-2xl mb-10 text-center text-slate-800 font-bold uppercase dark:text-white'>{t('homepage.top_recruiter_section.title')}</h1>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7'>
                    {listCompanies?.length > 0 && listCompanies.map(item => (
                        <EmployerLogoCard key={item?.id} data={item} />
                    ))}
                </div>
            </div>
            <div className="flex overflow-x-auto justify-center mb-8">
                <Pagination currentPage={currentPage} totalPages={meta?.pages} onPageChange={onPageChange} showIcons />
            </div>
        </>

    );
};

export default withErrorBoundary(TopEmployer);
import { useQuery } from '@tanstack/react-query';
import { getAllCompanies } from '../services/companyService';
import { useSelector } from 'react-redux';

export const useCompanies = (currentPage = 1) => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['companies', currentPage],
        queryFn: () => getAllCompanies(currentPage),
        enabled: user?.role?.id === 1, // Chỉ ADMIN mới được gọi
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData, // thường dùng khi Paginate
    });

    return { res, isLoading, isFetching, error, refetch };
};

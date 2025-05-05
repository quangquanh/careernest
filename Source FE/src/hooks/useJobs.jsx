import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from '../services/jobService';
import { useSelector } from 'react-redux';

export const useJobs = (currentPage = 1, name = '') => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['listJobs', currentPage, name],
        queryFn: () => getAllJobs(currentPage, name),
        enabled: user?.role?.id === 1, // Chỉ ADMIN mới được gọi
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData, // thường dùng khi Paginate
    });

    return { res, isLoading, isFetching, error, refetch };
};

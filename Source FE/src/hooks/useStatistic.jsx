import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getAllStatistic } from '../services/statisticService';

export const useStatistic = () => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['statistics'],
        queryFn: () => getAllStatistic(),
        enabled: user?.role?.id === 1, // Chỉ ADMIN mới được gọi
        staleTime: 6 * 1000,
        refetchOnWindowFocus: true,
    });

    return { res, isLoading, isFetching, error, refetch };
};

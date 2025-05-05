import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '../services/roleService';
import { useSelector } from 'react-redux';

export const useRoles = () => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['roles'],
        queryFn: () => getAllRoles(),
        enabled: user?.role?.id === 1, // Chỉ role ADMIN mới được gọi
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
    });

    return { res, isLoading, isFetching, error, refetch };
};

import { useQuery } from '@tanstack/react-query';
import { getAllPermissions } from '../services/permissionService';
import { useSelector } from 'react-redux';

export const usePermissions = () => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['permissions'],
        queryFn: () => getAllPermissions(),
        enabled: user?.role?.id === 1, // Chỉ role ADMIN mới được gọi
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });

    return { res, isLoading, isFetching, error, refetch };
};

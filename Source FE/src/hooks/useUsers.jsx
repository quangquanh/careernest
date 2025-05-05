import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../services/userService';
import { useSelector } from 'react-redux';

export const useUsers = () => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
        enabled: user?.role?.id === 1, // Chỉ ADMIN mới được gọi
        staleTime: 30 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData, // thường dùng khi Paginate
    });

    return { res, isLoading, isFetching, error, refetch };
};

import { useQuery } from '@tanstack/react-query';
import { getUsersConnected } from '../services/chatService';
import { useSelector } from 'react-redux';

export const useUsersConnected = () => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['usersConnected'],
        queryFn: () => getUsersConnected(user?.id),
        enabled: !!user?.id,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: true,
    });

    return { res, isLoading, isFetching, error, refetch };
};

import { useQuery } from '@tanstack/react-query';
import { getDetailUser } from '../services/userService';

export const useDetailUser = (id) => {
    const {
        data: res,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['detail_user', id],
        queryFn: () => getDetailUser(id),
        enabled: !!id,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: false,
    });

    return {
        res,
        isLoading,
        isFetching,
        error,
        refetch,
    };
};

import { useQuery } from '@tanstack/react-query';
import { getAllSubscribersByEmail } from '../services/subcriberService';
import { useSelector } from 'react-redux';

export const useSubscribers = (email = '') => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['subscribers', email],
        queryFn: () => getAllSubscribersByEmail(email),
        enabled: !!user?.id && email.trim() !== '',
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return { res, isLoading, isFetching, error, refetch };
};

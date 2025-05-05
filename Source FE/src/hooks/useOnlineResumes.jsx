import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getAllResumesByUser } from '../services/resumeService';

export const useOnlineResumes = () => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['onlineResumes', user?.id],
        queryFn: () => getAllResumesByUser(),
        staleTime: 10 * 1000,
        refetchOnWindowFocus: false,
        enabled: Boolean(user?.id),
    });

    return { res, isLoading, isFetching, error, refetch };
};

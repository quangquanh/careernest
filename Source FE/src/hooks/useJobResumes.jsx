import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getResumesByJob } from '../services/resumeService';

export const useJobResumes = (jobId = '') => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['jobResumes', jobId],
        queryFn: () => getResumesByJob(+jobId),
        enabled: (!!jobId && (user?.role?.id === 1 || user?.role?.id === 2)),
        staleTime: 30 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData,
    });

    return { res, isLoading, isFetching, error, refetch };
};

import { useQuery } from '@tanstack/react-query';
import { getDetailJob } from '../services/jobService';

export const useDetailJob = (id) => {
    const {
        data: res,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['detail_job', id],
        queryFn: () => getDetailJob(id),
        enabled: !!id,
        staleTime: 60 * 1000,
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

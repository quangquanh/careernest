import { useQuery } from '@tanstack/react-query';
import { getAllSkills } from '../services/skillService';
import { useSelector } from 'react-redux';

export const useSkills = () => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['skills'],
        queryFn: () => getAllSkills(),
        enabled: !!user?.id, 
        staleTime: 90 * 1000,
        refetchOnWindowFocus: false,
    });

    return { res, isLoading, isFetching, error, refetch };
};

import { useQuery } from '@tanstack/react-query';
import { getDetailCompany } from '../services/companyService';

export const useDetailCompany = (id) => {
    const {
        data: res,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['detail_company', id],
        queryFn: () => getDetailCompany(id),
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

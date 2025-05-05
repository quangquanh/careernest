import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken } from '../services/authService';
import { fetchAllAppliedJobs, updateUserInfo } from '../redux/slices/userSlice';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDetailUser } from './useDetailUer';

const useAppLogic = () => {
    const user = useSelector(state => state?.user?.info);
    const dispatch = useDispatch();
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const { res } = useDetailUser(userId || undefined);

    const { data: resRefreshToken, isLoading } = useQuery({
        queryKey: ['refreshToken'],
        queryFn: () => getRefreshToken(),
        enabled: !user?.id,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (location.pathname.includes('/system'))
            document.body.style.overflow = 'hidden'; // Vô hiệu hóa cuộn
        else
            document.body.style.overflow = 'auto'; // Bật lại cuộn

        // Cleanup để đảm bảo không bị ảnh hưởng khi component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [location.pathname]);

    useEffect(() => {
        if (!isLoading) {
            if (resRefreshToken?.statusCode === 200) {
                dispatch(updateUserInfo({ ...resRefreshToken?.data }));
                setUserId(resRefreshToken?.data?.user?.id);
                if (resRefreshToken?.data?.user?.role?.id === 3)
                    dispatch(fetchAllAppliedJobs({ id: +resRefreshToken?.data?.user?.id }));
            }
            else {
                // logout
                console.log('Error:', `${resRefreshToken?.data?.error}:${resRefreshToken?.data?.message}`);
                return;
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (userId && res)
            dispatch(updateUserInfo({ info: res?.data, access_token: resRefreshToken?.data?.access_token }));
    }, [userId, res]);

};


export default useAppLogic;
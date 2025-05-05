import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDetailUser } from '../hooks/useDetailUer';
import { updateUserInfo } from '../redux/slices/userSlice';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { path } from '../utils/constant';

const AuthRecruitmentLayout = ({ children = <></> }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.info);
    const accessToken = useSelector(state => state?.user?.access_token) ?? '';

    const { res } = useDetailUser(user?.id || undefined);

    useEffect(() => {
        if (user?.id && accessToken && res) {
            dispatch(updateUserInfo({ info: res?.data, access_token: accessToken }));
            message.success('Đăng nhập thành công')
            navigate(path.RECRUITMENT);
            return;
        }
    }, [user?.id, accessToken, res]);

    return (
        <>
            {children}
        </>
    );
};

export default AuthRecruitmentLayout;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children = <></> }) => {
    const user = useSelector(state => state?.user?.info);

    if (user?.id)
        return <Navigate to={'/'} />
    return (
        <>
            {children}
        </>
    );
};

export default AuthLayout;
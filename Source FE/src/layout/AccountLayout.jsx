import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { path } from '../utils/constant';
import { FloatButton } from "antd";
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const AccountLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === path.ACCOUNT) {
            navigate(path.HOME);
        }
    }, [location.pathname]);

    if (location.pathname === path.ACCOUNT)
        return null;
    return (
        <div className='dark:bg-slate-900'>
            <Header />
            <Outlet />
            <Footer />
            <FloatButton.BackTop tooltip={<div>Scrolling to Top</div>} />
        </div>
    );
};

export default AccountLayout;
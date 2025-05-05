import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FloatButton } from "antd";
import { path } from '../utils/constant';

const JobLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === path.JOB) {
            navigate(path.HOME);
        }
    }, [location.pathname]);

    if (location.pathname === path.JOB)
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

export default JobLayout;
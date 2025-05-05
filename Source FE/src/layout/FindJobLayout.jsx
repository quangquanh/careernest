import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FloatButton } from "antd";
import { path } from '../utils/constant';
import FindJob from '../modules/homepage_section/FindJob';

const FindJobLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === path.FIND__JOB) {
            navigate(path.HOME);
        }
    }, [location.pathname]);

    if (location.pathname === path.FIND__JOB)
        return null;
    return (
        <div className='dark:bg-slate-900'>
            <Header />
            <FindJob />
            <Outlet />
            <Footer />
            <FloatButton.BackTop tooltip={<div>Scrolling to Top</div>} />
        </div>
    );
};

export default FindJobLayout;
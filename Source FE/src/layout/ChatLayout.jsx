import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FloatButton } from "antd";
import { path } from '../utils/constant';

const ChatLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === path.CHAT) {
            navigate(path.HOME);
        }
    }, [location.pathname]);

    if (location.pathname === path.CHAT)
        return null;
    return (
        <div className='dark:bg-gray-800'>
            <Header />
            <div className='h-screen'>
                <Outlet />
            </div>
        </div>
    );
};

export default ChatLayout;
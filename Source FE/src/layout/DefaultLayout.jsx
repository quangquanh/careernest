import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { FloatButton } from "antd";
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <FloatButton.BackTop tooltip={<div>Scrolling to Top</div>} />
        </>
    );
};

export default DefaultLayout;
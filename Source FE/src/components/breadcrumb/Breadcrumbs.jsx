import React from 'react';
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ data = [] }) => {
    const navigate = useNavigate();

    return (
        <Breadcrumb aria-label="Default breadcrumb example" className='cursor-pointer mb-6'>
            {data?.length > 0 && data.map(item => (
                <Breadcrumb.Item
                    key={item?.path}
                    onClick={() => navigate(item?.path)}
                    icon={item?.path === '/' ? HiHome : undefined}>
                    {item?.text}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
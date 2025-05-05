import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    ApiOutlined,
    UserOutlined,
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AliwangwangOutlined,
    BugOutlined,
    ScheduleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ALL_PERMISSIONS, path } from '../utils/constant';

const { Content, Sider } = Layout;

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeMenu, setActiveMenu] = useState('');
    const user = useSelector(state => state?.user?.info);
    const permissions = useSelector(state => state?.user?.info?.role?.permissions);
    const [menuItems, setMenuItems] = useState([]);

    // Xử lý resize màn hình để cập nhật isMobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
                setCollapsed(true); // Tự động thu nhỏ sidebar
            } else {
                setIsMobile(false);
                setCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Gọi ngay khi component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setActiveMenu(location?.pathname);
    }, [location]);

    useEffect(() => {
        if (location.pathname === path.SYSTEM) {
            navigate(path.HOME);
        }
    }, [location.pathname]);

    useEffect(() => {
        const ACL_ENABLE = import.meta.env.VITE_ACL_ENABLE;
        if (permissions?.length || ACL_ENABLE === 'false') {
            const full = [
                ...(user?.role?.id !== 2
                    ? [{ label: <Link to='/system/dashboard'>Dashboard</Link>, key: '/system/dashboard', icon: <AppstoreOutlined /> }]
                    : []
                ),
                ...(permissions?.some(item => item.apiPath === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.apiPath) || ACL_ENABLE === 'false'
                    ? [{ label: <Link to='/system/company'>Company</Link>, key: '/system/company', icon: <BankOutlined /> }]
                    : []
                ),
                ...(permissions?.some(item => item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath) || ACL_ENABLE === 'false'
                    ? [{ label: <Link to='/system/user'>User</Link>, key: '/system/user', icon: <UserOutlined /> }]
                    : []
                ),
                ...(permissions?.some(item => item.apiPath === ALL_PERMISSIONS.JOBS.GET_PAGINATE.apiPath) || ACL_ENABLE === 'false'
                    ? [{ label: <Link to='/system/job'>Job</Link>, key: '/system/job', icon: <ScheduleOutlined /> }]
                    : []
                ),
                ...(permissions?.some(item => item.apiPath === ALL_PERMISSIONS.JOBS.GET_PAGINATE.apiPath) || ACL_ENABLE === 'false'
                    ? (user?.role?.id !== 2
                        ? [{ label: <Link to='/system/skill'>Skill</Link>, key: '/system/skill', icon: <ScheduleOutlined /> }]
                        : [])
                    : []
                ),
                ...(permissions?.some(item => item.apiPath === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.apiPath) || ACL_ENABLE === 'false'
                    ? [{ label: <Link to='/system/resume'>Resume</Link>, key: '/system/resume', icon: <AliwangwangOutlined /> }]
                    : []
                ),
                ...(permissions?.some(item => item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath) || ACL_ENABLE === 'false'
                    ? [{ label: <Link to='/system/permission'>Permission</Link>, key: '/system/permission', icon: <ApiOutlined /> }]
                    : []
                ),
                ...(permissions?.some(item => item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath) || ACL_ENABLE === 'false'
                    ? [{ label: <Link to='/system/role'>Role</Link>, key: '/system/role', icon: <ExceptionOutlined /> }]
                    : []
                ),
            ];
            setMenuItems(full);
        }
    }, [permissions]);

    const handleLogout = async () => {

    };

    const itemsDropdown = [
        { label: <Link to={'/'}>Trang chủ</Link>, key: 'home' },
        { label: <label style={{ cursor: 'pointer' }} onClick={handleLogout}>Đăng xuất</label>, key: 'logout' },
    ];

    if (location.pathname === path.SYSTEM)
        return null;
    return (
        <>
            <Layout style={{ minHeight: '100vh' }} className="layout-admin">
                <Sider theme='light' collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        <BugOutlined /> ADMIN
                    </div>
                    <Menu selectedKeys={[activeMenu]} mode="inline" items={menuItems} onClick={(e) => setActiveMenu(e.key)} />
                </Sider>

                <Layout>
                    <div className='admin-header' style={{ display: "flex", justifyContent: "space-between", marginRight: 20 }}>
                        {!isMobile ? (
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        )
                            : <div className='w-16 h-16' />
                        }

                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: "pointer" }}>
                                Welcome <span className='font-medium'>{user?.firstName}</span>
                                <Avatar>{user?.firstName?.substring(0, 2)?.toUpperCase()}</Avatar>
                            </Space>
                        </Dropdown>
                    </div>

                    <Content className='p-4 max-h-[600px] overflow-y-auto'>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AdminLayout;

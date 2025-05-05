import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Button, Result } from 'antd';
import { path } from '../utils/constant';
import { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state?.user?.info);
    const [isDelay, setIsDelay] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDelay(false);
        }, 70);

        return () => clearTimeout(timer); // Cleanup tránh memory leak
    }, []);

    if (isDelay) return <Loading />;

    if (location.pathname === path.ACCOUNT || location.pathname === path.CV || location.pathname === path.JOB)
        return children;

    if (_.isEmpty(user) && !user?.id) {
        return (
            <Result
                status="403"
                title="Không thể xác thực người dùng"
                subTitle={'Bạn cần đăng nhập trước khi vào đường link !'}
                extra={<Button type="primary" onClick={() => navigate('/')}>Quay về trang chủ</Button>}
            />
        )
    }
    else {
        if (location.pathname.startsWith('/system')) {
            if (+user?.role?.id === 1 || +user?.role?.id === 2)// is ADMIN
                return children;
            else
                return (
                    <Result
                        status="403"
                        title="Không thể truy cập tài nguyên"
                        subTitle={'Bạn không được cấp quyền truy cập tài nguyên này !'}
                        extra={<Button type="primary" onClick={() => navigate('/')}>Quay về trang chủ</Button>}
                    />
                )
        }
        else
            return <>{children}</>;
    }
}

export default PrivateRoute;
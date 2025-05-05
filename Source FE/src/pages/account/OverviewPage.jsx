import React, { useEffect, useRef } from 'react';
import { path } from '../../utils/constant';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import ShortInfo from '../../modules/account/overview/ShortInfo';
import AttachedCV from '../../modules/account/overview/AttachedCV';
import OnlineCV from '../../modules/account/overview/OnlineCV';
import MyJob from '../../modules/account/overview/MyJob';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Tổng quan hồ sơ" : "Overview profile", path: "#" }
]
const OverviewPage = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Tổng quan hồ sơ';
    }, []);

    return (
        <div ref={ref} className='ct-container pt-20 flex flex-col'>
            <Breadcrumbs data={data} />

            {/* Thông tin cá nhân */}
            <ShortInfo />

            {/* Hồ sơ đính kèm */}
            <AttachedCV />

            {/* HỒ sơ online */}
            <OnlineCV />

            {/* Việc làm đã ứng tuyển / đã lưu */}
            <MyJob />
        </div>
    );
};

export default OverviewPage;
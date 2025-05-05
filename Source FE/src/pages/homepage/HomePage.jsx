import React, { useEffect, useRef } from 'react';
import Parallax from '../../modules/homepage_section/Parallax';
import FindJob from '../../modules/homepage_section/FindJob';
import SliderBanner from '../../modules/homepage_section/SliderBanner';
import CVSection from '../../modules/homepage_section/CVSection';
import Recruitment from '../../modules/homepage_section/Recruitment';
import TopEmployer from '../../modules/homepage_section/TopEmployer';
import OutstandingPost from '../../modules/homepage_section/OutstandingPost';

const Homepage = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Trang chủ';
    }, []);

    return (
        <div ref={ref} className='w-full dark:bg-slate-900'>
            {/* Section tìm việc */}
            <FindJob />

            {/* Section slider banner*/}
            <SliderBanner />

            {/* Section tạo & Upload CV */}
            <CVSection />

            {/* Section tin tuyển dụng */}
            <Recruitment />

            {/* Section Top nhà tuyển dụng hàng đầu */}
            <TopEmployer />

            {/* Section bài viết nổi bật */}
            <OutstandingPost />

            {/* Parallax */}
            <Parallax />

        </div >
    );
};

export default Homepage;
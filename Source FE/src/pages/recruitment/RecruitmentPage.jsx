import React, { useEffect, useRef } from 'react';
import bannerImg from '../../assets/recruitmentpage/banner.jpg'
import { Link, Navigate } from 'react-router-dom';
import CountUp from 'react-countup';
import aboutLogo1 from '../../assets/recruitmentpage/about_1.svg'
import aboutLogo2 from '../../assets/recruitmentpage/about_2.svg'
import aboutLogo3 from '../../assets/recruitmentpage/about_3.svg'
import serviceLogo1 from '../../assets/recruitmentpage/service_1.svg'
import serviceLogo2 from '../../assets/recruitmentpage/service_2.svg'
import serviceLogo3 from '../../assets/recruitmentpage/service_3.jpg'
import serviceLogo4 from '../../assets/recruitmentpage/service_4.svg'
import serviceLogo5 from '../../assets/recruitmentpage/service_5.svg'
import serviceLogo6 from '../../assets/recruitmentpage/service_6.jpg'
import TopEmployer from '../../modules/homepage_section/TopEmployer';
import { useSelector } from 'react-redux';

const RecruitmentPage = () => {
    const ref = useRef(null);
    const user = useSelector(state => state?.user?.info);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Nhà tuyển dụng'
    }, []);

    if (user?.role?.id === 3)
        return <Navigate to={'/'} />
    return (
        <div className='w-full'>
            <div ref={ref} className={`w-full h-[380px] md:h-[500px] mt-12 bg-slider-bg bg-cover bg-no-repeat bg-bottom mb-6 md:mb-16`}>
                <div className='w-full h-full px-6 md:px-10 lg:px-[150px] gap-6 flex items-center bg-gray-900 bg-opacity-60'>
                    <div className='basis-1/2 text-white text-left'>
                        <div className='font-semibold text-lg sm:text-xl md:text-3xl mb-6'>Tuyển dụng Nhân tài IT tại Việt Nam cùng CareerNest.</div>
                        <div className='font-medium text-justify text-xs sm:text-sm md:text-lg lg:text-base mb-8'>
                            Với hiểu biết sâu sắc về lĩnh vực IT và các kỹ năng chuyên môn, chúng tôi có thể giúp bạn tiếp cận và tuyển dụng những ứng viên IT tốt nhất.
                        </div>
                        <div className='text-xs sm:text-sm'>
                            Đã có tài khoản doanh nghiệp?  <Link to={'/recruitment/login'} className='underline'> Đăng nhập ngay.</Link>
                        </div>
                    </div>
                    <div className='basis-1/2'>
                        <img src={bannerImg} alt=""
                            className='w-full min-h-[200px] object-contain rounded-md'
                        />
                    </div>
                </div>
            </div>

            {/* Section giới thiệu */}
            <div className='ct-container text-center flex flex-col gap-y-8 '>
                <div className='font-semibold text-2xl sm:text-4xl dark:text-white'>
                    Điều gì tạo nên sự khác biệt ở CareerNest ?
                </div>
                <div className='tracking-wide text-sm sm:text-lg lg:text-base dark:text-white'>
                    CareerNest là trang tuyển dụng và cơ sở dữ liệu hàng đầu về các chuyên gia IT tại Việt Nam.
                </div>

                <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-x-8'>
                    {[
                        { logo: aboutLogo1, value: 100, label: 'Công ty và Doanh nghiệp IT' },
                        { logo: aboutLogo2, value: 1000, label: 'Hồ sơ được gửi đến nhà tuyển dụng' },
                        { logo: aboutLogo3, value: 500, label: 'Hồ sơ Ứng viên kinh nghiệm cao' }
                    ].map((item, index) => (
                        <div key={index} className='w-full flex flex-col gap-5 items-center py-6 rounded-md dark:bg-slate-800'>
                            <div>
                                <img src={item.logo} alt="" className='object-cover' />
                            </div>
                            <h1 className='text-[40px] text-[#ed1b2f] leading-10 font-bold flex'>
                                <CountUp start={0} end={item.value} duration={2} />
                                <span>+</span>
                            </h1>
                            <div className='text-[#121212] text-lg dark:text-gray-400'>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Dịch vụ */}
            <div className="ct-container flex flex-col gap-y-10 py-14 bg-gradient-to-b from-blue-700 to-blue-300">
                <div className='font-semibold uppercase text-center text-white text-xl sm:text-2xl md:text-3xl'>
                    Dịch vụ chất lượng cao dành cho Nhà tuyển dụng IT
                </div>
                <div className='hidden w-full sm:flex items-center rounded-lg bg-white gap-2 p-10'>
                    <div className='basis-1/2 text-left'>
                        <div className='font-semibold text-lg sm:text-xl md:text-3xl mb-6'>Đăng tin tuyển dụng</div>
                        <div className='text-justify text-xs sm:text-sm md:text-base mb-8'>
                            Đăng tuyển vị trí công việc IT, dễ dàng quản lý hồ sơ ứng viên với giao diện trực quan, đội ngũ hỗ trợ, và công cụ mạnh mẽ từ ITviec.
                        </div>
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6'>
                            <div className='flex gap-4 shadow-lg p-4 rounded-lg'>
                                <img src={serviceLogo1} alt=""
                                    className='w-[18%] md:w-[30%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-xs lg:text-sm'>
                                    Gia tăng cơ hội để tiếp cận ứng viên IT chất lượng từ ITviec
                                </div>
                            </div>
                            <div className='flex gap-4 shadow-lg p-4'>
                                <img src={serviceLogo2} alt=""
                                    className='w-[18%] md:w-[30%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-xs lg:text-sm'>
                                    Thu hút ứng viên phù hợp với yêu cầu về kỹ năng IT
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/2'>
                        <img src={serviceLogo3} alt=""
                            className='w-[85%] min-h-[200px] object-contain rounded-md'
                        />
                    </div>
                </div>
                <div className='w-full sm:hidden rounded-lg bg-white gap-2 p-5'>
                    <div className='flex flex-col gap-4 mb-6'>
                        <div className='font-semibold text-xl'>Đăng tin tuyển dụng</div>
                        <div className='text-justify text-sm'>
                            Đăng tuyển vị trí công việc IT, dễ dàng quản lý hồ sơ ứng viên với giao diện trực quan, đội ngũ hỗ trợ, và công cụ mạnh mẽ từ ITviec.
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-2'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-3 shadow-lg p-4 rounded-lg'>
                                <img src={serviceLogo1} alt=""
                                    className='w-[18%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-[11px]'>
                                    Gia tăng cơ hội để tiếp cận ứng viên IT chất lượng từ ITviec
                                </div>
                            </div>
                            <div className='flex gap-3 shadow-lg p-4 rounded-lg'>
                                <img src={serviceLogo2} alt=""
                                    className='w-[18%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-[11px]'>
                                    Thu hút ứng viên phù hợp với yêu cầu về kỹ năng IT
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <img src={serviceLogo3} alt=""
                                className='w-[85%] min-h-[200px] object-contain rounded-md'
                            />
                        </div>
                    </div>
                </div>

                <div className='hidden w-full sm:flex items-center rounded-lg bg-white gap-2 p-10'>
                    <div className='basis-1/2'>
                        <img src={serviceLogo6} alt=""
                            className='w-[85%] min-h-[200px] object-contain rounded-md'
                        />
                    </div>
                    <div className='basis-1/2 text-left'>
                        <div className='font-semibold text-lg sm:text-xl md:text-3xl mb-6'>Thương hiệu tuyển dụng</div>
                        <div className='text-justify text-xs sm:text-sm md:text-base mb-8'>
                            Nâng cao nhận diện thương hiệu của Nhà tuyển dụng, tiếp cận các chuyên gia IT trên ITviec qua các điểm chạm đặc biệt, và kết nối với các ứng viên IT hàng đầu tại Việt Nam                        </div>
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6'>
                            <div className='flex gap-4 shadow-lg p-4 rounded-lg'>
                                <img src={serviceLogo4} alt=""
                                    className='w-[18%] md:w-[30%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-xs lg:text-sm'>
                                    Xuất hiện với vị trí công ty IT nổi bật hàng đầu tại Việt Nam
                                </div>
                            </div>
                            <div className='flex gap-4 shadow-lg p-4'>
                                <img src={serviceLogo5} alt=""
                                    className='w-[18%] md:w-[30%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-xs lg:text-sm'>
                                    Tăng cường xây dựng thương hiệu nhà tuyển dụng đến với những nhân tài IT hàng đầu
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full sm:hidden rounded-lg bg-white gap-2 p-5'>
                    <div className='flex flex-col gap-4 mb-6'>
                        <div className='font-semibold text-xl'>Thương hiệu tuyển dụng</div>
                        <div className='text-justify text-sm'>
                            Nâng cao nhận diện thương hiệu của Nhà tuyển dụng, tiếp cận các chuyên gia IT trên ITviec qua các điểm chạm đặc biệt, và kết nối với các ứng viên IT hàng đầu tại Việt Nam                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-2'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-3 shadow-lg p-4 rounded-lg'>
                                <img src={serviceLogo4} alt=""
                                    className='w-[18%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-[11px]'>
                                    Xuất hiện với vị trí công ty IT nổi bật hàng đầu tại Việt Nam                                </div>
                            </div>
                            <div className='flex gap-3 shadow-lg p-4 rounded-lg'>
                                <img src={serviceLogo5} alt=""
                                    className='w-[18%] min-h-[50px] object-contain rounded-md'
                                />
                                <div className='flex flex-auto text-[11px]'>
                                    Tăng cường xây dựng thương hiệu nhà tuyển dụng đến với những nhân tài IT hàng đầu                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <img src={serviceLogo6} alt=""
                                className='w-[85%] min-h-[200px] object-contain rounded-md'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Top nhà tuyển dụng hàng đầu */}
            <TopEmployer />

        </div>
    );
};

export default RecruitmentPage;
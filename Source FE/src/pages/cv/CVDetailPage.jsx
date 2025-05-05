import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Tooltip } from 'flowbite-react';
import icons from '../../utils/icons';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL.js';
import { CiMail, CiPhone, CiLocationOn } from "react-icons/ci";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { format } from 'date-fns';

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Quản lý CV", path: path.CV + '/' + path.CV__MANAGE },
    { text: "Hồ sơ", path: '#' },
]

const { FaFileDownload } = icons;
const CVDetailPage = () => {
    const user = useSelector(state => state?.user?.info);

    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const dataResume = location?.state?.dataResume ?? {};

    const convertTimeStampToString = (timestamp, isWorkExpe = false) => {
        if (!timestamp) return '';
        try {
            const date = new Date(timestamp);
            return !isWorkExpe ? format(date, 'dd/MM/yyyy') : format(date, 'MM/yyyy');
        } catch (error) {
            console.error('Error converting timestamp:', error);
            return '';
        }
    };

    const handleDownload = useCallback(async () => {
        setLoading(true);
        try {
            const element = document.getElementById('my-form-resume');
            if (!element) return console.error('Element not found!');

            await Promise.allSettled([...element.querySelectorAll('img')].map((img) =>
                img.complete ? null : new Promise((res) => (img.onload = img.onerror = res))
            ));

            const canvas = await html2canvas(element, {
                scale: 2, // Giảm scale từ 3 xuống 2 (vẫn nét căng HD)
                useCORS: true,
                willReadFrequently: true,
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.8); // Chuyển PNG => JPEG, giảm chất lượng về 80%
            const pdf = new jsPDF('p', 'mm', 'a4');
            const [pageWidth, pageHeight] = [pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight()];
            const [imgWidth, imgHeight] = [canvas.width * 0.264583, canvas.height * 0.264583];
            const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight) * 1.0;

            pdf.addImage(imgData, 'JPEG', (pageWidth - imgWidth * scale) / 2, 0, imgWidth * scale, imgHeight * scale);
            pdf.save('my-cv.pdf');
        } catch (error) {
            console.error('Download PDF error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    if (_.isEmpty(dataResume) || _.isEmpty(user)) return null;
    return (
        <div className='w-full pt-20 mb-20 sm:mb-24 px-10 md:px-16 lg:px-[200px]'>
            <Breadcrumbs data={data} />
            <div className='w-full  mb-6 flex justify-end'>
                <Tooltip content="Tải CV" style="dark" placement='bottom'>
                    <Button size='sm' onClick={handleDownload} isProcessing={loading} disabled={loading}>
                        {loading ? 'Đang tải xuống...' : <FaFileDownload size={18} />}
                    </Button>
                </Tooltip>

            </div>

            <div id='my-form-resume' >
                <div className="border-1 shadow-md shadow-gray-400 rounded-lg bg-white">
                    {/* Top content */}
                    <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
                        <div className="w-32 h-32 md:h-40 md:w-40 border border-gray-300 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
                            <img src={getFirebaseImageUrl(user?.avatarUrl, "users")} />
                        </div>
                        <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                            <p className="font-poppins font-bold uppercase text-heading md:text-4xl text-2xl mb-2">
                                {dataResume?.fullName}
                            </p>
                            <p className="text-heading text-lg lg:text-xl">{dataResume?.title}</p>
                        </div>
                    </div>
                    {/* main content */}
                    <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:mt-10">
                            <div className="flex flex-col sm:w-1/3">
                                {/* My contact */}
                                <div className="py-3 sm:order-none order-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Contact information</h2>
                                    <div className="border-2 w-20 border-top-color my-3" />
                                    <div className='flex flex-col gap-3'>
                                        <div className="flex items-center">
                                            <CiMail size={18} />
                                            <div className="ml-2">{dataResume?.email}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <CiPhone size={18} />
                                            <div className="ml-2">{dataResume?.phone}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <LiaBirthdayCakeSolid size={18} />
                                            <div className="ml-2">{convertTimeStampToString(dataResume?.dateOfBirth)}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <CiLocationOn size={18} />
                                            <div className="ml-2">{dataResume?.address}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Skills */}
                                <div className="py-3 sm:order-none order-2">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Skills</h2>
                                    <div className="border-2 w-20 border-top-color my-3" />
                                    <div className='grid grid-cols-3 sm:grid-cols-2 gap-3'>
                                        {dataResume?.skills?.length > 0 && dataResume.skills.map(item => (
                                            <div key={item?.id} className="w-full text-center px-4 py-1 bg-slate-200 text-gray-800 rounded-full text-xs md:text-sm font-medium">
                                                {item?.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Education background */}
                                <div className="py-3 sm:order-none order-1">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Education</h2>
                                    <div className="border-2 w-20 border-top-color my-3" />
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex flex-col">
                                            <div className='text-justify' dangerouslySetInnerHTML={{ __html: dataResume?.educations }}></div>
                                        </div>

                                    </div>
                                </div>
                                {/* Languages */}
                                <div className="py-3 sm:order-none order-1">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Languages</h2>
                                    <div className="border-2 w-20 border-top-color my-3" />
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex flex-col">
                                            <div className='text-justify' dangerouslySetInnerHTML={{ __html: dataResume?.languages }}></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col pl-10 sm:w-2/3 order-first sm:order-none sm:-mt-10">
                                {/* About me */}
                                <div className="py-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">About Me</h2>
                                    <div className="border-2 w-20 border-top-color my-3" />
                                    <div className='text-justify' dangerouslySetInnerHTML={{ __html: dataResume?.summary }}></div>
                                </div>
                                {/* Professional Experience */}
                                <div className="py-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Work Experience</h2>
                                    <div className="border-2 w-20 border-top-color my-3" />
                                    {dataResume?.workExperiences?.length > 0 && dataResume.workExperiences.map(item => (
                                        <div key={`work-${item?.id}`} className="flex flex-col mb-3">
                                            <p className="text-lg font-bold text-slate-800">
                                                {item?.companyName}
                                            </p>
                                            <p className="font-medium text-sm text-gray-700">{convertTimeStampToString(item?.startDate, true)} - {convertTimeStampToString(item?.endDate, true)}</p>
                                            <p className="font-medium text-sm text-gray-700">{item?.location}</p>
                                            <p className="font-semibold text-sm text-gray-700 mt-5 mb-1">Key Responsibilities</p>
                                            <div
                                                className='text-justify'
                                                dangerouslySetInnerHTML={{ __html: item?.description }} />
                                        </div>
                                    ))}
                                </div>
                                {/* Certifications */}
                                <div className="py-3">
                                    <h2 className="text-lg font-poppins font-bold text-top-color">Certifications</h2>
                                    <div className="border-2 w-20 border-top-color my-3" />
                                    <div className="flex flex-col">
                                        <div className='text-justify' dangerouslySetInnerHTML={{ __html: dataResume?.certifications }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CVDetailPage;
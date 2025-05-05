import { Avatar, Badge, FileInput, Tooltip } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { path } from '../../../utils/constant';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getMainResumeUpload } from '../../../services/resumeService';
import { toast } from 'react-toastify';
import { postUploadMainCV } from '../../../services/userService';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

const AttachedCV = () => {
    const user = useSelector(state => state?.user?.info);
    const { t } = useTranslation();

    const [fileName, setFileName] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (user?.id) {
            setFileName(user?.mainResume ?? '');  // Cập nhật fileName nếu có mainResume
        }
    }, [user?.id, user?.mainResume]);

    const handleDownloadFile = async () => {
        try {
            let res = await getMainResumeUpload(fileName, 'mainResume');
            if (res) {
                const url = window.URL.createObjectURL(res);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message ?? 'Có lỗi khi download file!');
        }
    }

    const mutation = useMutation({
        mutationFn: postUploadMainCV,
        onSuccess: async (res) => {
            if (+res?.statusCode === 200) {
                message.success("Upload main CV thành công.");
                mutation.reset();
                window.location.reload();
            } else
                message.error('Có lỗi xảy ra!');
        },
        onError: (error) => {
            console.error('Error:', error);
            message.error(error.message || 'Something wrong in Server');
        },
    });

    const handleUploadMainCV = async (e) => {
        if (e.target?.files?.[0])
            await mutation.mutateAsync({ folder: "mainResume", file: e.target.files[0] })
    }

    return (
        <div className='w-full flex flex-col gap-y-4 shadow-md dark:shadow-lg p-3 sm:p-4 rounded-lg mb-6 dark:bg-slate-800'>
            <Badge className='w-fit text-base sm:text-lg' color="info" size='sm'>{t('overview_page.attached_cv.title')}</Badge>
            <div className='w-full flex gap-x-4 rounded-lg bg-[#f7f7f7] dark:bg-slate-800 p-2 sm:p-6 border border-gray-200 dark:border-gray-600'>
                <Avatar size='lg' className='sm:order-1 order-2'
                    img={'https://itviec.com/assets/profile/uploaded-resume-f70bd4d24afa0fa12412353a2fe8c4deaa8bdc1a9ffef1cdb2b8638adb24a5ac.svg'}
                />
                <div className='flex flex-col gap-y-3 sm:order-2 order-1'>
                    {fileName ?
                        <Tooltip content="Download cv" style="dark">
                            <Link
                                className='text-[#414042] dark:text-white underline text-[11px] xs:text-xs sm:text-lg font-medium'
                                to={'#'}
                                onClick={handleDownloadFile}
                            >
                                {fileName}
                            </Link>
                        </Tooltip>

                        :
                        <Badge className='w-fit uppercase text-base sm:text-lg' color="gray" size='sm'> {t('overview_page.attached_cv.empty_cv')}</Badge>
                    }


                    {location.pathname.includes('overview') ?
                        <Link to={`${path.CV}/${path.CV__MANAGE}`} className='flex text-xs sm:text-sm items-center text-blue-600'>
                            {t('overview_page.attached_cv.manage_cv')} <MdKeyboardDoubleArrowRight size={18} />
                        </Link>
                        :
                        <>
                            <label className="w-fit p-2 cursor-pointer border border-red-500 rounded-lg bg-white text-sm xs:text-base text-red-500 font-medium flex items-center gap-2">
                                <FaFileUpload /> {t('overview_page.attached_cv.upload_cv')}
                                <FileInput
                                    accept=".docx,.doc,.pdf"
                                    onChange={handleUploadMainCV}
                                    className="hidden" // Ẩn input
                                />
                            </label>
                            <div className='text-xs xs:text-sm mt-3 text-gray-400'>{t('overview_page.attached_cv.file_condition')}</div>
                        </>

                    }
                </div>
            </div>
        </div>
    );
};

export default AttachedCV;
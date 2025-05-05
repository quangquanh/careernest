import { Button, FileInput, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { postApplyJob } from '../../services/resumeService';
import { askGeminiWithPDF } from '../../modules/chatbot/gemini';
import { toast } from 'react-toastify';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { useTranslation } from 'react-i18next';
import { fetchAllAppliedJobs } from '../../redux/slices/userSlice';

const ModalApplyCV = ({ openModal = false, setOpenModal = () => { }, jobData = null }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.info);

    const [loading, setLoading] = useState(false);
    const [cv, setCv] = useState(null);

    const parseText = (input) => {
        if (!input) return;
        const regex = /advantage:\s*(.*?);shortcoming:\s*(.*?);rating:\s*(\d+)/;
        const match = input.replace(/<p>/g, '').replace(/<\/p>/g, '').match(regex);

        if (match) {
            return {
                advantage: match[1].trim(),
                shortcoming: match[2].trim(),
                rating: parseInt(match[3], 10)
            };
        }
        return {};
    }

    const mutation = useMutation({
        mutationFn: postApplyJob,
        onSuccess: async (res) => {
            if (+res?.statusCode === 200) {
                message.success("Ứng tuyển thành công.");
                dispatch(fetchAllAppliedJobs({ id: +user?.id }));
                mutation.reset();
                setOpenModal(false);
            } else
                message.error('Có lỗi xảy ra!');
        },
        onError: (error) => {
            console.error('Error:', error);
            message.error(error.message || 'Something wrong in Server');
        },
    });

    const handleApply = async () => {
        if (cv?.type === "application/pdf") {
            setLoading(true);
            try {
                let res = await askGeminiWithPDF(cv, `Bạn hãy đọc file cv này, nếu trong CV có ảnh, hãy bỏ qua chỉ phân tích text. Sau đó tôi sẽ truyền thêm vào mô tả công việc và yêu cầu công việc.
                Hãy dựa vào thông tin đọc được từ CV, cùng với thông tin mô tả công việc và yêu cầu công việc, phân tích bằng tiếng việt và phải ngắn gọn về điểm mạnh, điểm yếu, và đánh số điểm về mức độ phù hợp của CV này (từ 10-100).Trả về kết quả giúp tôi dạng: advantage:...;shortcoming:...;rating:... (dùng dấu chấm phẩy để ngăn cách nhé).
                Mô tả công việc:${jobData?.description}.
                Yêu cầu công việc:${jobData?.requirements}`);

                await mutation.mutateAsync({
                    folder: "resume",
                    file: cv,
                    email: user?.email,
                    userId: user?.id,
                    jobId: +jobData?.id,
                    advantage: parseText(res)?.advantage,
                    shortcoming: parseText(res)?.shortcoming,
                    rating: +parseText(res)?.rating || 50
                })
            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra trong quá trình phân tích!");
            }
            finally {
                setLoading(false);
            }
        } else {
            alert("Vui lòng chọn file PDF hợp lệ!");
        }
    };

    if (!openModal) return null;
    return (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-0 overflow-y-auto'>
            <div className='bg-white dark:bg-slate-800 rounded-lg w-[600px] shadow-lg p-6 max-h-[95vh] overflow-y-auto scroll-smooth'>
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full" role="status">
                        </div>
                    </div>
                )}
                <div className='flex justify-between items-center border-b pb-2'>
                    <h2 className='text-lg sm:text-xl font-medium uppercase dark:text-white'>{t('modal_apply_job.title')} {jobData?.name}</h2>
                    <button onClick={() => setOpenModal(false)} className='text-gray-500 text-xl'>
                        &times;
                    </button>
                </div>

                <div className='space-y-4 mt-4'>
                    <div className='flex items-center gap-x-6'>
                        <label className="w-fit p-2 cursor-pointer border border-red-500 rounded-lg bg-white text-sm xs:text-base text-red-500 font-medium flex items-center gap-2">
                            <FaFileUpload /> {t('modal_apply_job.upload')}
                            <FileInput
                                accept=".docx,.doc,.pdf"
                                onChange={(e) => setCv(e.target.files?.[0])}
                                className="hidden" // Ẩn input
                            />
                        </label>
                        {cv && (
                            <span className='text-xs xs:text-sm text-red-500'>
                                📄 {cv?.name ?? ''}
                            </span>
                        )}
                    </div>
                    <div className='text-xs xs:text-sm mt-3 text-gray-500'>{t('modal_apply_job.cv_condition')} *</div>

                    <label className='block font-semibold uppercase dark:text-white'>{t('modal_apply_job.information')}</label>
                    <form className="flex max-w-md flex-col gap-3">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="fullName" value={t('modal_apply_job.full_name')} />
                            </div>
                            <TextInput id="fullName" type="text" value={user?.lastName + ' ' + user?.firstName} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phoneNumber" value={t('modal_apply_job.phone')} />
                            </div>
                            <TextInput id="phoneNumber" type="text" value={user?.phoneNumber} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="city" value={t('modal_apply_job.location')} />
                            </div>
                            <Select id="city" defaultValue={'hcm'} required>
                                <option value={'hcm'}>TP HCM</option>
                                <option value={'us'}>Hà Nội</option>
                                <option value={'dn'}>Đà nẵng</option>
                                <option value={'ct'}>Cần Thơ</option>
                            </Select>
                        </div>
                    </form>
                    <label className='block font-semibold dark:text-white'>{t('modal_apply_job.cover_letter')}:</label>
                    <textarea
                        placeholder={localStorage.getItem('i18nextLng') === 'vi' ? 'Nhờ chatbot AI tạo 1 cover letter phù hợp ?' : "Using chatbox assitance ..."}
                        className='border dark:border-gray-500 rounded p-2 w-full outline-none dark:bg-slate-700 dark:text-gray-400'
                        rows={13}
                    />
                </div>

                <div className='flex justify-end gap-3 mt-6'>
                    <Button color="gray" size='sm' onClick={() => setOpenModal(false)}>{t('modal_apply_job.cancel')}</Button>
                    <Button color="failure" pill onClick={handleApply} size='sm'
                        disabled={!cv}
                    >
                        {t('modal_apply_job.submit')}
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default withErrorBoundary(ModalApplyCV);

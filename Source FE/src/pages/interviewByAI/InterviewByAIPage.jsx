import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Input, Button, Spin } from 'antd'; // Import từ antd
import { toast } from 'react-toastify';
import { askGemini } from '../../modules/chatbot/gemini';
import InterviewForm from '../../modules/chatbot/InterviewForm';
import { useTranslation } from 'react-i18next';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Phỏng vấn bởi AI" : "Interview by AI", path: "#" }
]

const InterviewByAIPage = () => {
    const [position, setPosition] = useState('');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const ref = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Phỏng vấn giả lập bởi AI';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await askGemini(`Tạo 1 cuộc phỏng vấn thử cho vị trí ${position} giúp tôi`);
            const div = document.createElement('div');
            div.innerHTML = res;
            const lis = div.querySelectorAll('ol li');
            const arr = Array.from(lis).map(li => li.textContent.trim());
            setQuestions(arr);
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
        finally {
            setLoading(false);
        }

    };


    return (
        <div ref={ref} className='ct-container flex flex-col pt-20'>
            <Breadcrumbs data={data} />

            <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-slate-800">
                <h2 className="text-xl md:text-2xl font-semibold mb-10 uppercase text-center dark:text-white">
                    {t('interview_by_ai_page.title')}
                </h2>
                <div className="hidden sm:flex flex-row gap-6">
                    <div className="flex-1">
                        <p className="text-[14px] dark:text-gray-400 text-gray-700 text-justify indent-8">
                            {t('interview_by_ai_page.paragraph_1')}
                        </p>
                        <p className="text-[14px] dark:text-gray-400 text-gray-700 mt-4 text-justify indent-8">
                            {t('interview_by_ai_page.paragraph_2')}
                        </p>
                        <p className="text-[14px] dark:text-gray-400 text-gray-700 mt-4 text-justify indent-8">
                            {t('interview_by_ai_page.paragraph_3')}
                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://cdn.impossibleimages.ai/wp-content/uploads/2023/04/25130031/AI-Background-Image-Generator-How-It-Works-and-Why-You-Need-It.jpg" alt="AI Interview" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                <div className="sm:hidden flex flex-col gap-6">
                    <div className="flex-1">
                        <p className="text-[14px] dark:text-gray-400 text-gray-700 text-justify indent-8">
                            {t('interview_by_ai_page.paragraph_1')}                        </p>
                        <p className="text-[14px] dark:text-gray-400 text-gray-700 mt-4 text-justify indent-8">
                            {t('interview_by_ai_page.paragraph_2')}                        </p>
                        <p className="text-[14px] dark:text-gray-400 text-gray-700 mt-4 text-justify indent-8">
                            {t('interview_by_ai_page.paragraph_3')}                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://cdn.impossibleimages.ai/wp-content/uploads/2023/04/25130031/AI-Background-Image-Generator-How-It-Works-and-Why-You-Need-It.jpg" alt="AI Interview" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {questions?.length <= 0 &&
                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center justify-center">
                        <div className="mb-4 w-full max-w-xs">
                            <label htmlFor="position" className="block text-lg font-medium text-blue-500 dark:text-white">{t('interview_by_ai_page.subtitle')}</label>
                            <Input
                                id="position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Nhập vị trí bạn muốn phỏng vấn"
                                required
                                className="mt-2 w-full" // Full width with Tailwind
                            />
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="mt-4 w-fit"
                            loading={loading} // Show loading indicator when submitting
                        >
                            {t('interview_by_ai_page.submit')}
                        </Button>
                    </form>
                }

                {loading && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <Spin size="large" /> {/* Show spinning indicator */}
                    </div>
                )}

                {questions?.length > 0 &&
                    <div className='mt-16'>
                        <h1 className="text-xl text-center font-semibold mb-8 tracking-wide dark:text-white">
                            {localStorage.getItem('i18nextLng') === 'vi' ? "Câu hỏi phỏng vấn " : "Interview questions "} <span className='text-red-500 uppercase'>{position}</span></h1>
                        <InterviewForm questions={questions} />
                    </div>
                }
            </div>
        </div>
    );
};

export default InterviewByAIPage;

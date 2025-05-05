import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Spinner } from "flowbite-react";
import { toast } from 'react-toastify';
import { askGeminiWithPDF } from '../../modules/chatbot/gemini';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Đánh giá CV qua AI" : "CV Evaluation", path: "#" }
]

const CVReviewByAI = () => {

    const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setLoading(true);
            setResult(""); // reset kết quả cũ nếu có
            try {
                let res = await askGeminiWithPDF(file, "review cv giúp tôi");
                setResult(res ?? "");
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

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Đánh giá CV bởi AI';
    }, []);

    return (
        <div ref={ref} className='ct-container py-4 pt-20 bg-[#f7f7f7] dark:bg-slate-900'>
            <Breadcrumbs data={data} />
            <div className={`bg-[#fff] ${result ? 'dark:bg-gray-900' : 'dark:bg-slate-800'} px-3 xs:px-6 py-8 rounded-lg flex items-center justify-center min-h-[350px]`}>
                <div className="text-center max-w-2xl">
                    <h1 className="text-2xl font-bold mb-8 dark:text-white">
                        {localStorage.getItem('i18nextLng') === 'vi' ? "Đánh giá CV bởi AI CareerNest" : "CV Evaluation by AI"}
                    </h1>
                    {!loading && !result && (
                        <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                            {localStorage.getItem('i18nextLng') === 'vi' ? "Chọn file CV (PDF)" : "Select pdf file"}
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Spinner size='xl' color='info' />
                            <p className="text-lg font-medium animate-pulse dark:text-white">
                                {localStorage.getItem('i18nextLng') === 'vi' ? "Đang phân tích CV..." : "Reviewing CV..."}
                            </p>
                        </div>
                    )}

                    {!loading && result && (
                        <div
                            className="mt-8 dark:p-4 dark:rounded-lg text-base text-gray-800 text-justify dark:bg-white"
                            dangerouslySetInnerHTML={{ __html: result }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CVReviewByAI;

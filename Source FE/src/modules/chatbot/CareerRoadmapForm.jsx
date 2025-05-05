import React, { useRef, useState } from 'react';
import { FiMic } from 'react-icons/fi';
import { askGemini } from './gemini';
import { Spinner } from 'flowbite-react';
import { useTranslation } from 'react-i18next';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function CareerRoadmapForm() {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [answerFromAI, setAnswerFromAI] = useState("");

    const educationRef = useRef();
    const skillsRef = useRef();
    const experienceRef = useRef();
    const interestRef = useRef();
    const goalRef = useRef();

    // Trạng thái cho từng mic (tên theo ref)
    const [recordingField, setRecordingField] = useState(null);

    const handleVoiceInput = (refName, ref) => {
        if (!SpeechRecognition) {
            alert("Trình duyệt không hỗ trợ Speech Recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;

        setRecordingField(refName); // Bắt đầu ghi âm

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (ref.current) {
                ref.current.value += (ref.current.value ? ' ' : '') + transcript;
            }
        };

        recognition.onend = () => {
            setRecordingField(null); // Dừng ghi âm
        };

        recognition.start();
    };

    const buildTextFromData = (data) => {
        return `
    Trình độ học vấn: ${data.education}
    Kinh nghiệm làm việc: ${data.experience}
    Mục tiêu nghề nghiệp: ${data.goal}
    Sở thích và đam mê: ${data.interest}
    Kỹ năng hiện có: ${data.skills}
    `.trim();
    }

    function parsePlan(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const result = [];
        const sections = doc.querySelectorAll('p strong');

        sections.forEach((section, index) => {
            const name = section.textContent.trim();
            const durationElement = section.parentElement.nextElementSibling?.querySelector('strong');
            const duration = durationElement ? durationElement.nextSibling?.textContent.trim() : '';

            // Tìm phần mô tả kế tiếp
            const ul = section.parentElement.nextElementSibling;
            let description = '';

            if (ul && ul.tagName === 'UL') {
                description = ul.innerText.trim().replace(/\s+/g, ' ');
            }

            result.push({
                name,
                duration,
                description
            });
        });

        return result;
    }

    function extractDetails(description) {
        // Bước 1: Tìm và cắt phần sau "Chi tiết:"
        const detailPart = description.split("Chi tiết:")[1] || "";

        // Bước 2: Tách theo dấu chấm và lọc bỏ phần rỗng
        const sentences = detailPart
            .split('.')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        return sentences;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            education: educationRef.current.value,
            skills: skillsRef.current.value,
            experience: experienceRef.current.value,
            interest: interestRef.current.value,
            goal: goalRef.current.value,
        };
        let inputMessage = `Tôi sẽ gửi thông tin cá nhân của người dùng mà họ muốn tư vấn lộ trình nghề nghiệp. Dựa vào những 
        thông tin được cung cấp, bạn hãy xây dựng lộ trình nghề nghiệp thật chi tiết, phù hợp với người dùng, trả về giúp 
         tôi chuỗi có định dạng như sau: tên giai đoạn, thời gian (chỉ trả về số tháng cần hoàn thành), chi tiết (đừng thêm các thẻ html!). 
         Thông tin cá nhân: ${buildTextFromData(data)}.`;
        setIsLoading(true);
        try {
            let res = await askGemini(inputMessage);
            setAnswerFromAI(res ?? "");
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
        finally {
            setIsLoading(false);
        }

    };


    const renderTextareaWithMic = (label, ref, placeholder, fieldName) => (
        <div>
            <label className="block font-medium mb-1">{label}</label>
            <div className="relative">
                <textarea
                    required
                    ref={ref}
                    rows="3"
                    className="w-full border outline-none rounded-md p-2 pr-10"
                    placeholder={placeholder}
                />
                <FiMic
                    onClick={() => handleVoiceInput(fieldName, ref)}
                    className={`absolute top-2 right-3 cursor-pointer transition ${recordingField === fieldName ? 'text-red-500 animate-pulse' : 'text-gray-500 hover:text-blue-600'
                        }`}
                    size={20}
                />
            </div>
        </div>
    );

    return (
        <>
            {!answerFromAI ?
                <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
                    <h2 className="text-xl font-bold text-center text-slate-800 uppercase">
                        {t('roadmap_by_ai_page.form.title')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">{t('roadmap_by_ai_page.form.education')}</label>
                            <select ref={educationRef} className="w-full border rounded-md p-2">
                                <option value="">-- {localStorage.getItem('i18nextLng') === 'vi' ? "Chọn trình độ" : "Select level"} --</option>
                                <option value="Cao đẳng">Cao đẳng</option>
                                <option value="Đại học">Đại học</option>
                                <option value="Thạc sĩ">Thạc sĩ</option>
                            </select>
                        </div>

                        {renderTextareaWithMic(t('roadmap_by_ai_page.form.skills'), skillsRef, 'VD: ReactJS, SQL, ...', 'skills')}
                        {renderTextareaWithMic(t('roadmap_by_ai_page.form.work_expe'), experienceRef, localStorage.getItem('i18nextLng') === 'vi' ? 'VD: 2 năm làm Frontend...' : "ex: 2 years in FrontEnd...", 'experience')}
                        {renderTextareaWithMic(t('roadmap_by_ai_page.form.hobby'), interestRef, localStorage.getItem('i18nextLng') === 'vi' ? 'VD: Phát triển web, giáo dục...' : "ex: Web development, education...", 'interest')}
                        {renderTextareaWithMic(t('roadmap_by_ai_page.form.career_objective'), goalRef, 'VD: Fullstack Developer, lương $2000...', 'goal')}

                        <div className="text-center">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                                {t('roadmap_by_ai_page.form.submit')}
                            </button>
                        </div>
                    </form>
                </div>
                :
                <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-3">
                    {
                        parsePlan(answerFromAI)?.length > 0 && parsePlan(answerFromAI).map((item, index) => (
                            <li key={index} className="flex-start group relative flex lg:flex-col">
                                <span className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]" aria-hidden="true" />
                                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 group-hover:text-white">
                                        <path d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="ml-6 lg:ml-0 lg:mt-10 flex flex-col gap-4">
                                    <h3 className="text-base font-semibold text-justify text-gray-900 dark:text-white before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                                        {item?.name}
                                    </h3>
                                    <span className='text-red-500 font-medium'>{localStorage.getItem('i18nextLng') === 'vi' ? "Thời gian" : "Time"}: {item?.duration}</span>
                                    <h4 className="mt-2 text-base text-gray-700 dark:text-gray-400 text-justify">
                                        {
                                            extractDetails(item?.description)?.length > 0 && (
                                                <ul>
                                                    {extractDetails(item?.description).map((item2, index2) => (
                                                        <li key={index2} className='text-sm mb-4 text-justify'>
                                                            {index2 + 1}. {item2}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        }

                                    </h4>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            }
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <Spinner size="xl" />
                        <span className="mt-4 text-base font-medium text-gray-700 animate-pulse">
                            Đang tạo lộ trình...
                        </span>
                    </div>
                </div>
            )}

        </>

    );
}

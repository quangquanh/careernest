import { Spin } from 'antd';
import React, { useRef, useState } from 'react';
import { FaRegQuestionCircle, FaMicrophone } from "react-icons/fa";
import { toast } from 'react-toastify';
import { askGemini } from './gemini';

const InterviewForm = ({ questions }) => {
    const answerRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [answerFromAI, setAnswerFromAI] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null); // index của câu hỏi đang voice

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        return <p>Trình duyệt của bạn không hỗ trợ chức năng nhận diện giọng nói.</p>;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'vi-VN';

    const startListening = (index) => {
        setActiveIndex(index);
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const targetRef = answerRefs.current[index];
            if (targetRef) {
                targetRef.value = transcript;
            }
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Lỗi nhận dạng giọng nói:', event.error);
            toast.error("Lỗi nhận diện giọng nói: " + event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const answers = answerRefs.current.map(ref => ref?.value || '');
            const formattedAnswers = answers.map((ans, i) => `Câu trả lời ${i + 1}: ${ans}`).join('\n');

            let res = await askGemini(formattedAnswers);
            setAnswerFromAI(res ?? "");
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!answerFromAI ? (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                    {questions.map((question, index) => (
                        <div key={index} className="relative">
                            <p className="font-normal text-slate-600 text-justify mb-2 flex dark:text-white tracking-wider">
                                <FaRegQuestionCircle size={25} className='mr-2' />
                                {question}
                            </p>

                            <textarea
                                ref={(el) => (answerRefs.current[index] = el)}
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                rows={4}
                                placeholder={`Nhập hoặc dùng giọng nói cho câu trả lời ${index + 1}`}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => startListening(index)}
                                className={`absolute top-20 right-2 text-gray-600 hover:text-blue-600`}
                                title="Nhấn để nói"
                            >
                                <FaMicrophone size={20} className={isListening && activeIndex === index ? 'animate-pulse text-red-500' : ''} />
                            </button>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="bg-red-600 float-right text-white px-6 py-2 rounded-md hover:bg-opacity-60 hover:transition-all"
                    >
                        Nộp
                    </button>
                </form>
            ) : (
                <div
                    className="mt-8 text-base text-wrap text-gray-800 dark:text-white dark:font-normal text-justify overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: answerFromAI }}
                />
            )}

            {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <Spin size="large" />
                </div>
            )}
        </>
    );
};

export default InterviewForm;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdSend } from "react-icons/io";
import { RiRobot2Line } from "react-icons/ri";
import { CiUser, CiLink } from "react-icons/ci";
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { askGemini, askGeminiWithPDF } from './gemini';
import { message } from 'antd';
import { Spinner } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const ModalChatBot = ({ setShowChatbot = () => { } }) => {
    const navigate = useNavigate();
    const [chatHistory, setChatHistory] = useState([
        {
            username: "Chatbot",
            message: "Chào bạn 👋 Tôi có thể giúp gì cho bạn hôm nay?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
    ]);
    const [input, setInput] = useState("");
    const [file, setFile] = useState(null);
    const [isListening, setIsListening] = useState(false); // chức năng voice

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        return <p>Trình duyệt của bạn không hỗ trợ chức năng nhận diện giọng nói.</p>;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'vi-VN';

    const startListening = () => {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setIsListening(false);
            setTimeout(() => handleAsk(transcript), 50); // gọi hỏi luôn sau khi có transcript
        };

        recognition.onerror = (event) => {
            console.error('Lỗi nhận dạng giọng nói:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    const handleAsk = async (inputOption) => {
        if (!input.trim() && file === null && !inputOption) {
            message.warning("Vui lòng nhập câu hỏi cho Chatbot.");
            return;
        }

        // Tạo tin nhắn của người dùng
        const userMessage = {
            username: "User",
            message: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Thêm tin nhắn người dùng vào lịch sử trò chuyện
        setChatHistory(prevHistory => [
            ...prevHistory,
            userMessage,
            { username: "Chatbot", message: "Loading...", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), } // Thêm "Loading..." vào khi đợi phản hồi
        ]);

        // Sau khi tin nhắn người dùng được thêm, làm sạch input
        setInput("");

        try {
            // Gọi API để lấy câu trả lời từ Gemini
            let answer;
            if (file) {
                answer = await askGeminiWithPDF(file, input); // Gửi cả file và input
            } else {
                if (input && !inputOption)
                    answer = await askGemini(input); // Chỉ gửi input nếu không có file
                else answer = await askGemini(inputOption);
            }
            setFile(null);

            // Tạo tin nhắn của Gemini với phản hồi
            const geminiMessage = {
                username: "Chatbot",
                message: answer,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            // Cập nhật lại lịch sử trò chuyện, thay thế "Loading..." bằng câu trả lời
            setChatHistory(prevHistory => {
                const updatedHistory = [...prevHistory];
                updatedHistory[updatedHistory.length - 1] = geminiMessage; // Thay thế tin nhắn "Loading..."
                return updatedHistory;
            });

        } catch (error) {
            console.error("Error fetching the response:", error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className="fixed  bottom-20 right-20 z-50"
            >
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg w-80 relative">
                    <button
                        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
                        onClick={() => setShowChatbot(false)}
                    >
                        ❌
                    </button>
                    <h2 className="text-lg flex items-center justify-center font-bold mb-3 text-gray-800 dark:text-white ">
                        <RiRobot2Line size={20} className='mr-4' /> ChatBot AI
                    </h2>
                    <hr className='mb-4' />

                    <div className='w-full flex flex-col gap-4 min-h-60 max-h-60 overflow-y-auto'>
                        {chatHistory.map((chat, index) => (
                            chat?.username === 'Chatbot' ?
                                <div key={index} className="flex justify-start">
                                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-200 text-gray-800 rounded-bl-none">
                                        <div className="flex items-center mb-1">
                                            <RiRobot2Line size={18} className='mr-2' />
                                            <span className="text-xs font-medium">{chat?.username}</span>
                                            <span className="text-xs ml-2 opacity-75">{chat?.time}</span>
                                        </div>
                                        {chat?.message === 'Loading...' ? <div className='text-center'><Spinner size="sm" /></div>
                                            :
                                            <>
                                                <div
                                                    className="text-xs text-wrap"
                                                    dangerouslySetInnerHTML={{ __html: chat?.message }}
                                                />
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <span
                                                        onClick={() => handleAsk("tôi muốn tìm việc làm")}
                                                        className="px-3 text-blue-500 text-[11px] py-1 bg-gray-100 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                                    >
                                                        1. Tìm công việc
                                                    </span>
                                                    <span
                                                        onClick={() => handleAsk("tôi muốn hỏi về lĩnh vực nào đó")}
                                                        className="px-3 text-blue-500 text-[11px] py-1 bg-gray-100 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                                    >
                                                        2. Hỏi đáp lĩnh vực
                                                    </span>
                                                    <span
                                                        onClick={() => navigate("/cv/review-by-ai")}
                                                        className="px-3 text-blue-500 text-[11px] py-1 bg-gray-100 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                                        3. Review CV by AI
                                                    </span>
                                                    <span
                                                        onClick={() => handleAsk("hiện đang có những công ty tuyển dụng nào?")}
                                                        className="px-3 text-blue-500 text-[11px] py-1 bg-gray-100 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                                        4. Danh sách công ty
                                                    </span>
                                                    <span
                                                        onClick={() => navigate("/interview-by-AI")}
                                                        className="px-3 text-blue-500 text-[11px] py-1 bg-gray-100 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                                        5. Interview by AI
                                                    </span>
                                                    <span
                                                        onClick={() => handleAsk("giúp tôi tạo 1 cover lettet được không?")}
                                                        className="px-3 text-blue-500 text-[11px] py-1 bg-gray-100 rounded hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                                        6. Tạo thư xin việc
                                                    </span>
                                                </div>
                                            </>
                                        }

                                    </div>
                                </div>
                                :
                                <div key={index} className="flex justify-end">
                                    <div className="max-w-[80%] rounded-lg p-3 bg-blue-500 text-white rounded-br-none">
                                        <div className="flex items-center mb-1">
                                            <CiUser size={16} className='mr-2' />
                                            <span className="text-xs font-medium">{chat?.username}</span>
                                            <span className="text-xs ml-2 opacity-75">{chat?.time}</span>
                                        </div>
                                        <p className='text-[13px]'>{chat?.message}</p>
                                    </div>
                                </div>
                        ))}
                    </div>

                    {file && (
                        <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                            📎 {file.name}
                        </p>
                    )}
                    <div className="border-t border-gray-200 pt-4 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && input.trim()) {
                                    handleAsk();
                                }
                            }}
                            placeholder="Type your message here..."
                            className="flex-1 text-xs border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none"
                        />

                        {/* Nút upload file */}
                        <label className="bg-gray-200 p-2 cursor-pointer hover:bg-gray-300">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="hidden"
                            />
                            <CiLink size={18} />
                        </label>
                        <label className="text-white p-1 bg-red-500 cursor-pointer">
                            <button
                                onClick={startListening}
                                disabled={isListening}
                                className={`text-white transition-all duration-300
            ${isListening ? 'bg-red-500 cursor-not-allowed' : 'bg-red-500'}`}
                            >
                                {isListening ? <FaMicrophoneSlash size={18} /> : <FaMicrophone size={18} />}
                            </button>
                        </label>

                        {/* Nút gửi */}
                        <button
                            onClick={handleAsk}
                            disabled={!input.trim() && !file}
                            className="bg-blue-600 cursor-pointer text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <IoMdSend size={16} />
                        </button>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default withErrorBoundary(ModalChatBot);
import { message } from 'antd';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from 'react-toastify';
import { askGeminiWithPDF } from '../chatbot/gemini';
import withErrorBoundary from '../../hoc/withErrorBoundary';

const ModalJobMatching = ({ openModal = false, setOpenModal = null, job = {} }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [answerFromAI, setAnswerFromAI] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmitForm = async () => {
        if (!selectedFile) {
            message.warning('Vui lòng chọn file để upload!');
            return;
        }
        let inputMessage = `Tôi sẽ gửi kèm CV của tôi, cùng với mô tả công việc, yêu cầu ứng viên của công việc mà tôi dự định 
        sẽ ứng tuyển. Hãy đánh giá xem công việc trên có phù hợp với ứng viên không, đưa ra phần trăm độ phù hợp. Nếu không phù hợp thì lý do tại sao.
        Nếu chưa phù hợp, hãy gợi ý điều cần cải thiện (đừng quan tâm tới các thẻ h2,strong,li... có trong mô tả và yêu cầu nhé! Và hãy thêm thẻ <br> để ngăn cách các mục cho rõ ràng.). 
        Mô tả công việc: ${job?.description}. 
        Yêu cầu:${job?.requirements}`;
        setIsLoading(true);
        try {
            let res = await askGeminiWithPDF(selectedFile, inputMessage);
            setAnswerFromAI(res ?? "");
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <div className="relative dark:bg-slate-800">
                <ModalHeader>Đánh giá mức độ phù hợp của bạn với công việc</ModalHeader>
                {!answerFromAI ?
                    <ModalBody>
                        <div className="space-y-4">
                            <div>
                                <p className="mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                    Upload CV bạn dự định sẽ nộp để ứng tuyển
                                </p>

                                {/* Hidden input & styled label as button */}
                                <div className="flex items-center space-x-4">
                                    <label
                                        htmlFor="cv-upload"
                                        className="flex gap-1 px-4 py-2 bg-red-400 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
                                    >
                                        <MdOutlineFileUpload size={22} />  Chọn file
                                    </label>
                                    <input
                                        type="file"
                                        id="cv-upload"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    {selectedFile && (
                                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
                                            {selectedFile.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Nội dung mô tả khác (nếu có) */}
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                Hệ thống sẽ sử dụng CV của bạn để đánh giá độ phù hợp với vị trí đang ứng tuyển.
                            </p>
                        </div>
                    </ModalBody>
                    :
                    <ModalBody className="max-h-[70vh] overflow-y-auto dark:bg-white">
                        <div
                            className="mt-4 text-sm text-gray-800 text-justify"
                            dangerouslySetInnerHTML={{ __html: answerFromAI }}
                        />
                    </ModalBody>
                }

                <ModalFooter className="w-full flex justify-end gap-2">
                    {!answerFromAI && <Button onClick={handleSubmitForm}>Xác nhận</Button>}
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Hủy
                    </Button>
                </ModalFooter>


                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex flex-col gap-3  items-center justify-center z-10">
                        <Spinner size="xl" />
                        <span className="text-lg font-semibold text-red-500 dark:text-white animate-pulse">
                            Job matching processing...
                        </span>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default withErrorBoundary(ModalJobMatching);

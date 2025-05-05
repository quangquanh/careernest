import { message } from 'antd';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { askGemini } from '../chatbot/gemini';
import withErrorBoundary from '../../hoc/withErrorBoundary';

const ModalRecruitmentMatching = ({ openModal = false, setOpenModal = null, company = {} }) => {
    const descriptionRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [answerFromAI, setAnswerFromAI] = useState("");

    const handleSubmitForm = async () => {
        if (!descriptionRef?.current?.value) {
            message.warning("Bạn chưa nhập thông tin mô tả bản thân.");
            return;
        }
        let inputMessage = `Tôi sẽ gửi kèm mô tả bản thân (phong cách làm việc, giá trị cá nhân, ưu tiên nghề nghiệp, tính 
            cách, trải nghiệm trước đây,...), cùng với tên công ty mà tôi muốn tìm hiểu văn hóa làm việc. 
        Sau đó hãy dựa vào tất cả thông tin bạn có thể tìm được từ các nguồn trên mạng, từ các trang đánh giá công ty, để 
        trả lời cho người dùng biết liệu họ có phù hợp không nhé, hãy cho biết cả mức độ phần trăm sự phù hợp. (kết quả phản hồi hãy thêm thẻ <br> để ngăn cách các mục cho rõ ràng.). 
        Mô tả bản thân: ${descriptionRef.current.value}. 
        Tên công ty:${company?.name}`;
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

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <div className="relative dark:bg-slate-800">
                <ModalHeader>Mức độ phù hợp của bạn với văn hóa công ty</ModalHeader>
                {!answerFromAI ?
                    <ModalBody>
                        <div className="space-y-4">
                            {/* Textarea cho người dùng nhập thông tin */}
                            <div>
                                <label
                                    className="block text-sm font-medium mb-4 text-gray-700 dark:text-gray-300"
                                >
                                    Mô tả về bản thân của bạn:
                                </label>
                                <textarea
                                    ref={descriptionRef}
                                    rows="8"
                                    className="w-full text-xs border rounded-md p-2 focus:outline-none placeholder:tracking-wider pr-10"
                                    placeholder="Nhập thông tin như: phong cách làm việc, giá trị cá nhân, ưu tiên nghề nghiệp, tính cách, trải nghiệm trước đây,..."
                                />
                            </div>

                            {/* Nội dung mô tả khác (nếu có) */}
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                * Hệ thống sẽ tự động đánh giá xem bạn có phù hợp với văn hóa công ty không.
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
                            Comany culture processing...
                        </span>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default withErrorBoundary(ModalRecruitmentMatching);
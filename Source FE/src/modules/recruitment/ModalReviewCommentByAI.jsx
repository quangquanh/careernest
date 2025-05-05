import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { askGemini } from '../chatbot/gemini';
import withErrorBoundary from '../../hoc/withErrorBoundary';

const ModalReviewCommentByAI = ({ openModal = false, setOpenModal = null, dataComments = [] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [answerFromAI, setAnswerFromAI] = useState("");

    const processComment = (comments) => {
        let result = '';  // Khởi tạo chuỗi kết quả

        for (let i = 0; i < comments.length; i++) {
            result += `Rating: ${comments[i].rating}, Comment: "${comments[i].comment}"\n`;
        }

        return result.trim();  // Loại bỏ ký tự xuống dòng thừa ở cuối chuỗi
    }

    useEffect(() => {
        let isMounted = true;  // Flag để kiểm tra xem component còn mounted không

        const fetchData = async () => {
            let inputMessage = `Tôi sẽ gửi kèm 1 đoạn text gồm các đánh giá (comment) của 1 công ty, được ngăn cách bởi dấu xuống dòng, gồm có rating (số sao mà người dùng rate) và comment chi tiết của người dùng. Sau đó bạn hãy đọc và đánh giá xem liệu công ty này có uy tín không, có dấu hiệu lừa đảo không, có đáng để người dùng ứng tuyển vào không.
            Nội dung truyền vào: ${processComment(dataComments)}`;

            setIsLoading(true);

            try {
                let res = await askGemini(inputMessage);
                if (isMounted) {
                    setAnswerFromAI(res ?? "");
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.message);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function to avoid updating state if component unmounts
        return () => {
            isMounted = false; // Khi component unmount, set isMounted thành false
        };
    }, [dataComments]);

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <div className="relative dark:bg-slate-800">
                <ModalHeader>
                    {localStorage.getItem('i18nextLng') === 'vi' ? "Đánh giá công ty bởi AI" : "Evaluate company by AI"}
                </ModalHeader>
                {answerFromAI &&
                    <ModalBody className="max-h-[70vh] overflow-y-auto dark:bg-white">
                        <div
                            className="mt-4 text-sm text-gray-800 text-justify"
                            dangerouslySetInnerHTML={{ __html: answerFromAI }}
                        />
                    </ModalBody>
                }

                <ModalFooter className="w-full flex justify-end gap-2">
                    <Button color="info" onClick={() => setOpenModal(false)}>
                        {localStorage.getItem('i18nextLng') === 'vi' ? "Quay lại" : "Return"}
                    </Button>
                </ModalFooter>


                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex flex-col gap-3  items-center justify-center z-10">
                        <Spinner size="xl" />
                        <span className="text-lg font-semibold text-red-500 dark:text-white animate-pulse">
                            Review proccessing...
                        </span>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default withErrorBoundary(ModalReviewCommentByAI);
import React from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { deleteOnlResume } from '../../services/resumeService';
import { message } from 'antd';
import { deleteWorkExperience } from '../../services/workExperience';

const ModalDeleteCV = ({ openModal = false, setOpenModal = () => { }, data = {}, refetchOnlResumes = null }) => {

    const mutationDeleteWorkExpe = useMutation({
        mutationFn: deleteWorkExperience,
        onSuccess: async (res) => {
            if (+res?.statusCode === 200 || +res?.statusCode === 201)
                return;
            else {
                console.log(res?.data ?? res);
                message.error(`${res?.data?.error}: ${res?.data?.message}`);
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error?.message || 'Something wrong in Server');
        },
    });

    const mutation = useMutation({
        mutationFn: deleteOnlResume,
        onSuccess: async (res) => {
            if (+res?.statusCode === 200 || +res?.statusCode === 201) {
                message.success("Xóa thành công");
                refetchOnlResumes();
                mutation.reset();
                mutationDeleteWorkExpe.reset();
                setOpenModal(false)
            } else {
                console.log(res?.data ?? res);
                message.error(`${res?.data?.error}: ${res?.data?.message}`);
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error?.message || 'Something wrong in Server');
        },
    });


    const handleDeleteOnlResume = async (id) => {
        if (!data?.id) return;
        if (data?.workExperiences?.length > 0) {
            for (const exp of data.workExperiences) {
                await mutationDeleteWorkExpe.mutateAsync(+exp?.id);
            }
        }
        await mutation.mutateAsync(+data?.id);
    }

    if (!data?.id) return null
    return (
        <Modal show={openModal} className="pt-40 md:pt-0" size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Bạn có chắc muốn xóa CV "{data?.title}"?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleDeleteOnlResume}>
                            Đồng ý
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Hủy
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDeleteCV;
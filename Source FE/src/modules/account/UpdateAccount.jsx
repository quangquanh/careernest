import React, { useEffect, useRef, useState } from 'react';
import { Modal, Datepicker, Select } from "flowbite-react";
import { db } from "../../firebase/configFirebase";
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { putUpdateUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { useDetailUser } from '../../hooks/useDetailUer';
import useFirebaseImage from "../../hooks/useFireBaseImage";
import ImageUpload from '../../components/image/ImageUpload';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { useTranslation } from 'react-i18next';

const UpdateAccount = ({ isOpen = false, setOpenModal = () => { } }) => {
    const { t } = useTranslation();

    const user = useSelector(state => state?.user?.info);
    const { refetch } = useDetailUser(user?.id);

    const [dob, setDOB] = useState(user?.dateOfBirth ? new Date(user.dateOfBirth) : null);
    const [avatar, setAvatar] = useState(user?.avatarUrl ? getFirebaseImageUrl(user.avatarUrl, 'users') : '');
    const [imageNameState, setImageName] = useState('');

    const imageRegex = /%2F(\S+)\?/gm.exec(avatar);
    const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
    const { imageURL, progress, handleOnchangeImage, handleDeleteImage } = useFirebaseImage("users", setImageName, imageNameState, imageName);

    const fullNameRef = useRef(user?.fullName || '');
    const genderRef = useRef(user?.gender || 'MALE');
    const phoneRef = useRef(user?.phoneNumber || '');
    const addressRef = useRef(user?.address || '');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (imageURL)
            setAvatar(imageURL);
    }, [imageURL, setAvatar]);

    const splitName = (fullName) => {
        const parts = fullName.trim().split(/\s+/);
        const firstName = parts.pop();
        const lastName = parts.join(' ');
        return { firstName, lastName };
    }

    const mutation = useMutation({
        mutationFn: putUpdateUser,
        onSuccess: (res) => {
            if (res?.statusCode === 200) {
                toast.success("Sửa hồ sơ thành công");
                refetch();
                mutation.reset();
                setOpenModal(false);
            } else {
                console.log(res?.data);
                toast.error(res?.data?.error);
            }
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error?.message || 'Something wrong in Server');
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            id: user?.id,
            firstName: splitName(fullNameRef.current.value).firstName,
            lastName: splitName(fullNameRef.current.value).lastName,
            dateOfBirth: dob,
            gender: genderRef.current.value,
            phoneNumber: phoneRef.current.value.startsWith('0') ? phoneRef.current.value : `0${phoneRef.current.value}`,
            address: `${addressRef.current.value} ${city}`.trim(),
            avatar: imageName,
        };
        await mutation.mutateAsync(updatedUser);
    };

    return (
        <>
            <Modal show={isOpen} size="3xl" className='pt-20' popup onClose={() => setOpenModal(false)} >
                <Modal.Header className='dark:bg-slate-800' />
                <Modal.Body className='dark:bg-slate-800'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="avatar" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Avatar </label>
                                <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
                                    <ImageUpload
                                        className="!rounded-full h-full"
                                        onChange={handleOnchangeImage}
                                        handleDeleteImage={() => { setAvatar(''); handleDeleteImage(); }}
                                        progress={progress}
                                        image={avatar}
                                        imageName={imageName}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="full_name_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    {t('profile_page.update_account_form.fullName')}
                                </label>
                                <input
                                    type="text"
                                    defaultValue={`${user?.lastName} ${user?.firstName}` || ''}
                                    ref={fullNameRef}
                                    id="full_name_info_modal"
                                    className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    placeholder="Nhập họ và tên"
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="email_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    {t('profile_page.update_account_form.email')}
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    defaultValue={user?.email || ''}
                                    id="email_info_modal"
                                    className="outline-none cursor-not-allowed block w-full rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your email here" />
                            </div>
                            {/* <div className="col-span-2 ">
                                <label htmlFor="title_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Chức danh công việc </label>
                                <input type="text" id="title_info_modal" className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="ex: Business Analysist" required />
                            </div> */}
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="birthDay_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    {t('profile_page.update_account_form.dob')}
                                </label>
                                <Datepicker
                                    value={dob}
                                    onChange={(date) => setDOB(date)}
                                    language='vi'
                                    placeholder='Chọn ngày sinh'
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="gender_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    {t('profile_page.update_account_form.gender')}
                                </label>
                                <Select
                                    id="gender_info_modal"
                                    defaultValue={user?.gender || 'FEMALE'}
                                    ref={genderRef}
                                    required
                                >
                                    <option value={'MALE'}>Nam</option>
                                    <option value={'FEMALE'}>Nữ</option>
                                </Select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="phone-input_billing_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    {t('profile_page.update_account_form.phone')}
                                </label>
                                <div className="flex items-center">
                                    <button id="dropdown_phone_input__button_billing_modal" data-dropdown-toggle="dropdown_phone_input_billing_modal" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                                        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="h-4 w-4 mr-2" preserveAspectRatio="xMidYMid meet"><circle cx={32} cy={32} r={30} fill="#f42f4c" /><path fill="#ffe62e" d="M32 39l9.9 7l-3.7-11.4l9.8-7.4H35.8L32 16l-3.7 11.2H16l9.8 7.4L22.1 46z" /></svg>
                                        +84
                                    </button>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            defaultValue={user?.phoneNumber || ''}
                                            ref={phoneRef}
                                            id="phone-input"
                                            className="z-20 outline-none block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" placeholder="0123 456 789" required />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address_billing_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                    {t('profile_page.update_account_form.address')}
                                </label>
                                <input
                                    type='text'
                                    id="address_billing_modal"
                                    defaultValue={user?.address ?? ''}
                                    ref={addressRef}
                                    rows={3}
                                    className="block w-full outline-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter here your address" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <div className="mb-2 flex items-center gap-2">
                                    <label htmlFor="select_city_input_billing_modal" className="block text-sm font-medium text-gray-900 dark:text-white">
                                        {t('profile_page.update_account_form.province')}
                                    </label>
                                </div>
                                <select
                                    id="select_city_input_billing_modal"
                                    defaultValue={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option value="">{t('profile_page.update_account_form.selectProvince')}</option>
                                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Huế">Huế</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                </select>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="company_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> {t('profile_page.update_account_form.portfolio')} </label>
                                <input type="text" id="company_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Flowbite LLC" />
                            </div>
                        </div>
                        <div className="text-right border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                            <button type="submit" className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t('profile_page.update_account_form.save')}</button>
                            <button type="button" data-modal-toggle="accountInformationModal2" className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">{t('profile_page.update_account_form.cancel')}</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >

        </>
    );
};

export default UpdateAccount;
import React from 'react';
import { Avatar, Dropdown } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router';
import { dropdownAdmin } from '../../utils/menu';
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from '@tanstack/react-query';
import { postLogout } from '../../services/userService';
import { updateUserInfo } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../redux/store.js';
import { path } from '../../utils/constant';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL.js';
import { useTranslation } from 'react-i18next';

const DropdownAdmin = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.info);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const mutation = useMutation({
        mutationFn: postLogout,
        onSuccess: async (res) => {
            if (res?.statusCode === 200) {
                persistor.pause();            // Tạm dừng Redux Persist
                // localStorage.clear();        // Xóa toàn bộ localStorage
                await persistor.purge();    // Xóa dữ liệu của Redux Persist
                dispatch(updateUserInfo({ info: {}, access_token: '' }));
                navigate(path.HOME);
            } else
                toast.error('Đăng xuất thất bại');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });
    const handleLogout = async () => {
        await mutation.mutateAsync({});
    };

    return (
        <>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <div className='flex items-center gap-2'>
                        <Avatar
                            alt="User settings"
                            img={user?.avatarUrl ? getFirebaseImageUrl(user.avatarUrl, 'users') : ''}
                            rounded
                        />
                        <span className='hidden xs:inline-block text-gray-800 font-medium dark:text-gray-400'>{`${user?.firstName ?? ''}`}</span>
                        <IoIosArrowDown size={13} className='dark:text-gray-400' />
                    </div>
                }
            >
                {dropdownAdmin?.length > 0 && dropdownAdmin.map(item => (
                    <Link key={item?.path} to={item?.path} onClick={(e) => e.stopPropagation()}>
                        <Dropdown.Item>{t(item.text)}</Dropdown.Item>
                    </Link>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>{t('header.dropdown_account.logout')}</Dropdown.Item>
            </Dropdown>
        </>
    );
};

export default React.memo(DropdownAdmin);
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { headerMenu } from "../../utils/menu";
import { Button } from "flowbite-react";
import { LoginPage } from "../../pages/auth/LoginPage";
import { path } from "../../utils/constant";
import DropdownAccount from "../../modules/account/DropdownAccount";
import DropdownAdmin from "../../modules/system/DropdownAdmin";
import { useSelector } from "react-redux";
import Languages from "./Languages";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const user = useSelector(state => state?.user?.info);

    // Xử lý khi click ra ngoài dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpenLogin = () => {
        if (location.pathname !== path.RECRUITMENT)
            setOpenModalLogin(true);
        else {
            navigate(`${path.RECRUITMENT}/${path.RECRUITMENT__LOGIN}`);
        }
    }

    return (
        <>
            <header>
                <nav className="w-full z-40 fixed top-0 bg-white shadow-md border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-slate-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to={user?.role?.id !== 2 ? '/' : '/recruitment'} className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CareerNest</span>
                        </Link>
                        <div className="flex items-center lg:order-2 gap-3 sm:gap-5">
                            {!user?.id ?
                                <>
                                    <Button color="light" onClick={handleOpenLogin}>{t('header.login')}</Button>
                                    {!location.pathname.includes(path.RECRUITMENT) &&
                                        <Button color="blue" className="uppercase hidden sm:inline-flex"
                                            onClick={() => navigate(path.RECRUITMENT)}
                                        >
                                            {t('header.recruiter')}
                                        </Button>
                                    }
                                </>
                                :
                                <>
                                    {+user?.role?.id === 1 ? <DropdownAdmin /> : <DropdownAccount />}
                                </>
                            }
                            <Languages />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-expanded={isOpen}
                            >
                                {isOpen ?
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    :
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                }
                            </button>
                        </div>
                        {(user?.role?.id !== 2 && location.pathname !== path.RECRUITMENT) &&
                            <div className={`${isOpen ? "block" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                    {headerMenu?.length > 0 && headerMenu.map(item => (
                                        <li key={item.path} className="relative">
                                            {item.path === '/resume' ? (
                                                <div ref={dropdownRef} className="relative">
                                                    <button
                                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                        className="ct-header-dropdown ct-hover-transition flex items-center"
                                                    >
                                                        {t(item.text)}
                                                        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    {isDropdownOpen &&
                                                        <ul className="z-50 absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg dark:bg-gray-700">
                                                            <li>
                                                                <Link to={`${path.CV}/${path.CV__MANAGE}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
                                                                    {localStorage.getItem('i18nextLng') === 'vi' ? "Quản lý CV" : "CV Management"}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to={`${path.CV}/${path.CV__CREATE}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
                                                                    {localStorage.getItem('i18nextLng') === 'vi' ? "Tạo CV" : "Create CV"}
                                                                </Link>
                                                            </li>
                                                            <li className="relative">
                                                                <Link
                                                                    to={`${path.CV}/${path.CV__REVIEW__BY__AI}`}
                                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                                                                >
                                                                    {localStorage.getItem('i18nextLng') === 'vi' ? "Đánh giá CV bởi AI" : "CV Evaluation by AI"}
                                                                    <span className="absolute top-0 right-0 mt-1 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                                                        New
                                                                    </span>
                                                                </Link>
                                                            </li>

                                                        </ul>
                                                    }
                                                </div>
                                            ) :
                                                <NavLink
                                                    to={item.path}
                                                    className={({ isActive }) =>
                                                        `relative inline-block ct-header-dropdown ct-hover-transition 
                                                ${(item.path === path.RECRUITMENT) && 'sm:hidden block'} 
                                                ${isActive && 'text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white'}`
                                                    }
                                                >
                                                    <span>  {t(item.text)}</span>
                                                    {(item.path === '/interview-by-AI' || item.path === '/roadmap-by-AI') && (
                                                        <span className="absolute -top-1 -right-2 text-[8px] bg-red-600 text-white rounded-full px-1.5 py-[1px] font-bold animate-bounce">
                                                            NEW
                                                        </span>
                                                    )}
                                                </NavLink>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
            </header>
            {openModalLogin && <LoginPage isOpen={openModalLogin} setOpenModal={setOpenModalLogin} />}
        </>

    );
};

export default Header;

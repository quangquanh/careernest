import { Link } from "react-router-dom";
import { path } from "../../utils/constant";
import { List } from 'flowbite-react'
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { useRef } from "react";
import { useDispatch } from 'react-redux';
import { updateUserInfo } from "../../redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../services/userService";
import { toast } from "react-toastify";

const LoginRecruitmentPage = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: async (res) => {
            if (+res?.statusCode === 200) {
                dispatch(updateUserInfo({ ...res?.data }));
                mutation.reset();
            } else
                toast.error(res?.error ?? 'Login failed!');
        },
        onError: (error) => {
            console.error('Error:', error);
            toast.error(error.message || 'Something wrong in Server');
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await mutation.mutateAsync({ username: emailRef.current?.value, password: passwordRef.current?.value });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    CareerNest
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng nhập dành cho Nhà tuyển dụng
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    ref={emailRef}
                                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    ref={passwordRef}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">By signing in, you agree to CareerNest’s<a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#"> Terms and Conditions</a> in relation to your privacy information.</label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Bạn quên mật khẩu? <Link to={path.FORGOT__PASSWORD} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Lấy lại mật khẩu</Link>
                            </p>
                            <hr />
                            <div className="w-full">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Bạn chưa có tài khoản doanh nghiệp? Liên hệ qua:
                                    <List className="mt-2 text-xs pl-3">
                                        <List.Item icon={IoCallOutline} >Ho Chi Minh: (+84) 977 460 519</List.Item>
                                        <List.Item icon={CiMail} >Email: careernest-hr@gmail.com</List.Item>
                                    </List>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default LoginRecruitmentPage;

import React, { useState } from 'react';
import Link from 'next/link';
import {apiClient} from "@/services/api-client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await apiClient({
                url: 'login',
                method: 'POST',
                data: {
                    phone: phone,
                    password: password
                }
            });
            setCookie('authToken', res.data.data.token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                maxAge: 60 * 60 * 24 * 7
            });
            toast.success("Login successful!");
            await router.push('/');
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during login.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-theme-mainBg">
            <div className="p-8 mt-36 mb-8 bg-theme-cardBg shadow-md rounded-md w-[400px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-theme-textOnDark">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="mt-1 block w-full px-3 py-2 bg-theme-lightBg border border-gray-300 rounded-md shadow-sm focus:text-theme-textOnLight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-theme-textOnDark">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="mt-1 block w-full px-3 py-2 bg-theme-lightBg border border-gray-300 rounded-md shadow-sm focus:text-theme-textOnLight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/forgot-password">
                                <span className="font-medium text-blue-400 hover:text-indigo-500">
                                    Forgot your password?
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-theme-textOnDark bg-theme-darkBg hover:bg-theme-footerBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                        <div className="text-center mt-4 text-theme-textOnLight">
                            <span>
                                Do not have an account?
                                <span className='text-blue-400' >
                                    <Link href='/registration'> register</Link>
                                </span>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
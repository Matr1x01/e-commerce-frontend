import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getCookie, setCookie} from 'cookies-next';
import { useRouter } from 'next/router';
import {useWishlist} from "@/services/WishlistProvider";
import {getWishlistRequest} from "@/api/wishlistRequests";
import {loginRequest} from "@/api/authRequests";
const LoginPage = () => {
    const router = useRouter();
    const {wishlist, setWishlistItems} = useWishlist();
    if (process.browser) {
        const authToken = getCookie('authToken');
        if (authToken) {
            router.push('/');
        }
    }
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false);

    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginRequest({phone, password});
        setCookie('authToken', res.data.data.token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            maxAge: 60 * 60 * 24 * 7
        });
        const wishlistResponse = await getWishlistRequest();
        if (!wishlistResponse.error) {
            setWishlistItems(wishlistResponse.data.data.items.map(item => item.product_slug));
        }
        toast.success("Login successful!");
        await router.push('/');
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
                        <label htmlFor="password"
                               className="block text-sm font-medium text-theme-textOnDark">Password</label>
                        <div className="relative">
                            <input
                                type={view ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full px-3 py-2 bg-theme-lightBg border border-gray-300 rounded-md shadow-sm focus:text-theme-textOnLight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setView(!view)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {view ? "Hide" : "Show"}
                            </button>
                        </div>
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
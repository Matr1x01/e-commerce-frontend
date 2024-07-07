import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiClient } from "@/services/api-client";
import { useRouter } from 'next/router';
import Link from "next/link";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            const response = await apiClient({
                url: 'register',
                method: 'POST',
                data: {
                    name: formData.name,
                    phone: formData.phone,
                    password: formData.password,
                }
            });
            if (response.status === 200) {
                toast.success("Registration successful!");
                setCookie('authToken', response.data.token, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                    maxAge: 60 * 60 * 24 * 7
                });
                router.push('/login');
            } else {
                toast.error("Registration failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during registration.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-theme-mainBg">
            <div className="p-8 mt-36 mb-8 bg-theme-cardBg shadow-md rounded-md w-[400px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-theme-textOnLight">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-theme-lightBg border border-gray-300 rounded-md shadow-sm text-theme-textOnLight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-theme-textOnLight">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-theme-lightBg border border-gray-300 rounded-md shadow-sm text-theme-textOnLight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-theme-textOnLight">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-theme-lightBg border border-gray-300 rounded-md shadow-sm text-theme-textOnLight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-theme-textOnLight">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-theme-lightBg border border-gray-300 rounded-md shadow-sm text-theme-textOnLight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-theme-darkBg rounded-md hover:bg-theme-buttonBgHover focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                    <div className="text-center mt-4 text-theme-textOnLight">
                        <span>
                            Already have an account?
                            <Link href='/login'>
                                <span className='text-blue-400'> Login </span>
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default RegistrationPage;
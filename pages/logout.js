import React from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const LogoutPage = () => {
    const router = useRouter();

    const handleLogout = () => {
        deleteCookie('authToken');
        router.push('/');
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-theme-textOnLight">
            <h1 className="mb-4 text-xl font-semibold">Are you sure you want to log out?</h1>
            <div className="flex gap-4">
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Yes, log out</button>
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
            </div>
        </div>
    );
};

export default LogoutPage;
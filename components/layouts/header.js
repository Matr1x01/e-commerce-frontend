import Link from 'next/link';
import {deleteCookie, getCookie} from "cookies-next";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useWishlist} from "@/services/WishlistProvider";

const Header = () => {
    const [token, setToken] = useState(null);
    const router = useRouter();
    const {setWishlistItems} = useWishlist();
    useEffect(() => {
        const authToken = getCookie('authToken');
        setToken(authToken);
    });
    return (
        <header className="bg-theme-headerBg text-theme-textOnLight p-5">
            <nav className="flex justify-between items-center">
                <div className="flex gap-4">
                    <Link href="/">
                        <span className="hover:text-gray-300">Home</span>
                    </Link>
                    <Link href="/brands">
                        <span className="hover:text-gray-300">Brands</span>
                    </Link>
                    <Link href="/categories">
                        <span className="hover:text-gray-300">Categories</span>
                    </Link>
                </div>
                <div className="flex gap-4">
                    {token ? (
                        <>
                            <Link href="/profile">
                                <span className="hover:text-gray-300">Profile</span>
                            </Link>
                            <span className="hover:text-gray-300 hover:cursor-pointer" onClick={() => {
                                deleteCookie('authToken');
                                setWishlistItems([]);
                                router.push('/');
                            }}>Logout</span>
                            <Link href="/cart">
                                <span className="hover:text-gray-300">Cart</span>
                            </Link>
                            <Link href="/wishlist">
                                <span className="hover:text-gray-300">Wishlist</span>
                            </Link>
                            <Link href="/orders">
                                <span className="hover:text-gray-300">Orders</span>
                            </Link>
                        </>
                    ) : (
                        <Link href="/login">
                            <span className="hover:text-gray-300">Login</span>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
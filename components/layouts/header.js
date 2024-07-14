import Link from 'next/link';
import {deleteCookie, getCookie} from "cookies-next";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useWishlist} from "@/services/WishlistProvider";
import {getSearchResults} from "@/api/productRequests";

const Header = () => {
    const [token, setToken] = useState(null);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();
    const {setWishlistItems} = useWishlist();

    const fetchSearchResults = async (query) => {
        if (!query || query.length < 2) {
            setSearchResults([]);
            return;
        }
        const response = await getSearchResults(query);
        const results = response.data.data;
        if (results && results?.length > 0) {
            setSearchResults(results.map(item => {
                return {name: item.name, slug: item.slug}
            }))
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        fetchSearchResults(query);
    };

    const handleResultClick = (e) => {
        const result = searchResults.find(result => result.name === e.target.innerText);
        setSearch('');
        setSearchResults([]);
        router.push(`/products/${result.slug}`);

    }

    useEffect(() => {
        const authToken = getCookie('authToken');
        setToken(authToken);
    });
    return (
        <header className="bg-theme-headerBg text-theme-textOnLight p-5">
            <nav className="flex items-center">
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
                <div className="gap-4 w-full">
                    <div className='relative flex flex-col w-full max-w-[600px] mx-auto'>
                        <input
                            className='p-2 bg-theme-lightBg text-theme-textOnLight rounded-2xl'
                            placeholder="Search Product"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <div className="absolute top-10 w-full max-w-[600px] z-10 mx-auto bg-theme-lightBg rounded-2xl">
                            {searchResults.map((result) => (
                                <div onClick={handleResultClick} key={result.slug} className="text-theme-textOnLight my-2 mx-2 cursor-pointer">
                                    {result.name}
                                </div>
                            ))}
                        </div>
                    </div>

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
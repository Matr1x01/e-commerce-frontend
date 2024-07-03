import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-5">
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
                    <Link href="/cart">
                        <span className="hover:text-gray-300">Cart</span>
                    </Link>
                    <Link href="/orders">
                        <span className="hover:text-gray-300">Orders</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
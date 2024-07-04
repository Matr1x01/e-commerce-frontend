import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl">Oops! The page you're looking for was not found.</p>
            <Link href="/">
                <span className="mt-4 text-blue-600">Go back home</span>
            </Link>
        </div>
    );
}
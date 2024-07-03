import Header from './header'
import Footer from './footer'
import "../../app/globals.css";
export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className='h-screen bg-gray-700'>{children}</main>
            <Footer />
        </>
    )
}
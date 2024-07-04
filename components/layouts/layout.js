import Header from './header'
import Footer from './footer'
import "../../app/globals.css";
export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className='min-h-screen h-auto bg-theme-mainBg'>{children}</main>
            <Footer />
        </>
    )
}
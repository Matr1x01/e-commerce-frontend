import Layout from '../components/layouts/layout'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {WishlistProvider} from "@/services/WishlistProvider";

export default function MyApp({Component, pageProps}) {
    return (
        <WishlistProvider>
            <Layout>
                <Component {...pageProps} />
                <ToastContainer/>
            </Layout>
        </WishlistProvider>
    )
}
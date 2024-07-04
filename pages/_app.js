import Layout from '../components/layouts/layout'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
            <ToastContainer />
        </Layout>
    )
}
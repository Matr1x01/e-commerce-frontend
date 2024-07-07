import { getCookie } from 'cookies-next';
import {addTokenToHeader, apiClient} from "@/services/api-client";
import {getOrderRequest} from "@/api/orderRequests";

const OrderDetails = ({ order }) => {
    return (
        order!==null?
        <div className="bg-theme-cardBg text-theme-textOnLight p-6 mb-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">Order ID: {order?.key}</h2>
            <div className="grid grid-cols-2 gap-4">
                <span>Total: ${order.total}</span>
                <span>Tax: ${order.tax}</span>
                <span>Shipping: ${order.shipping}</span>
                <span>Discount: ${order.discount}</span>
                <span>Sub Total: ${order.sub_total}</span>
                <span>Total Items: {order.total_items}</span>
                <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                <span>Order Status: {order.order_status}</span>
                <span>Payment Status: {order.payment_status}</span>
                <span>Payment Method: {order.payment_method}</span>
                <span>Delivery Method: {order.delivery_method}</span>
            </div>
        </div>
    :
    <div className=''>Order not found</div>
    );
};


export default OrderDetails;


export async function getServerSideProps({ params, req, res }) {
    const { key } = params;
    const token = getCookie("authToken", { req, res});
    addTokenToHeader(token);
    const response = await getOrderRequest({ orderUuid: key});
    if (response.error){
        console.log(response.data);
        return {
            props: {
                order: null
            }
        }
    }

    return {
        props: {
            order: response.data
        }
    }

}
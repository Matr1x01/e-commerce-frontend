import { getCookie } from 'cookies-next';
import {apiClient} from "@/services/api-client";

const OrderDetails = ({ order }) => {
    console.log(order)
    return (
        order!==null?
        <div className="bg-theme-cardBg text-theme-textOnDark p-6 mb-4 border border-gray-200 rounded-lg">
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
    try{
        const response = await apiClient({
            url: `orders/${key}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            props: {
                order: response.data.data,
            }
        };

    }
    catch (error) {
        console.error("Failed to fetch order details:", error);
        return {
            props: {
                order: null,
            }
        };
    }

}
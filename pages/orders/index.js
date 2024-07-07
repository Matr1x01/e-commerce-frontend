import OrderCard from "@/components/OrderCard";
import {apiClient} from "@/services/api-client";
import {useEffect, useState} from "react";
import {getOrdersRequest} from "@/api/orderRequests";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getOrdersRequest();

            if (response.error) {
                console.error(response.error);
                return;
            }

            setOrders(response.data.data);
        };
        fetchOrders();
    }, []);
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-theme-textOnLight text-3xl font-bold mb-8">Orders List</h1>
            {orders.map(order => (
                <OrderCard key={order.key} order={order}/>
            ))}
        </div>
    );
}

export default OrdersPage;
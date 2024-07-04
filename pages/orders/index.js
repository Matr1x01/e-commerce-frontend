import OrderCard from "@/components/OrderCard";
import {apiClient} from "@/services/api-client";
import {useEffect, useState} from "react";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiClient({
                    url: 'orders',
                    method: "GET",
                });
                setOrders(response.data.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
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
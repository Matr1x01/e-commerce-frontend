import Link from "next/link";

const OrderCard = ({ order }) => (
    <Link href={`/orders/${order.key}`}>
        <div className="bg-theme-cardBg text-theme-textOnDark p-8 mb-6 border border-gray-300 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-theme-textOnLight">Order ID: <span
                    className="text-theme-lightBg">{order.key}</span></h2>
                <span
                    className="text-lg font-semibold bg-theme-darkBg text-theme-textOnDark py-1 px-3 rounded">Total: ${order.total}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <span>Total Items: <strong>{order.total_items}</strong></span>
                <span>Date: <strong>{new Date(order.date).toLocaleDateString()}</strong></span>
                <span>Order Status: <strong>{order.order_status}</strong></span>
                <span>Payment Status: <strong>{order.payment_status}</strong></span>
                <span>Payment Method: <strong>{order.payment_method_name}</strong></span>
                <span>Delivery Method: <strong>{order.delivery_method_name}</strong></span>
            </div>
        </div>
    </Link>
);

export default OrderCard;
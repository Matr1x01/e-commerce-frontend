const OrderProductCard = ({ items }) => (
    <div>
        <h3 className="text-2xl font-bold mb-4">Ordered Items:</h3>
        {items.map((item, index) => (
            <div key={index} className="bg-theme-lightBg text-theme-textOnDark p-4 mb-3 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold">{item.product_name}</h4>
                <div className="grid grid-cols-2 gap-4">
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                    <span>Total: ${item.total}</span>
                </div>
            </div>
        ))}
    </div>
);

export default OrderProductCard;
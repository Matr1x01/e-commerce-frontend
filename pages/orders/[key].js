import {getCookie} from 'cookies-next';
import {addTokenToHeader} from "@/services/api-client";
import {cancelOrderRequest, getOrderRequest} from "@/api/orderRequests";
import {format} from 'date-fns';
import Image from "next/image";
import blankImage from '@/public/images/blank_product.jpg';
import {useRouter} from "next/router";
import {toast} from "react-toastify";

const OrderedProduct = ({orderedProduct}) => {
    const imageUrl = orderedProduct.product_image[0] ? orderedProduct.product_image[0] : blankImage;
    return <div className='flex flex-row p-4 m-2 bg-theme-cardBg rounded-xl justify-between items-center'>
        <Image src={imageUrl} alt={orderedProduct.product_name}
               width={100} height={100}
               className='h-24 w-24 object-cover m-4'/>
        <div className='text-lg font-semibold text-theme-textOnLight m-4'>{orderedProduct.product_name}</div>
        <div className='text-sm text-gray-500 m-4'>Price: {orderedProduct.price}</div>
        <div className='text-sm text-gray-500 m-4'>Quantity: {orderedProduct.quantity}</div>
        <div className='text-sm text-gray-500 m-4'>Total: {orderedProduct.total}</div>
    </div>
}

const OrderDetails = ({order}) => {
    const orderDate = format(new Date(order?.date), 'MM/dd/yyyy');
    const router = useRouter();
    const handleOrderCancel = async (orderKey) => {
        const response = await cancelOrderRequest({key: orderKey});
        if (response.error) {
            console.log(response.data);
            toast.error('Order cancel failed');
        } else {
            toast.success('Order cancelled successfully');
            router.push('/orders');
        }
    }
    return order ? (
        <div className='flex flex-row p-4'>
            <div className='w-2/3'>
                {
                    order.ordered_items.map((orderedProduct, index) => (
                        <OrderedProduct key={index} orderedProduct={orderedProduct}/>
                    ))
                }
            </div>
            <div className='w-1/3'>
                <div className='bg-theme-cardBg rounded-xl p-4 m-2 flex flex-col'>
                    <div className='text-xl font-semibold text-theme-textOnLight'>Order Summary</div>
                    <div className='text-lg text-gray-500'>Order Date: {orderDate}</div>
                    <div className='text-lg text-gray-500'>Order Status: {order.order_status}</div>
                    <div className='text-lg text-gray-500'>Discount: {order.discount}</div>
                    <div className='text-lg text-gray-500'>Tax: {order.tax}</div>
                    <div className='text-lg text-gray-500'>Sub Total: {order.sub_total}</div>
                    <div className='text-lg text-gray-500'>Total Amount: {order.total}</div>
                </div>
                <div className='bg-theme-cardBg rounded-xl p-4 m-2 flex flex-col'>
                    <div className='text-xl font-semibold text-theme-textOnLight'>Payment Information</div>
                    <div className='text-lg text-gray-500'>Payment Method: {order.payment_method}</div>
                    <div className='text-lg text-gray-500'>Payment Status: {order.payment_status}</div>
                </div>
                <div className='bg-theme-cardBg rounded-xl p-4 m-2 flex flex-col'>
                    <div className='text-xl font-semibold text-theme-textOnLight'>Delivery Information</div>
                    <div className='text-lg text-gray-500'>Delivery Method: {order.delivery_method}</div>
                    <div className='text-lg text-gray-500'>Address: {order.address}</div>
                </div>
                {
                    order.order_status === 'Pending'? (
                        <div className='bg-theme-cardBg rounded-xl p-4 m-2 flex flex-col'>
                            <div className='text-xl font-semibold text-theme-textOnLight'>Actions</div>
                            <button
                                className='bg-theme-darkBg text-theme-buttonText rounded-xl p-2 my-2'
                                onClick={()=>handleOrderCancel(order.key)}
                            >Cancel Order
                            </button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    ) : (
        <div className="text-gray-900 p-8">Order not found</div>
    );
};


export default OrderDetails;


export async function getServerSideProps({params, req, res}) {
    const {key} = params;
    const token = getCookie("authToken", {req, res});
    addTokenToHeader(token);
    const response = await getOrderRequest({orderUuid: key});
    if (response.error) {
        return {
            props: {
                order: null
            }
        }
    }

    return {
        props: {
            order: response.data.data
        }
    }

}
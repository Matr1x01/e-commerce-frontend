import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiClient } from "@/services/api-client";
import CartProductCard from "@/components/CartProductCard";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const CheckOut = () => {
    const router = useRouter();
    const [cart, setCart] = useState({
        items: [],
        subtotal_price: 0,
        total_items: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        address: "",
    });

    const paymentMethods = [{key:'cash_on_delivery',name:'Cash on Delivery'}];
    const [paymentMethod, setPaymentMethod] = useState(0);

    const deliveryMethods = [{key:'home_delivery',name:'Home Delivery'}];
    const [deliveryMethod, setDeliveryMethod] = useState(0);

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await apiClient({
                    url: 'cart',
                    method: "GET",
                });
                console.log(response.data.data);
                if (response.status !== 200 || response?.data?.data?.items.length === 0) {
                    console.error("Failed to fetch cart data:", response);
                    await router.replace('/cart');
                }
                setCart(response.data.data);

                const addressResponse = await apiClient({
                    url: 'addresses',
                    method: "GET",
                });
                if (addressResponse.status !== 200) {
                    console.error("Failed to fetch address data:", addressResponse);
                }
                setAddresses(addressResponse.data.data);
            } catch (error) {
                console.error("Failed to fetch cart data:", error);
            }
        };

        fetchCartData();
    }, []);


    const handleOrderRequest = async () => {
        if (!selectedAddress) {
            toast.error("Please select an address to place order");
        }
        const orderData= {
            payment_method: paymentMethods[paymentMethod].key,
            delivery_method: deliveryMethods[deliveryMethod].key,
            address: selectedAddress,
        }
        console.log(orderData);
        try {
            const response = await apiClient({
                url: 'orders/',
                method: "POST",
                data: orderData
            });
            if (response.status !== 200) {
                console.error("Failed to place order:", response);
            }
            toast.success("Order placed successfully");
            await router.push('/orders');
        } catch (error) {
            console.error("Failed to place order:", error);
            toast.error("Failed to place order");
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-theme-mainBg text-theme-textOnLight">
            <h2 className="text-3xl font-bold mb-6">Order Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>Subtotal: <span className="font-semibold">${cart.subtotal_price}</span></div>
                <div>Total Items: <span className="font-semibold">{cart.total_items}</span></div>
                <div>Discount: <span className="font-semibold">${cart.discount}</span></div>
                <div>Tax: <span className="font-semibold">${cart.tax}</span></div>
                <div>Shipping: <span className="font-semibold">${cart.shipping}</span></div>
                <div>Total: <span className="font-semibold">${cart.total}</span></div>
            </div>
            <div>Shipping Address: <span className="font-semibold">{cart.address}</span></div>
            {cart.items?.length > 0 ? (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Items:</h3>
                    <div className='space-y-4 m-8'>
                        {cart.items.map((item, index) => (
                            <CartProductCard key={index} product={item}/>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-8 text-center py-8 rounded-lg border border-theme-lightBg">
                    <p className="text-lg font-semibold">Your cart is empty.</p>
                    <p>Looks like you haven't made your choice yet.</p>
                </div>
            )}
            <div className='flex flex-col w-full mt-6 bg-theme-cardBg rounded-2xl p-4'>
                <h3 className='text-2xl font-bold'>Payment Method</h3>
                <div className='flex items-center mt-4'>
                    {
                        paymentMethods.map((method, index) => (
                            <div key={index} className='flex items-center mr-4'>
                                <input type='radio' name='payment' id={`payment${index}`} className='mr-2'
                                       checked={paymentMethod === index}
                                       onChange={() => setPaymentMethod(index)}
                                />
                                <label htmlFor={`payment${index}`}>{method.name}</label>
                            </div>
                        ))
                    }
                </div>

                <h3 className='text-2xl font-bold mt-6'>Delivery Method</h3>
                <div className='flex items-center mt-4'>
                    {
                        deliveryMethods.map((method, index) => (
                            <div key={index} className='flex items-center mr-4'>
                                <input type='radio' name='delivery' id={`delivery${index}`} className='mr-2'
                                       checked={deliveryMethod === index}
                                       onChange={() => setDeliveryMethod(index)}
                                />
                                <label htmlFor={`delivery${index}`}>{method.name}</label>
                            </div>
                        ))
                    }
                </div>
                <h3 className='text-2xl font-bold mt-6'>Select Address</h3>
                <select
                    className='p-4 w-full rounded-lg mt-4 border-1 border-gray-500'
                    onChange={(e) => setSelectedAddress(e.target.value)}
                >
                    <option value={null}>Select Address</option>
                    {
                        addresses.map((address, index) => (
                            <option key={index} value={address.uuid}>{address.address}</option>
                        ))
                    }
                </select>
                <button
                    className="bg-theme-darkBg text-theme-textOnDark px-4 py-2 rounded-lg mt-4 w-full text-2xl"
                    onClick={handleOrderRequest}
                >
                    Order
                </button>
            </div>
        </div>
    );
};

export default CheckOut;
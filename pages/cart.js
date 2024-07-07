import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiClient } from "@/services/api-client";
import CartProductCard from "@/components/CartProductCard";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const CartPage = () => {
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

    const [coupon, setCoupon] = useState('');

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await apiClient({
                    url: 'cart',
                    method: "GET",
                });
                setCart(response.data.data);
            } catch (error) {
                console.error("Failed to fetch cart data:", error);
            }
        };

        fetchCartData();
    }, []);

    // onDelete, onQuantityChange
    const handleQuantityChange = async (productSlug, quantityChange) => {
        try {
            const response = await apiClient({
                url: `cart/`,
                method: "POST",
                data: {
                    product: productSlug,
                    quantity: quantityChange
                }
            });
            setCart(response.data.data);
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    }

    const handleDelete = async (productSlug) => {
        try {
            const response = await apiClient({
                url: `cart`,
                method: "DELETE",
                data: {
                    product: productSlug
                }
            });
            setCart(response.data.data);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    }

    const handleApplyCoupon = async () => {
        try {
            const response = await apiClient({
                url: `apply-coupon/`,
                method: "POST",
                data: {
                    code: coupon
                }
            });
            if (response.status === 200){
                toast.success("Coupon applied successfully!")
                setCart(response.data.data.cart);
            }

        } catch (error) {
            toast.error("Failed to apply coupon");
            console.error("Failed to apply coupon:", error);
        }
    }
    return (
        <div className="max-w-4xl mx-auto p-4 bg-theme-mainBg text-theme-textOnLight">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>Subtotal: <span className="font-semibold">${cart.subtotal_price}</span></div>
                <div>Total Items: <span className="font-semibold">{cart.total_items}</span></div>
                <div>Discount: <span className="font-semibold">${cart.discount}</span></div>
                <div>Tax: <span className="font-semibold">${cart.tax}</span></div>
                <div>Shipping: <span className="font-semibold">${cart.shipping}</span></div>
                <div>Total: <span className="font-semibold">${cart.total}</span></div>
            </div>
            <div>Shipping Address: <span className="font-semibold">{cart.address}</span></div>
            <div className='flex flex-row'>
                <input type='text' placeholder="Enter your coupon code" className='p-3 m-2 w-full rounded-2xl' value={coupon} onChange={(e)=>setCoupon(e.target.value)}/>
                <button className='bg-theme-darkBg text-theme-textOnDark px-5 p-y m-2 rounded-2xl' onClick={handleApplyCoupon}>Apply</button>
            </div>
            {cart.items?.length > 0 ? (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Items:</h3>
                    <div className='space-y-4 m-8'>
                        {cart.items.map((item, index) => (
                            <CartProductCard key={index} product={item} onDelete={handleDelete}
                                             onQuantityChange={handleQuantityChange}/>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-8 text-center py-8 rounded-lg border border-theme-lightBg">
                    <p className="text-lg font-semibold">Your cart is empty.</p>
                    <p>Looks like you haven't made your choice yet.</p>
                </div>
            )}
            <div>
                <button
                    className="bg-theme-darkBg text-theme-textOnDark px-4 py-2 rounded-lg mt-4 w-full text-2xl" onClick={()=>router.push('/checkout')}>Proceed
                    to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
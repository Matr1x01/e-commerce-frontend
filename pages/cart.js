import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CartProductCard from "@/components/CartProductCard";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {deleteCartProductRequest, getCartRequest, postCartRequest} from "@/api/cartRequests";
import {applyCouponRequest} from "@/api/couponRequest";

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
        const fetchData = async () => {
            const response = await getCartRequest()
            if (response.error){
                toast.error("Failed to fetch cart data");
                return;
            }
            setCart(response.data.data)
        }
        fetchData();
    }, []);

    // onDelete, onQuantityChange
    const handleQuantityChange = async (productSlug, quantityChange) => {
        const response = await postCartRequest({productSlug: productSlug, quantity: quantityChange});
        if (response.error){
            toast.error("Failed to update product quantity in cart:"+response.data.message);
            return;
        }
        toast.success("Product quantity updated in cart")
        setCart(response.data.data);
    }

    const handleDelete = async (productSlug) => {
        const response = await deleteCartProductRequest({productSlug: productSlug});
        if (response.error){
            toast.error("Failed to delete product from cart:"+response.data.message);
            return;
        }
        toast.success("Product deleted from cart")
        setCart(response.data.data);
    }

    const handleApplyCoupon = async () => {
        const response = await applyCouponRequest({couponCode: coupon});
        if (response.error){
            toast.error("Failed to apply coupon:"+response.data.message);
            return;
        }
        toast.success("Coupon applied")
        setCart(response.data.data.cart);
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
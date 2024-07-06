import React from 'react';
import Image from 'next/image';

const CartProductCard = ({product, onDelete, onQuantityChange}) => {


    return (
        <div
            className="flex items-center justify-between my-4 bg-theme-cardBg text-theme-textOnLight shadow rounded-lg p-4">
            <div className="flex items-center">
                {product.product_images.length > 0 ? (
                    <Image src={product.product_images[0]} alt={product.product_name} width={100} height={100}
                           className="rounded"/>
                ) : (
                    <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                        <span>No Image</span>
                    </div>
                )}
                <div className="ml-4">
                    <h4 className="text-lg font-bold">{product.product_name}</h4>
                    <p>Price: ${product.product_selling_price}</p>
                    <p>Total Price: ${product.total_price}</p>
                </div>
            </div>
            {onQuantityChange ? (
                <div className="flex items-center mx-8">
                    <button
                        onClick={() => onQuantityChange(product.product_slug, -1)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 w-[40px]"
                    >
                        -
                    </button>
                    <span className="mx-4">{product.quantity_in_cart}</span>
                    <button
                        onClick={() => onQuantityChange(product.product_slug, 1)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 w-[40px]"
                    >
                        +
                    </button>
                </div>) : (<div>
                <p className='font-bold mx-4'>Quantity: {product.quantity_in_cart}</p>
            </div>)}
            {onDelete ? (
                <button
                    onClick={() => onDelete(product.product_slug)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
                >
                    Delete
                </button>
            ) : (<></>)}

        </div>
    );
};

export default CartProductCard;
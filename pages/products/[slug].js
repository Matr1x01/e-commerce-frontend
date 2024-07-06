import {useRouter} from 'next/router';
import {apiClient} from "@/services/api-client";
import Image from 'next/image';
import blankImage from '@/public/images/blank_product.jpg';
import Link from 'next/link';
import {toast} from "react-toastify";
import React from "react";

export default function ProductDetail({product}) {
    const router = useRouter();
    const {slug} = router.query;

    const [quantity, setQuantity] = React.useState(1);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddCart = async (slug,quantity) => {
        try{
            let res = await apiClient({
                method: "POST",
                url: "cart/",
                data: {
                    product: slug,
                    quantity: quantity
                }
            })
            if (res.status === 200) {
                toast.success("Successful!");
            }
        }catch (e) {
            toast.error("Failed to add to cart")
            console.log(e)
        }
    }

    return (
        <div className="p-4 flex flex-row">
            <div className="mt-4 w-1/2 flex justify-center">
                {product.images.length > 0 ? (
                    product.images.map((image, index) => (
                        <Image key={index} src={image} alt={product.name} width={500} height={500}/>
                    ))
                ) : (
                    <Image src={blankImage} alt="No image available" width={500} height={500}/>
                )}
            </div>
            <div className='w-1/2'>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <div className='flex flex-row w-full justify-start my-4'>
                    <Link href={`/brands/${product.brand?.slug}`}>
                        <span>Brand:<span
                            className="text-gray-900  cursor-pointer mx-2">{product.brand?.name}</span></span>
                    </Link>
                    <span className='mx-auto'>
                        Categories:
                        {product.category.map((cat, index) => (
                            <Link key={index} href={`/categories/${cat.slug}`}>
                                <span className="text-gray-900  mx-2 cursor-pointer">{cat.name}</span>|
                            </Link>
                        ))}
                    </span>
                </div>
                <p>{product.description}</p>
                <div className='flex flex-row text-3xl my-6'>
                    {product.has_discount ? (
                        <>
                            <span className="line-through mr-6">${product.selling_price}</span>
                            <span className="text-theme-textDanger ml-2">${product.discount_price}</span>
                        </>
                    ) : (
                        <span>${product.selling_price}</span>
                    )}
                </div>
                <div className="flex items-center mx-8 my-4">
                   <span className='mr-4'>Quantity:</span>
                    <button
                        onClick={() => setQuantity(quantity - 1)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 w-[40px]"
                    >
                        -
                    </button>
                    <span className="mx-4">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 w-[40px]"
                    >
                        +
                    </button>
                </div>
                <div>
                    <button className='text-xl px-4 py-2 text-theme-textOnDark bg-blue-500 rounded-2xl'
                            onClick={() => handleAddCart(product.slug, quantity)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {slug} = context.params;
    const response = await apiClient({
        url: `products/${slug}`,
        method: "GET",
    });

    if (response.status !== 200) {
        return {
            props: {
                product: null,
            },
        };
    }

    return {
        props: {
            product: response.data.data.product,
        },
    };
}
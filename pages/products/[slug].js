import {useRouter} from 'next/router';
import Image from 'next/image';
import blankImage from '@/public/images/blank_product.jpg';
import Link from 'next/link';
import React, {useEffect, useState} from "react";
import {getProduct} from "@/api/productRequests";
import {postCartRequest} from "@/api/cartRequests";
import {toast} from "react-toastify";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useWishlist} from "@/services/WishlistProvider";
import {deleteWishlistRequest, postWishlistRequest} from "@/api/wishlistRequests";

export default function ProductDetail({product}) {
    const router = useRouter();
    const {slug} = router.query;
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [isInWishlist, setIsInWishlist] = useState(() => wishlist.includes(slug));
    const [quantity, setQuantity] = React.useState(1);

    useEffect(( ) => {
        setIsInWishlist(wishlist.includes(slug));
    }, [wishlist, slug]);


    if (!product) {
        return <div>Product not found</div>;
    }
    const handleAddCart = async (slug, quantity) => {
        const response = await postCartRequest({productSlug: slug, quantity: quantity});
        if (response.error) {
            console.log(response.data);
            toast.error("Failed to add to cart");
        }
        toast.success("Added to cart");
    }

    const handleWishlistToggle = async () => {
        if (isInWishlist) {
            const response = await deleteWishlistRequest({ productSlug: slug });
            if (!response.error) {
                removeFromWishlist(slug);
            } else {
                toast.error('Failed to remove product from wishlist');
            }
        } else {
            const response = await postWishlistRequest({ productSlug: slug });
            if (!response.error) {
                addToWishlist(slug);
            } else {
                toast.error('Failed to add product to wishlist');
            }
        }
    };

    return (
        <div className="p-4 flex flex-row text-theme-textOnLight w-full max-w-[1720px] mx-auto">
            <div className="mt-4 w-1/2 flex justify-center">
                {product.images.length > 0 ? (
                    product.images.map((image, index) => (
                        <Image key={index} src={image} alt={product.name} width={500} height={500}/>
                    ))
                ) : (
                    <Image src={blankImage} alt="No image available" width={500} height={500} style={{objectFit: "contain"}}/>
                )}
            </div>
            <div className='w-1/2'>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <div className='flex flex-col w-full my-4 gap-2'>
                        <span>Brand:
                            <span
                                className="text-gray-900  cursor-pointer mx-2">
                            <Link href={`/brands/${product.brand?.slug}`}>{product.brand?.name}</Link>
                            </span>
                        </span>

                    <span>
                        Categories:
                        {product.category.map((cat, index) => (
                            <Link key={index} href={`/categories/${cat.slug}`}>
                                <span className="text-gray-900  mx-2 cursor-pointer">{cat.name}</span>|
                            </Link>
                        ))}
                    </span>
                </div>
                <div className='w-full flex flex-row items-center border-b-2 border-theme-textOnLight'>
                    <button onClick={handleWishlistToggle} className="p-2">
                        {isInWishlist ? <FaHeart color="red" size={24}/> : <FaRegHeart size={24}/>}
                    </button>
                    <span>Add to wishlist</span>
                </div>
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
                <p>{product.description}</p>
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
    const response = await getProduct(slug);
    if (response.error) {
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
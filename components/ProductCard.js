import Image from 'next/image';
import blankImage from '@/public/images/blank.png';
import Link from "next/link";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {postCartRequest} from "@/api/cartRequests";
import {useWishlist} from "@/services/WishlistProvider";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {deleteWishlistRequest, postWishlistRequest} from "@/api/wishlistRequests";
import {useEffect, useState} from "react";

const handleAddCart = async (slug) => {
    const response = await postCartRequest({productSlug: slug, quantity: 1});
    if (!response.error) {
        toast.success('Product added to cart successfully');
        return;
    }
    toast.error('Failed to add product to cart:' + response.data.message);
}
const ProductCard = ({name, price, has_discount, discount_price, image, slug}) => {
    let image_src = image || blankImage;
    const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();
    const [isInWishlist, setIsInWishlist] = useState(() => wishlist.includes(slug));

    useEffect(() => {
        setIsInWishlist(wishlist.includes(slug));
    }, [wishlist, slug]);

    const handleWishlistToggle = async () => {
        if (isInWishlist) {
            const response = await deleteWishlistRequest({productSlug: slug});
            if (!response.error) {
                removeFromWishlist(slug);
            } else {
                toast.error('Failed to remove product from wishlist');
            }
        } else {
            const response = await postWishlistRequest({productSlug: slug});
            if (!response.error) {
                addToWishlist(slug);
            } else {
                toast.error('Failed to add product to wishlist');
            }
        }
    };
    return (

        <div className="border-0 p-4 rounded-lg w-[340px] h-[380px] bg-theme-cardBg text-theme-textOnLight">
            <Link href={`/products/${slug}`}>
                <div className='w-full h-[200px] overflow-hidden rounded-lg'>
                    <Image src={image_src} alt={name} width={500} height={500} unoptimized
                           style={{
                               objectFit: 'cover',
                           }}/>
                </div>
                <h3 className="pt-2 text-lg font-bold my-2 h-[65px] overflow-hidden">{name}</h3>
                <div>
                    {
                        has_discount ? (
                            <div className="flex justify-between items-center">
                                <span className="line-through text-gray-500">${price}</span>
                                <span className="text-theme-textDanger font-bold">${discount_price}</span>
                            </div>
                        ) : (
                            <span>${price}</span>
                        )
                    }
                </div>
            </Link>
            <div className='w-full flex flex-row justify-between'>
                <div className='my-2'>
                    <button onClick={() => handleAddCart(slug)}
                            className='text-l px-2 py-1 text-theme-textOnDark bg-theme-darkBg rounded-2xl'>
                        Add to Cart
                    </button>
                </div>
                <button onClick={handleWishlistToggle} className="wishlist-button">
                    {isInWishlist ? <FaHeart color="red"/> : <FaRegHeart/>}
                </button>
            </div>
        </div>

    );
};

export default ProductCard;
import blankImage from "@/public/images/blank.png";
import Image from "next/image";

const WishListProductCard = ({ product, deleteWishlistProduct }) => {
    const imgSrc = product.product_images.length > 0 ? product.product_images[0] : blankImage;
    return (
        <div className="flex flex-row items-center justify-between border-b bg-theme-cardBg p-8 rounded-2xl text-theme-textOnLight">
            <div className="flex flex-row items-center">
                <Image unoptimized src={imgSrc} alt={product.product_name} className="mr-4" width={100} height={100} />
                <div className="ml-4">
                    <p className="text-lg font-semibold">{product.product_name}</p>
                    <p className="text-gray-500">Price: ${product.product_selling_price}</p>
                </div>
            </div>
            <button onClick={()=>deleteWishlistProduct(product.product_slug)} className="text-red-500">Delete</button>
        </div>
    )
}

export default WishListProductCard;
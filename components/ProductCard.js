import Image from 'next/image';
import blankImage from '@/public/images/blank_product.jpg';
import Link from "next/link";
import {apiClient} from "@/services/api-client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const handleAddCart = async (slug) => {
    try{
        let res = await apiClient({
            method: "POST",
            url: "cart/",
            data: {
                product: slug,
                quantity: 1
            }
        })
        if (res.status === 200) {
            toast.success("Successful!");
        }
    }catch (e) {
        console.log(e)
    }
}
const ProductCard = ({name, price, has_discount, discount_price, image, slug}) => {
    let image_src = image ? image: blankImage;
    return (

        <div className="border-0 p-4 rounded-lg w-[340px] h-[380px] bg-theme-cardBg textOnLight">
            <Link href={`/products/${slug}`}>
            <div className='w-full h-[200px] overflow-hidden rounded-lg'>
                <Image src={image_src} alt={name} width={500} height={500} style={{
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
            <div className='w-full justify-start flex my-2'>
                <button onClick={()=>handleAddCart(slug)} className='text-l px-2 py-1 text-theme-textOnDark bg-theme-darkBg rounded-2xl'>Add to Cart</button>
            </div>
        </div>

    );
};

export default ProductCard;
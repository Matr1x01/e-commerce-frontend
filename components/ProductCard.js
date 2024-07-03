import Image from 'next/image';
import blankImage from '@/public/images/blank_product.jpg';
const ProductCard = ({name, price, has_discount, discount_price, image, slug}) => {
    let image_src = image ? image: blankImage;
    return (
        <div className="border-0 p-4 rounded-lg w-[300px] h-[300px] bg-gray-900">
            <div className='w-full h-[200px] overflow-hidden rounded-lg'>
                <Image src={image_src} alt={name} width={500} height={500} style={{
                    objectFit: 'cover',
                }}/>
            </div>
            <h3 className="text-lg font-bold">{name}</h3>
            <div>
                {
                    has_discount ? (
                        <div className="flex justify-between items-center">
                            <span className="line-through text-gray-500">${price}</span>
                            <span className="text-red-500 font-bold">${discount_price}</span>
                        </div>
                    ) : (
                        <span>${price}</span>
                    )
                }
            </div>
        </div>
    );
};

export default ProductCard;
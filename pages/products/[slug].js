import {useRouter} from 'next/router';
import {apiClient} from "@/services/api-client";
import Image from 'next/image';
import blankImage from '@/public/images/blank_product.jpg';
import Link from 'next/link';

export default function ProductDetail({product}) {
    const router = useRouter();
    const {slug} = router.query;

    if (!product) {
        return <div>Product not found</div>;
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
                        <span>Brand:<span className="text-blue-100  cursor-pointer mx-2">{product.brand?.name}</span></span>
                    </Link>
                    <span className='mx-auto'>
                        Categories:
                            {product.category.map((cat, index) => (
                                <Link key={index} href={`/categories/${cat.slug}`}>
                                    <span className="text-blue-100  mx-2 cursor-pointer">{cat.name}</span>|
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
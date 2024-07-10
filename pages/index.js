'use client'
import ProductCard from "@/components/ProductCard";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';
import {getProducts} from "@/api/productRequests";
const Home =  ({productData}) => {
    const router = useRouter();
    let meta = productData.data.meta;
    const [currentPage, setCurrentPage] = useState(parseInt(meta?.current_page) || 1);
    const totalPages = parseInt(meta?.total_pages) || 1;
    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`?page=${page}`);
    };
    return <div>
        <div className='flex flex-row flex-wrap justify-start p-8'>
            {
                productData.data.items.map(
                    (product,i)=>{
                        return <div className='m-2' key={i}>
                            <ProductCard
                                image={product.image}
                                discount_price={product.discount_price}
                                price={product.selling_price}
                                has_discount={product.has_discount}
                                name={product.name}
                                slug={product.slug}
                            />
                        </div>
                    }
                )
            }
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
}
export const getServerSideProps = async ({query}) =>{
    const perPage = query.per_page || 5;
    const page = query.page || 1;
    const response = await getProducts({ page: page,  per_page: perPage})
    if (response.error){
        return {
            props: {
                productData: { }
            }
        }
    }
    return {
        props: {
            productData: response.data
        }
    }
}
export default Home;
'use client'
import ProductCard from "@/components/ProductCard";
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Pagination from '@/components/Pagination';
import {getProducts} from "@/api/productRequests";

const Home = ({productData}) => {
    const router = useRouter();
    let meta = productData.data.meta;
    const [currentPage, setCurrentPage] = useState(parseInt(meta?.current_page) || 1);
    const totalPages = parseInt(meta?.total_pages) || 1;
    const sortOptions = [
        {value: 'all', label: 'All'},
        {value: 'low_to_high', label: 'Low to High'},
        {value: 'high_to_low', label: 'High to Low'},
    ]
    const perPageOptions = [
        {value: 5, label: 5},
        {value: 10, label: 10},
        {value: 15, label: 15}
    ]

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`?page=${page}`);
    };

    const handleSortChange = (e) => {
        const newSortValue = e.target.value;
        router.push(`?page=${currentPage}&sort_by=${newSortValue}&per_page=${selectedPerPage}`);
    };

    const handlePerPageChange = (e) => {
        const newPerPageValue = e.target.value;
        router.push(`?page=1&sort_by=${selectedSort}&per_page=${newPerPageValue}`);
    };

    const [selectedSort, setSelectedSort] = useState('all');
    const [selectedPerPage, setSelectedPerPage] = useState(5);

    useEffect(() => {
        const {sort_by, per_page} = router.query;
        if (sort_by) setSelectedSort(sort_by);
        if (per_page) setSelectedPerPage(parseInt(per_page));
    }, [router.query]);

    return <div>
        <div className='flex flex-row flex-wrap justify-start p-8'>
            <div className='p-2 flex flex-row w-full rounded-2xl text-theme-textOnLight'>
                <label className='p-2'>Sort By:</label>
                <select className='p-2 rounded-lg w-40' name='sort_by' onChange={handleSortChange} value={selectedSort}>
                    {
                        sortOptions.map((option, i) => {
                            return <option key={i} value={option.value}>{option.label}</option>
                        })
                    }
                </select>
                <label className='p-2'>Show:</label>
                <select className='p-2 rounded-lg w-20' name='sort_by' onChange={handlePerPageChange}
                        value={selectedPerPage}>
                    {
                        perPageOptions.map((option, i) => {
                            return <option key={i} value={option.value}>{option.label}</option>
                        })
                    }
                </select>
            </div>
            {
                productData.data.items.map(
                    (product, i) => {
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
    </div>
}
export const getServerSideProps = async ({query}) => {
    const {page = 1, per_page = 5, sort_by = 'all'} = query;
    const response = await getProducts({page: page, per_page: per_page})
    if (response.error) {
        return {
            props: {
                productData: {
                    data: {
                        meta: {}, items: []
                    }
                }
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
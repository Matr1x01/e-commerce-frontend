import {useRouter} from 'next/router';
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import {getBrand} from "@/api/productRequests";
import {useEffect, useState} from "react";
import {sortOptions} from "@/utils/sort_options";
import {perPageOptions} from "@/utils/per_page_options";

export default function BrandPage({brandData}) {
    const router = useRouter();
    const {brand, products, meta} = brandData.data;
    const [currentPage, setCurrentPage] = useState(parseInt(meta?.current_page) || 1);
    const totalPages = parseInt(meta?.total_pages) || 1;
    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`/brands/${router.query.slug}?page=${page}`);
    };

    const handleSortChange = (e) => {
        const newSortValue = e.target.value;
        router.push(`/brands/${router.query.slug}?page=${currentPage}&sort_by=${newSortValue}&per_page=${selectedPerPage}`);
    };

    const handlePerPageChange = (e) => {
        const newPerPageValue = e.target.value;
        router.push(`/brands/${router.query.slug}?page=1&sort_by=${selectedSort}&per_page=${newPerPageValue}`);
    };

    const [selectedSort, setSelectedSort] = useState('');
    const [selectedPerPage, setSelectedPerPage] = useState(5);

    useEffect(() => {
        const {sort_by, per_page} = router.query;
        if (sort_by) setSelectedSort(sort_by);
        if (per_page) setSelectedPerPage(parseInt(per_page));
    }, [router.query]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <div className='w-full flex flex-col text-center my-4'>
                <h1 className="text-4xl font-bold mb-4 text-theme-textOnLight">{brand.name}</h1>
                <p className="text-lg font-light text-gray-600">{brand.description}</p>
            </div>
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
            <div className='flex flex-row flex-wrap justify-start mt-8'>
                {products.map((product, i) => (
                    <div className='m-2' key={i}>
                        <ProductCard
                            image={product.image}
                            discount_price={product.discount_price}
                            price={product.selling_price}
                            has_discount={product.has_discount}
                            name={product.name}
                            slug={product.slug}
                        />
                    </div>
                ))}
            </div>
            <Pagination currentPage={meta.current_page} totalPages={meta.total_pages} onPageChange={handlePageChange}/>
        </div>
    );
}


export async function getServerSideProps({params, query}) {
    const {page = 1, per_page = 5, sort_by = ""} = query;
    console.log(page, per_page, sort_by);
    const response = await getBrand({
        slug: params.slug,
        query: {page: page, per_page: per_page, sort_by: sort_by}
    });

    if (response.error) {
        return {notFound: true};
    }

    return {
        props: {
            brandData: response.data,  // Assuming the API returns total_pages in the meta
        },
    };
}


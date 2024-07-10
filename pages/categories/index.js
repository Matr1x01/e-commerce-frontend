'use client'
import CategoryCard from "@/components/CategoryCard";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';
import {getCategories} from "@/api/productRequests";

const Categories = ({ categoriesData }) => {
    const router = useRouter();
    let meta = categoriesData.meta;
    const [currentPage, setCurrentPage] = useState(parseInt(meta?.current_page) || 1);
    const totalPages = parseInt(meta?.total_pages) || 1;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`?page=${page}`);
    };

    return (
        <div>
            <div className='flex flex-row flex-wrap justify-start p-8'>
                {categoriesData.items.map((category, i) => (
                    <div className='m-2' key={i}>
                        <CategoryCard
                            name={category.name}
                            slug={category.slug}
                        />
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export const getServerSideProps = async ({ query }) => {
    const perPage = query.per_page || 5;
    const page = query.page || 1;
    const response = await getCategories({query:{page: page, per_page: perPage}});
    if (response.error) {
        return {
            props: {
                categoriesData: {
                    items: [],
                    meta: {}
                }
            }
        };
    }

    return {
        props: {
            categoriesData: response.data.data
        }
    };
};

export default Categories;
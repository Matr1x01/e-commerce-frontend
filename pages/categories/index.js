'use client'
import { apiClient } from "@/services/api-client";
import CategoryCard from "@/components/CategoryCard";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';

const Categories = ({ categoriesData }) => {
    const router = useRouter();
    let meta = categoriesData.data.meta;
    const [currentPage, setCurrentPage] = useState(parseInt(meta?.current_page) || 1);
    const totalPages = parseInt(meta?.total_pages) || 1;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`?page=${page}`);
    };

    return (
        <div>
            <div className='flex flex-row flex-wrap justify-start p-8'>
                {categoriesData.data.items.map((category, i) => (
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
    const response = await apiClient({
        url: 'category', // Adjust the endpoint to where your categories data is located
        method: "GET",
        params: {
            page: page,
            per_page: perPage
        }
    });

    if (response.status !== 200) {
        return {
            props: {
                categoriesData: {
                    items: [],
                    meta: {} // Assuming your API returns pagination info in a meta object
                }
            }
        };
    }

    return {
        props: {
            categoriesData: response.data
        }
    };
};

export default Categories;
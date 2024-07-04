'use client'
import { apiClient } from "@/services/api-client";
import BandCard from "@/components/BrandCard"; // Assuming you have a BandCard component
import { useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';

const Bands = ({ bandsData }) => {
    const router = useRouter();
    let meta = bandsData.data.meta;
    const [currentPage, setCurrentPage] = useState(parseInt(meta?.current_page) || 1);
    const totalPages = parseInt(meta?.total_pages) || 1;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.push(`?page=${page}`);
    };

    return (
        <div>
            <div className='flex flex-row flex-wrap justify-start p-8'>
                {bandsData.data.items.map((band, i) => (
                    <div className='m-2' key={i}>
                        <BandCard
                            name={band.name}
                            image={band.image}
                            slug={band.slug}
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
        url: 'brands', // Adjust the endpoint to where your bands data is located
        method: "GET",
        params: {
            page: page,
            per_page: perPage
        }
    });

    if (response.status !== 200) {
        return {
            props: {
                bandsData: {}
            }
        };
    }

    return {
        props: {
            bandsData: response.data
        }
    };
};

export default Bands;
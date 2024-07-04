import { apiClient } from "@/services/api-client";
import { useRouter } from 'next/router';
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination"; // Placeholder image for products without an image

export default function CategoryPage({ categoryData }) {
    const router = useRouter();
    const { category, products, meta } = categoryData.data;

    const handlePageChange = (page) => {
        router.push(`/categories/${category.slug}?page=${page}`);
    };

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <div className='w-full flex flex-col text-center my-4'>
                <h1 className="text-4xl font-bold mb-4 text-gray-50">{category.name}</h1>
                <p className="text-lg font-light text-gray-300">{category.description}</p>
            </div>
            <div className='flex flex-row flex-wrap justify-start mt-8'>
                {products.map((product, i) => {
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
                })}
            </div>
            <Pagination currentPage={meta.current_page} totalPages={meta.total_pages} onPageChange={handlePageChange} />
        </div>
    );
}

export async function getServerSideProps({params, query}) {
    const page = query.page || 1; // Default to page 1 if no page query parameter is provided
    const response = await apiClient({
        url: `category/${params.slug}`,
        method: "GET",
        params: {
            page, // Add the page to the request parameters
        },
    });

    if (response.status !== 200) {
        return { notFound: true };
    }

    return {
        props: {
            categoryData: response.data,  // Assuming the API returns total_pages in the meta
        },
    };
}
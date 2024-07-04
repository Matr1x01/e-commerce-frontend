'use client'
import { apiClient } from "@/services/api-client";
import ProductCard from "@/components/ProductCard";
const Products =  ({productData}) => {
  return <div>
    <div className='flex flex-row flex-wrap justify-start p-8'>
      {
        productData.items.map(
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
      <div>
        make a pagination here
      </div>
    </div>
  </div>
}
export const getServerSideProps = async ({query}) =>{
  const perPage = query.per_page || 5;
    const page = query.page || 1;
  const response = await apiClient({
    url:'products',
    method: "GET",
    params: {
      page: page,
      per_page: perPage
    }
  })
  if (response.status !== 200){
    return {
      props: {
        productData: {
          items: []
        }
      }
    }
  }
  return {
    props: {
      productData: response.data.data
    }
  }
}
export default Products;
import {deleteWishlistRequest, getWishlistRequest} from "@/api/wishlistRequests";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import WishListProductCard from "@/components/WishListProductCard";


const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const router = useRouter();
    const handleDelete = async (slug) => {
        const response = await deleteWishlistRequest({productSlug: slug});
        if (response.error) {
            toast.error("Failed to delete product from wishlist:" + response.data.message);
            return;
        }
        toast.success("Product deleted from wishlist")
        router.reload();
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getWishlistRequest()
            if (response.error) {
                toast.error("Failed to fetch wishlist data");
                return;
            }
            setWishlist(response.data.data.items)
        }
        fetchData();
    }, []);
    return (
        <div className="container mx-auto py-5">
            <h1 className="text-2xl font-semibold text-theme-textOnLight">Wishlist</h1>
            <div className="mt-5">
                {wishlist.map((product) => (
                    <div key={product.slug} className='my-4'>
                        <WishListProductCard product={product} deleteWishlistProduct={handleDelete}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WishlistPage;
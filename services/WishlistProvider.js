import React, {createContext, useContext, useEffect, useState} from 'react';
import {getWishlistRequest} from "@/api/wishlistRequests";
import {deleteCookie} from "cookies-next";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect( () => {
        const fetchedWishlist = async () => {
            const response = await getWishlistRequest();
            if (response.error) {
                if (response.status === 401) {
                    deleteCookie('authToken');
                    return;
                }
                setWishlist([]);
                return;
            }
            setWishlist(response.data.data.items.map(item => item.product_slug));
        }
        fetchedWishlist();
    }, []);

    const setWishlistItems = (newWishlist) => {
        setWishlist(newWishlist);
    };
    const addToWishlist = (item) => {
        setWishlist((currentWishlist) => [...currentWishlist, item]);
    };

    const removeFromWishlist = (del_item) => {
        setWishlist((currentWishlist) => currentWishlist.filter(item => item !== del_item));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, setWishlistItems }}>
            {children}
        </WishlistContext.Provider>
    );
};
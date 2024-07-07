import React, { useState, useEffect } from 'react';
import { apiClient } from "@/services/api-client";
import {toast} from "react-toastify";
import AddressCard from "@/components/AddressCard";

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        date_of_birth: "",
        gender: "",
    });

    const [addresses, setAddresses] = useState([]); // Initialize addresses with empty array

    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        phone: "",
        date_of_birth: "",
        gender: "",
    });

    const [newAddress, setNewAddress] = useState({
        address: "",
        area: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleAddressDelete = async (addressUuid) => {
        try {
            const response = await apiClient({
                url: `addresses/${addressUuid}/`,
                method: "DELETE",
            });
            if (response.status === 200) {
                setAddresses(addresses.filter((address) => address.uuid !== addressUuid));
                toast.success("Address deleted successfully");
            } else {
                toast.error("Failed to delete address");
                console.error("Failed to delete address:", response);
            }
        } catch (error) {
            console.error("Failed to delete address:", error);
            toast.error("Failed to delete address");
        }
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient({
                url: 'addresses/',
                method: "POST",
                data: newAddress,
            });
            if (response.status === 201) {
                setAddresses([...addresses, response.data.data]);
                toast.success("Address added successfully");
                setNewAddress({
                    address: "",
                    area: "",
                    city: "",
                    state: "",
                    country: "",
                    postal_code: "",
                });
            } else {
                toast.error("Failed to add address");
                console.error("Failed to add address:", response);
            }
        } catch (error) {
            console.error("Failed to add address:", error);
            toast.error("Failed to add address");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient({
                    url: 'profile',
                    method: "GET",
                });
                if (response.status !== 200) {
                    console.error("Failed to fetch profile data:", response);
                    return;
                }
                setUserData(response.data.data);
                setEditData(response.data.data); // Initialize editData with fetched data

                const addressResponse = await apiClient({
                    url: 'addresses',
                    method: "GET",
                });
                if (addressResponse.status !== 200) {
                    console.error("Failed to fetch address data:", addressResponse);
                    return;
                }
                setAddresses(addressResponse.data.data);

            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            }
        };
        fetchData();
    }, []);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await apiClient({
                url: 'profile/update',
                method: "PUT",
                data: {
                    name: editData.name,
                    phone: editData.phone,
                    date_of_birth: editData.date_of_birth,
                    gender: editData.gender
                }
            });
            setUserData(response.data.data);
            setEditMode(false);
            toast.success("Profile updated successfully")
        }catch (error) {
            console.error("Failed to update profile data:", error);
        }
    };
    const userDetailKeys = [
        {key:"name", name:"Name"},
        {key:"phone", name:"Phone"},
        {key:"date_of_birth", name:"Date of Birth"},
        {key:"gender", name: "Gender"}
    ];
    const input_classes = "p-2 my-2 w-full rounded-md px-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50  text-gray-800 placeholder-gray-500";
    return (
        <div className='flex flex-row w-full m-4'>
            <div className="profile-page flex flex-col items-center w-1/2 p-6">
                <h1 className="text-3xl font-bold text-center mb-4 text-theme-textOnLight">Profile Details</h1>
                {editMode ? (
                    <form onSubmit={handleSubmit}
                          className="user-details w-full bg-theme-cardBg shadow rounded-lg p-4 divide-y divide-gray-200">
                        <input
                            className={input_classes}
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            className={input_classes}
                            name="phone"
                            disabled
                            value={editData.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            className={input_classes}
                            type="date"
                            name="date_of_birth"
                            value={editData.date_of_birth}
                            onChange={handleInputChange}
                        />
                        <select
                            className={input_classes}
                            name="gender"
                            value={editData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        <div className='flex flex-row justify-end'>
                            <button onClick={handleEditToggle}
                                    className="text-theme-textOnLight bg-theme-mainBg border-theme-textOnLight border-2 p-1 rounded-2xl w-[80px] my-2 mr-2">
                                Cancel
                            </button>
                            <button type="submit"
                                    className="text-theme-textOnDark bg-blue-900 p-3 rounded-2xl w-[80px] my-2">
                                Submit
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="user-details w-full bg-theme-cardBg shadow rounded-lg p-4 divide-y divide-gray-400 text-theme-textOnLight">
                        {userDetailKeys.map((items, i) => (
                            <div key={i} className="flex items-center py-2">
                                <span className="text-theme-textOnlight font-bold mr-2 w-[200px]">{items.name}:</span>
                                <span className="text-theme-textOnlight w-full">{userData[items.key]}</span>
                            </div>
                        ))}
                        <div className='flex flex-row justify-end'>
                            <button onClick={handleEditToggle}
                                    className="text-theme-textOnDark bg-blue-900 p-3 rounded-2xl w-[80px] my-2">
                                Edit
                            </button>
                        </div>
                    </div>

                )}
            </div>
            <div className='w-1/2 p-6'>
                <h1 className="text-3xl font-bold text-center mb-4 text-theme-textOnLight">Your Addresses</h1>
                <div className='flex flex-col bg-theme-cardBg shadow rounded-lg p-4 divide-y divide-gray-400'>
                    {
                        addresses && addresses.map((address, i) => (
                            <AddressCard address={address} key={address.uuid} onDelete={handleAddressDelete}/>
                        ))
                    }
                </div>
                <div className="address-form p-4 shadow-lg rounded-lg bg-theme-cardBg mt-6">
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <input
                            className="text-theme-textOnLight w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="address"
                            value={newAddress.address}
                            onChange={handleAddressChange}
                            placeholder="Address"
                        />
                        <input
                            className="text-theme-textOnLight w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="area"
                            value={newAddress.area}
                            onChange={handleAddressChange}
                            placeholder="Area"
                        />
                        <input
                            className="text-theme-textOnLight w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="city"
                            value={newAddress.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                        />
                        <input
                            className="text-theme-textOnLight w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="state"
                            value={newAddress.state}
                            onChange={handleAddressChange}
                            placeholder="State"
                        />
                        <input
                            className="text-theme-textOnLight w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="country"
                            value={newAddress.country}
                            onChange={handleAddressChange}
                            placeholder="Country"
                        />
                        <input
                            className="text-theme-textOnLight w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="postal_code"
                            value={newAddress.postal_code}
                            onChange={handleAddressChange}
                            placeholder="Postal Code"
                        />
                        <button type="submit"
                                className="submit-btn bg-theme-darkBg text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
                            Add Address
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;


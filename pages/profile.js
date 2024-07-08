import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import AddressCard from "@/components/AddressCard";
import {createAddressRequest, deleteAddressRequest, getAddressesRequest} from "@/api/addressRequests";
import {getProfileRequest, updateProfileRequest} from "@/api/profileRequests";

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
        const {name, value} = e.target;
        setNewAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleAddressDelete = async (addressUuid) => {
        const response = await deleteAddressRequest({addressUuid});
        if (response.error) {
            console.log(response);
            toast.error("Failed to delete address:" + response.message);
        } else {
            setAddresses(addresses.filter((address) => address.uuid !== addressUuid));
            toast.success("Address deleted successfully");
        }
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        const response = await createAddressRequest({
            address: newAddress.address,
            area: newAddress.area,
            city: newAddress.city,
            state: newAddress.state,
            country: newAddress.country,
            postalCode: newAddress.postal_code
        })
        if (response.error) {
            toast.error("Failed to add address: " + response.data.message);
        } else {
            setAddresses([...addresses, response.data.data]);
            setNewAddress({
                address: "",
                area: "",
                city: "",
                state: "",
                country: "",
                postal_code: "",
            });
            setEditMode(false);
            toast.success("Address added successfully");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const profileResponse = await getProfileRequest();

            if (profileResponse.error) {
                toast.error("Failed to fetch profile data");
            } else {
                setUserData(profileResponse.data.data);
                setEditData(profileResponse.data.data);
            }

            const addressResponse = await getAddressesRequest();
            if (addressResponse.error) {
                toast.error("Failed to fetch addresses");
            } else {
                setAddresses(addressResponse.data.data);
            }
        };
        fetchData();
    }, []);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateProfileRequest({
                name: editData.name,
                date_of_birth: editData.date_of_birth,
                gender: editData.gender
            }
        );
        if (response.error) {
            toast.error("Failed to update profile: " + response.message);
        } else {
            setUserData(editData);
            setEditMode(false);
            toast.success("Profile updated successfully");
        }
    };
    const userDetailKeys = [
        {key: "name", name: "Name"},
        {key: "phone", name: "Phone"},
        {key: "date_of_birth", name: "Date of Birth"},
        {key: "gender", name: "Gender"}
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
                    <div
                        className="user-details w-full bg-theme-cardBg shadow rounded-lg p-4 divide-y divide-gray-400 text-theme-textOnLight">
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


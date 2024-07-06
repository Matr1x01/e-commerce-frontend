// {
//     "address": "Dhanmondi, Dhaka",
//     "uuid": "6fb07f8d-b39c-498c-9eb8-ec69d562b145",
//     "area": "",
//     "city": "Dhaka",
//     "state": null,
//     "country": "Bangladesh",
//     "postal_code": "1209"
// }

const AddressCard = ({ address }) => {
    return (
        <div className='flex flex-col p-2 '>
            <span className='text-theme-textOnLight font-bold'>{address.address}</span>
            <span className='text-theme-textOnLight'>{address.area}</span>
            <span className='text-theme-textOnLight'>{address.city}, {address.state} - {address.postal_code}</span>
        </div>
    )
}

export default AddressCard
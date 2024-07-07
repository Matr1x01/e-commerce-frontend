// {
//     "address": "Dhanmondi, Dhaka",
//     "uuid": "6fb07f8d-b39c-498c-9eb8-ec69d562b145",
//     "area": "",
//     "city": "Dhaka",
//     "state": null,
//     "country": "Bangladesh",
//     "postal_code": "1209"
// }

const AddressCard = ({ address, onDelete }) => {
    return (
        <div className='flex flex-row p-2 w-full'>
            <div className='flex flex-col w-full'>
                <span className='text-theme-textOnLight font-bold'>{address.address}</span>
                <span className='text-theme-textOnLight'>{address.area}</span>
                <span className='text-theme-textOnLight'>{address.city}, {address.state} - {address.postal_code}</span>
            </div>
            <button className='m-3 p-2 bg-theme-textDanger text-theme-textOnDart rounded-md w-[80px]' onClick={()=>onDelete(address.uuid)}>Delete</button>
        </div>
    )
}

export default AddressCard
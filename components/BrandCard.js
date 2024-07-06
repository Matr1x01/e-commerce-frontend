import Image from 'next/image';
import blankImage from '@/public/images/blank.png';
import Link from "next/link"; // Ensure you have a placeholder image for bands without an image

const BandCard = ({ name, image, slug }) => {
    let imageSrc = image ? image : blankImage;
    return (
        <Link href={`/brands/${slug}`}>
            <div className="border-0 p-4 rounded-lg w-[340px] h-[280px] bg-theme-cardBg text-theme-textOnLight">
                <div className='w-full h-[200px] overflow-hidden rounded-lg'>
                    <Image src={imageSrc} alt={name} width={500} height={500} style={{ objectFit: 'cover' }}/>
                </div>
                <h3 className="text-2xl w-full text-center font-bold my-2">{name}</h3>
            </div>
        </Link>
    );
};

export default BandCard;
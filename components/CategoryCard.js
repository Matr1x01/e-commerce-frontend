import blankImage from '@/public/images/blank.png';
import Link from "next/link"; // Placeholder image for categories without an image

const CategoryCard = ({ name, slug }) => {
    return (
        <Link href={`/categories/${slug}`}>
            <div className="border-0 p-4 rounded-lg w-[340px] bg-theme-cardBg text-gray-200">
                <div className='w-full h-[200px] overflow-hidden rounded-lg bg-theme-darkBg flex items-center justify-center'>
                    <span className="text-xl font-bold text-white">{name}</span>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
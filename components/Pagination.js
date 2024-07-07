const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center space-x-2">
            {pages.map(((page,i) => (
                <button
                    key={i}
                    className={`px-4 py-2 ${currentPage === page ? 'bg-theme-darkBg text-theme-textOnDark' : 'bg-theme-lightBg text-theme-textOnLight'} rounded`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            )))}
        </div>
    );
};

export default Pagination;
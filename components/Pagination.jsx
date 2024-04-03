const Pagination = ({ totalItems, page, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        disabled={page === 1}
        onClick={() => handleChangePage(page - 1)}
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => handleChangePage(page + 1)}
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;

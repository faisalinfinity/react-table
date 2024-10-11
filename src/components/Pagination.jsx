import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { VISIBLE_PAGE_NUMBERS } from "../../constants/constants";

const Pagination = ({ page, totalPages, handlePageChange }) => {
  const renderPageNumbers = () => {
    let startPage = Math.max(1, page - Math.floor(VISIBLE_PAGE_NUMBERS / 2));
    let endPage = Math.min(totalPages, startPage + VISIBLE_PAGE_NUMBERS - 1);

    if (endPage - startPage + 1 < VISIBLE_PAGE_NUMBERS) {
      startPage = Math.max(1, endPage - VISIBLE_PAGE_NUMBERS + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((pageNum) => (
      <button
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}
        className={`pagination-number ${pageNum === page ? "active" : ""}`}
        aria-current={pageNum === page ? "page" : undefined}
      >
        {pageNum}
      </button>
    ));
  };

  return (
    <>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className="pagination-arrow"
          aria-label="First page"
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="pagination-arrow"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="pagination-arrow"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className="pagination-arrow"
          aria-label="Last page"
        >
          <ChevronsRight size={20} />
        </button>
      </div>
      <div className="page-info">
        Page {page} of {totalPages}
      </div>
    </>
  );
};

export default Pagination;

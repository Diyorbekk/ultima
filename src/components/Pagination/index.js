import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from "react-paginate";

const Pagination = (
  {
    pageCount,
    initialPage,
    pageRange,
    marginPage,
    onChange,
    className
  }
) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={marginPage}
      pageRangeDisplayed={pageRange}
      forcePage={initialPage - 1}
      previousLabel={<i className="fal fa-angle-double-left"/>}
      nextLabel={<i className="fal fa-angle-double-right"/>}
      breakLabel={'...'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link text-secondary border-0 focus-none'}
      containerClassName={`pagination ${className}`}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link text-secondary border-0 focus-none'}
      activeLinkClassName={"bg-pink focus-none"}
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      previousLinkClassName={'page-link text-secondary border-0 focus-none'}
      nextLinkClassName={'page-link text-secondary border-0 focus-none'}
      onPageChange={i => onChange(i.selected + 1)}
    />
  );
};

Pagination.defaultProps = {
  pageCount: 10,
  initialPage: 1,
  pageRange: 2,
  marginPage: 3,
  onChange: () => {},
  className: ''
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  initialPage: PropTypes.number.isRequired,
  pageRange: PropTypes.number,
  marginPage: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Pagination;
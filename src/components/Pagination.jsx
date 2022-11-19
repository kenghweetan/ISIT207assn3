import { useState } from "react";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.
/* const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; */

const Items = ({ currentItems }) => {
  return (
    <div className="showlist">
      {currentItems && currentItems.map((item) => item)}
    </div>
  );
};

const PaginatedItems = ({ itemsPerPage, items }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        previousLinkClassName="prevLink"
        previousClassName="prevBtn"
        nextLinkClassName="nextLink"
        containerClassName="pagination"
        pageLinkClassName="pageLink"
        activeLinkClassName="activePage"
        pageClassName="pageListItem"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;

import Select from "../input/select";

const Pagination = ({
  currentPage,
  maxPageLimit,
  minPageLimit,
  onPrevClick,
  onNextClick,
  onPageChange,
  totalPages: totalPagesProp,
}) => {
  const totalPages = totalPagesProp - 1;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e) => {
    onPageChange(Number(e.target.id));
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={currentPage === page ? "active" : null}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  return (
    <div className="custom-pagination">
      <ul className="page-numbers">
        <li className="btn">
          <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
            &lt;
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li className="btn">
          <button
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            &gt;
          </button>
        </li>
      </ul>
      <div className="rows-per-page">
        <div>
          <Select options={[{ value: 10, label: 10 }]} />
        </div>
        <p>Rows per page</p>
      </div>
    </div>
  );
};

export default Pagination;
import React from 'react';
import './Pagination.css';

let pageNumber = 1;

function Pagination ({ cardsPerPage, totalCards, paginate }) {
 
  const maxPageNumber = Math.ceil(totalCards / cardsPerPage);
  var paginationWrapper = document.querySelector('.pagination-wrapper');

  const btnClick = event => {
    if(event.target.classList.contains('btn--prev') && pageNumber > 1) {
      paginationWrapper.classList.add('transition-prev');
      pageNumber = pageNumber - 1;
      paginate(pageNumber);
      console.log("DEC", pageNumber, maxPageNumber);
    } 
    else if(!event.target.classList.contains('btn--prev') && pageNumber < maxPageNumber) {
      paginationWrapper.classList.add('transition-next');
      pageNumber = pageNumber + 1;
      paginate(pageNumber); 
      console.log("INC", pageNumber, maxPageNumber);
    }

    event.preventDefault();
    setTimeout(cleanClasses, 500);
  };

  function cleanClasses() {
    if(paginationWrapper.classList.contains('transition-next')) {
      paginationWrapper.classList.remove('transition-next')
    } else if(paginationWrapper.classList.contains('transition-prev')) {
      paginationWrapper.classList.remove('transition-prev')
    }
  }

  return (
    <div className="pagination-wrapper">
      <svg className="custom-btn btn btn--prev" height="96" viewBox="0 0 24 24" width="96"  
          onClick={btnClick} xmlns="http://www.w3.org/2000/svg">
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
        <path  d="M0-.5h24v24H0z" fill="none"/>
      </svg>
      
      <div className="pagination-container">
        <div className="little-dot  little-dot--first"></div>
        <div className="little-dot">
          <div className="big-dot-container">
            <div className="big-dot"></div>
          </div>
        </div>
        <div className="little-dot  little-dot--last"></div>
      </div>
      
      <svg className="custom-btn btn btn--next" height="96" viewBox="0 0 24 24" width="96" 
           onClick={btnClick} xmlns="http://www.w3.org/2000/svg">
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
        <path d="M0-.25h24v24H0z" fill="none"/>
      </svg>
    </div>
  );
};

export default Pagination;
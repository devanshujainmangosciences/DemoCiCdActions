/**
 * This Component renders the pagination which allows the
 * user to navigate to different pages
 * <CustomPagination
 *  paginationDetail(Object) => This Object contains Paginations details such as totalpages,numberOfElements etc
 *  activePage(Number) => This Number indicates the current page
 *  setActivePage(Func) => This Function is used to set current page
 *  IMPORTANT: all three are required to render this component
 * />
 */
import React, {useEffect, useState, useCallback} from 'react';
import {Pagination} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

const CustomPagination = ({
  paginationDetail,
  activePage,
  setActivePage,
  className,
}) => {
  const {t} = useTranslation(['users']);
  const [paginationItems, setPaginationItems] = useState([]);

  /**
   * Navigate the user to previous page
   *
   */
  const handleClickPrev = () => {
    if (!paginationDetail.first) {
      if (1 === activePage) {
        return setActivePage(1);
      }
      setActivePage(activePage - 1);
    }
  };

  /**
   * Navigate the user to next page
   *
   */
  const handleClickNext = () => {
    if (!paginationDetail.last) {
      if (paginationDetail.totalPages === activePage) {
        return setActivePage(paginationDetail.totalPages);
      }
      setActivePage(activePage + 1);
    }
  };

  /**
   * To make the page active when the first is true
   */
  useEffect(() => {
    // console.log('PAGINATION DETAILS=>', paginationDetail);
    if (paginationDetail?.first) setActivePage(1);
  }, [paginationDetail]);

  /**
   * This Callback Creates the pagination item based on pagination totalPages and push the items to
   * items array and it is set to paginationItems state
   */
  const paginate = useCallback(() => {
    const handlePagination = (item) => {
      setActivePage(item);
    };
    let items = [];
    if (paginationDetail) {
      for (let number = 1; number <= paginationDetail.totalPages; number++) {
        if (activePage === number) {
          if (activePage !== 1) {
            items.push(
              <Pagination.Item
                className=""
                key={number - 1}
                onClick={() => handleClickPrev()}
                active={number - 1 === activePage}>
                {number - 1}
              </Pagination.Item>
            );
          }
          items.push(
            <Pagination.Item
              className=""
              key={number}
              onClick={() => handlePagination(number)}
              active={number === activePage}>
              {number}
            </Pagination.Item>
          );
          if (activePage !== paginationDetail.totalPages) {
            items.push(
              <Pagination.Item
                className=""
                key={number + 1}
                onClick={() => handleClickNext()}
                active={number + 1 === activePage}>
                {number + 1}
              </Pagination.Item>
            );
          }
          return setPaginationItems(items);
        }
      }
    }
  }, [activePage, paginationDetail, setActivePage]);

  // console.log('PAGINATION ITEM=>', paginationItems);

  /**
   * Calls the paginate callback whenever items changes
   */
  useEffect(() => {
    paginate();
  }, [paginate]);

  return (
    <div
      className={`${
        className ? className : ''
      } d-flex flex-row align-items-center justify-content-between flex-wrap-wrap gap-2`}>
      <Pagination className="p-0 mb-3 m-0 flex-wrap-wrap gap-2">
        <Pagination.First className="" onClick={() => setActivePage(1)}>
          {t('first')}
        </Pagination.First>
        <Pagination.Prev className="" onClick={() => handleClickPrev()}>
          {t('previous')}
        </Pagination.Prev>
        {paginationItems}
        <Pagination.Next className="" onClick={() => handleClickNext()}>
          {t('next')}
        </Pagination.Next>
        <Pagination.Last
          className=""
          onClick={() => setActivePage(paginationDetail.totalPages)}>
          {t('last')}
        </Pagination.Last>
      </Pagination>
      {paginationDetail && (
        <p className="pe-0 mt-2 mt-lg-0">
          {t('showing')} {paginationDetail.numberOfElements} {t('outOf') + ' '}
          {paginationDetail.totalElements} {t('entries')}
        </p>
      )}
    </div>
  );
};
CustomPagination.propTypes = {
  paginationDetail: PropTypes.object,
  activePage: PropTypes.number,
  setActivePage: PropTypes.func,
};
export default CustomPagination;

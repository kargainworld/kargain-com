import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Pagination from 'react-paginating'

const PaginateResults = ({ totalPages, size, pageCount, page, handlePageChange }) => {
    return (
        <div className="d-flex flex-row py-2 align-items-center justify-content-center">
            <Pagination
                total={totalPages}
                limit={size}
                pageCount={pageCount}
                currentPage={page}
            >
                {({
                    pages,
                    currentPage,
                    hasNextPage,
                    hasPreviousPage,
                    previousPage,
                    nextPage,
                    totalPages,
                    getPageItemProps
                }) => {
                    if (totalPages < 2) return null
                    return (
                        <div>
                            {currentPage !== 1 && (
                                <button
                                    {...getPageItemProps({
                                        pageValue: 1,
                                        onPageChange: handlePageChange
                                    })}
                                >
                                    1
                                </button>
                            )}

                            {hasPreviousPage && (
                                <button
                                    {...getPageItemProps({
                                        pageValue: previousPage,
                                        onPageChange: handlePageChange
                                    })}
                                >
                                    {'<'}
                                </button>
                            )}

                            {pages.map((page, i) => {
                                let activePage = null
                                if (currentPage === page) {
                                    activePage = { backgroundColor: '#fdce09' }
                                }
                                return (
                                    <button key={i}
                                        {...getPageItemProps({
                                            pageValue: page,
                                            key: page,
                                            style: activePage,
                                            onPageChange: handlePageChange
                                        })}
                                    >
                                        {page}
                                    </button>
                                )
                            })}

                            {(hasNextPage && pages.length > 2) && (
                                <>
                                    <button
                                        {...getPageItemProps({
                                            pageValue: nextPage,
                                            onPageChange: handlePageChange
                                        })}
                                    >
                                        {'>'}
                                    </button>

                                    <button
                                        {...getPageItemProps({
                                            pageValue: totalPages,
                                            onPageChange: handlePageChange
                                        })}
                                    >
                                        {totalPages}
                                    </button>
                                </>
                            )}
                        </div>
                    )
                }}
            </Pagination>
        </div>
    )
}

PaginateResults.propsType = {
    totalPages: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    pageCount : PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePageChange : PropTypes.func.isRequired
}

export default memo(PaginateResults)

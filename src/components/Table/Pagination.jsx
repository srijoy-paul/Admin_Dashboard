import React, { useContext } from 'react'
import { filteredUsersContext, handlePageChangeContext } from '../../App';
import ReactPaginate from 'react-paginate';

function Pagination({ values }) {
    const { currentPage, usersPerPage } = values;
    const filteredUsers = useContext(filteredUsersContext);
    const handlePageChange = useContext(handlePageChangeContext);
    return (
        <div id='pagination-container'>
            <div>
                <button className='first-page' onClick={() => handlePageChange({ selected: 0 })}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            {filteredUsers.length > usersPerPage && (
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    forcePage={currentPage}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'selected'}
                    previousClassName={'previous-page'}
                    nextClassName={'next-page'}
                />
            )}
            <div>
                <button className="last-page" onClick={() => {
                    let lastPage = Math.ceil(filteredUsers.length / usersPerPage);
                    return handlePageChange({ selected: lastPage - 1 })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Pagination
import React, { useContext } from 'react'
import { filteredUsersContext } from '../App';
import ReactPaginate from 'react-paginate';
import Pagination from './Table/Pagination';

function PagesInfo({ values }) {
    const { currentPage, usersPerPage } = values;
    const filteredUsers = useContext(filteredUsersContext);
    return (
        <div id='pages-info'>
            <div id='pg-number'>Page {currentPage + 1} of {Math.ceil(filteredUsers.length / usersPerPage)}</div>

            <Pagination values={{ currentPage, usersPerPage }} />
        </div>
    )
}

export default PagesInfo
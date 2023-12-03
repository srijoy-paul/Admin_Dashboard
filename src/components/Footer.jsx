import React from 'react'
import SelectionInfo from './SelectionInfo';
import PagesInfo from './PagesInfo';

function Footer({ values }) {
    const { currentPage, usersPerPage } = values;
    return (
        <footer>

            <SelectionInfo />
            <PagesInfo values={{ currentPage, usersPerPage }} />

        </footer>
    )
}

export default Footer
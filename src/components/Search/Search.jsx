import React from 'react'

const Search = ({ onSearch }) => {
    return (
        <div>
            <input type="text" name="" id="search-bar" placeholder='Search User' onChange={(e) => onSearch(e.target.value)} />
        </div>
    )
}

export default Search
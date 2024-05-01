import React from 'react';
const SearchBox = ({ searchChange}) => {
    return (
        <header className='pa2'>
            <input 
                className='pa3 b--green bg-light-blue'
                type='search'
                results="0"
                placeholder='search'
                onChange={searchChange}
            />
        </header>
    );
    }
export default SearchBox;
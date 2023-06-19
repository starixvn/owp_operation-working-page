import React, { useState } from 'react';
import useStore from '../../app/useStoreNative';
import { shallow } from 'zustand/shallow';

const SearchAssignee = () => {
  const { searchDataTable } = useStore(
    state => ({
      searchDataTable: state.searchDataTable
    }),
    shallow
  );

  const [keyword, setKeyword] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    event.key === 'Enter' && searchDataTable(keyword);

  return (
    <div className='search-assignee'>
      <input
        type='text'
        value={keyword}
        onChange={event => setKeyword(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Search Assignees'
      />
    </div>
  );
};

export default SearchAssignee;

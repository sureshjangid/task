import React, { useState } from 'react';

const Table = ({ infoData }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState(''); // '' for default, 'asc' for ascending, 'desc' for descending
  const [sortBy, setSortBy] = useState('title'); // Default sorting by title

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  // sort with title
  const handleSort = (column) => {
    if (column === sortBy) {
      setSortType(sortType === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortType('asc');
    }
  };

// sort with filter
  const sortedAndFilteredData = infoData?.data
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
      const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
      if (sortType === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div>
      <input
        type='text'
        placeholder='Please Search with title'
        value={search}
        onChange={(e) => handleSearch(e)}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
              Title {sortBy === 'title' && (sortType === 'asc' ? '↑' : '↓')}
            </th>
            <th scope="col">Body</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredData.slice((page - 1) * 10, page * 10).map((a, i) => {
            const { id, title, body } = a;
            return (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{title}</td>
                <td>{body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination  */}
      {infoData && infoData?.data.length > 0 && (
        <div className='page_div'>
          {page > 1 && (
            <span onClick={() => setPage(page - 1)} className='btn btn-primary'>
              Prev
            </span>
          )}
          {[...Array(Math.ceil(sortedAndFilteredData.length / 10))].map((_, i) => {
            return (
              <span
                className={i === page - 1 ? 'active' : ''}
                key={i}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span onClick={() => setPage(page + 1)} className='btn btn-success'>
            Next
          </span>
        </div>
      )}
    </div>
  );
};

export default Table;

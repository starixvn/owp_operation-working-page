import FilterDate from './FilterDate';

const Filter = () => {
  const handleOnSearch = () => {
    console.log('abc');
  };

  return (
    <div className='top-control'>
      <div className='left-control'>
        <FilterDate />
        <div className='filter-control btn-block'>
          <button className='button-submit' onClick={handleOnSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;

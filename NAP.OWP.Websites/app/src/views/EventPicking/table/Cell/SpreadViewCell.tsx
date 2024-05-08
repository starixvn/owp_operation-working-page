
const SpreadViewCell = ({ spread }: { spread: number | string | undefined }) => {
  return (
    <>
      {spread ? (
        <div className='spread-cell'>
          {spread}
        </div>
      ) : (
        <a className='spread__check' href='http://google.com'>
          Check
        </a>
      )}

    </>
  );
};

export default SpreadViewCell;

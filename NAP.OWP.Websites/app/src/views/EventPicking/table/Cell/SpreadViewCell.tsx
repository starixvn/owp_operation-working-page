
const SpreadViewCell = ({ spread }: { spread: number | string | undefined }) => {
  return (
    <div className="spread-cell">
      {spread ? (
        <p className='spread-cell__value'>
          {spread}
        </p>
      ) : (
        <a className='spread__check' href='http://google.com'>
          Check
        </a>
      )}

    </div>
  );
};

export default SpreadViewCell;

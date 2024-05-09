
const MaxBetViewCell = ({ value }: { value: string | undefined }) => {
  return (
    <div className="max-bet-cell">
      {value ? (
        <p className='max-bet-cell__value'>
          {value}
        </p>
      ) : (
        <a className='mb__check' href='http://google.com'>
          Check
        </a>
      )}
    </div>
  );
};

export default MaxBetViewCell;

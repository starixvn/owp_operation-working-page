
import Utils from '../../../Shared/Utils';

const { convertThousandToK } = Utils;

const MaxBetViewCell = ({ value }: { value: string | undefined }) => {
  return (
    <>
      {value ? (
        <div className='max-bet-cell'>
          {convertThousandToK(value)}
        </div>
      ) : (
        <a className='mb__check' href='http://google.com'>
          Check
        </a>
      )}
    </>
  );
};

export default MaxBetViewCell;

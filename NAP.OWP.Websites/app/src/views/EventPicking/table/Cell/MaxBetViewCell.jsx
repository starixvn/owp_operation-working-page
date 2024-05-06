import PropTypes, { number, string } from 'prop-types';
import Utils from '../../../Shared/Utils';

const { convertThousandToK } = Utils;

const propTypes = {
  maxbetHdp: PropTypes.oneOf([number, string, undefined])
};

const MaxBetViewCell = props => {
  return (
    <>
      {maxbet ? (
        <div className='max-bet-cell'>
          {convertThousandToK(props.maxbetHdp)}
        </div>
      ) : (
        <a className='mb__check' href='http://google.com'>
          Check
        </a>
      )}
    </>
  );
};

MaxBetViewCell.propTypes = propTypes;
export default MaxBetViewCell;

import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';

const LeagueCell = ({ className = '', value = '' }) => {
  const uuidKey = `${className}_${uuidv4()}`;

  return (
    <td className={className} onClick={() => console.log('handleOnclick')}>
      <div className='row-table' data-for={uuidKey} data-tip={value}>
        {value}
      </div>
      <ReactTooltip place='right' id={uuidKey} effect='solid' />
    </td>
  );
};

export default LeagueCell;

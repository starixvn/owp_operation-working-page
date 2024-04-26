import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';

const CommonCell = ({ className = '', value = '' }) => {
  const uuidKey = `${className}_${uuidv4()}`;

  return (
    <td className={className}>
      <div className='row-table' data-for={uuidKey} data-tip={value}>
        {value}
      </div>
      <ReactTooltip place='right' id={uuidKey} effect='solid' />
    </td>
  );
};

export default CommonCell;

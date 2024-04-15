import { useRef, useState } from 'react';
import { TEditableCell } from '../../../type/table';
import store from '../../../app/storeNative';
import { UncontrolledTooltip } from 'reactstrap';
import { setValue } from '../tableSlice';
import { useAppDispatch } from '../../../../EventAssignmentNew/app/hooks';
import { saveESTAgent } from '../tableThunk';

const AgentCell = ({
  rowIndex,
  className,
  value,
  owpMatchId,
  columnKey
}: TEditableCell) => {
  const [canEdit, setCanEdit] = useState(false);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleEdit = () => {
    const {
      providerPolicy: {
        permission: { HasWrite }
      }
    } = store.getState();
    HasWrite && setCanEdit(true);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setCanEdit(false);
    }, 90);
    const value = inputRef.current?.value;
    dispatch(saveESTAgent({ owpMatchId, estAgent: value }));
    dispatch(
      setValue({
        owpMatchId,
        key: 'Agent',
        value
      })
    );
  };

  const id = `${columnKey}${rowIndex}`;
  return (
    <td className={className} onClick={handleEdit}>
      {!canEdit && (
        <>
          <span id={id}>{value}</span>
          <UncontrolledTooltip placement='top' target={id}>
            {value}
          </UncontrolledTooltip>
        </>
      )}
      {canEdit && (
        <input
          type='text'
          className='input-field'
          defaultValue={value}
          ref={inputRef}
          autoFocus
          onBlur={handleBlur}></input>
      )}
    </td>
  );
};

export default AgentCell;

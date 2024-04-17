import { useRef, useState } from 'react';
import { TEditableCell } from '../../../type/table';
import store from '../../../app/storeNative';
import { UncontrolledTooltip } from 'reactstrap';
import { setValue } from '../tableSlice';
import { useAppDispatch } from '../../../../EventAssignmentNew/app/hooks';
import { saveESTNote } from '../tableThunk';
import PopupEditor from '../../../../Shared/popupEditor/PopupEditor';
import useClickOutside from '../../../../Shared/customHook/useClickOutside';

const EstNoteCell = ({
  rowIndex,
  className,
  value,
  owpMatchId,
  columnKey
}: TEditableCell) => {
  const [canEdit, setCanEdit] = useState(false);
  const filterRef = useClickOutside<HTMLDivElement>(() => setCanEdit(false));
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

    dispatch(
      setValue({
        owpMatchId,
        key: 'EstNote',
        value
      })
    );
    dispatch(saveESTNote({ owpMatchId, estNote: value }));
  };

  const id = `${columnKey}${rowIndex}`;
  return (
    <td className={className} onClick={handleEdit}>
      <div ref={filterRef} className='popup__editor__wrapper'>
        {canEdit && <PopupEditor value={value} />}
        <span id={id}>{value}</span>
        <UncontrolledTooltip placement='top' target={id}>
          {value}
        </UncontrolledTooltip>
      </div>
      {/* {canEdit && (
        <input
          type='text'
          className='input-field'
          defaultValue={value}
          ref={inputRef}
          autoFocus
          multiple
          onBlur={handleBlur}></input>
      )} */}
    </td>
  );
};

export default EstNoteCell;

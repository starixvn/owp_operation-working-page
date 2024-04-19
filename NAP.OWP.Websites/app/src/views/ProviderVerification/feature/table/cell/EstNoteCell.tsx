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
  const [defaultValue, setDefaultValue] = useState(value);
  const editRef = useClickOutside<HTMLDivElement>(() => setCanEdit(false));
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    const {
      providerPolicy: {
        permission: { HasWrite }
      }
    } = store.getState();
    HasWrite && setCanEdit(true);
  };
  const handleBlur = (value: string | undefined) => {
    setCanEdit(false);
    setDefaultValue(value);
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
      <div ref={editRef} className='popup__editor__wrapper'>
        {canEdit && <PopupEditor onBlur={handleBlur} defaultValue={defaultValue} />}
        <span id={id}>{defaultValue}</span>
        <UncontrolledTooltip placement='top' target={id}>
          {defaultValue}
        </UncontrolledTooltip>
      </div>
    </td>
  );
};

export default EstNoteCell;

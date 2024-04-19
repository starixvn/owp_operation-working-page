import { createRef, useState } from 'react';
import { TEditableCell } from '../../../type/table';
import store from '../../../app/storeNative';
import { UncontrolledTooltip } from 'reactstrap';
import { setValue } from '../tableSlice';
import { useAppDispatch } from '../../../../EventAssignmentNew/app/hooks';
import { saveESTNote } from '../tableThunk';
import PopupEditor from '../../../../Shared/popupEditor/PopupEditor';

const EstNoteCell = ({
  rowIndex,
  value,
  owpMatchId,
  columnKey
}: TEditableCell) => {
  const [canEdit, setCanEdit] = useState(false);
  const popupRef = createRef<HTMLTextAreaElement>();
  const dispatch = useAppDispatch();

  const onClickOutside = () => {
    console.log('onClickOutside');
    setCanEdit(false);
    dispatch(
      setValue({
        owpMatchId,
        key: 'EstNote',
        value: popupRef.current?.value
      })
    );
    dispatch(saveESTNote({ owpMatchId, estNote: value }));
  };


  const handleEdit = () => {
    const {
      providerPolicy: {
        permission: { HasWrite }
      }
    } = store.getState();
    HasWrite && setCanEdit(true);
  };

  const id = `${columnKey}${rowIndex}`;


  return (
    <td onClick={handleEdit}>
      <div className='popup__editor__wrapper'>
        {canEdit && <PopupEditor
          ref={popupRef}
          value={value}
          onBlur={onClickOutside} />}
        <div className='est__note'>
          <span id={id}>{value}</span>
          <UncontrolledTooltip placement='top' target={id}>
            {value}
          </UncontrolledTooltip>
        </div>
      </div>
    </td>
  );
};

export default EstNoteCell;

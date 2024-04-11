import { useRef, useState } from 'react';
import { TEditableCell } from '../../../type/table';
import store from '../../../app/storeNative';

const EditableCommonCell = ({ className, value, onBlur }: TEditableCell) => {
  const [canEdit, setCanEdit] = useState(false);
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

    onBlur(inputRef.current?.value);
  };

  return (
    <td className={className} onClick={handleEdit}>
      {!canEdit && <span>{value}</span>}
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

export default EditableCommonCell;

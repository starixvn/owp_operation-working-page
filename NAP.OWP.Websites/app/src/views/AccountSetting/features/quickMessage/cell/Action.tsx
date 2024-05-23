import { CheckIcon, CloseIcon, DeleteIcon, PencilIcon } from 'mdi-react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeEditMode, setEditIndex } from '../slice/quickMessageSlice';
import { deleteQuickMessageThunk, queryQuickMessageThunk, saveQuickMessageThunk } from '../slice/quickMessageThunk';

const Action = ({ isEdit, index }: { isEdit: boolean, index: number }) => {
  console.log('render action');
  const dispatch = useAppDispatch();
  const editModel = useAppSelector(state => state.quickMessageSlice.editModel);

  const handleOnSave = () => {
    dispatch(saveQuickMessageThunk(editModel));
    dispatch(closeEditMode());
    dispatch(queryQuickMessageThunk());
  };

  const handleOnCancel = () => {
    dispatch(closeEditMode());
  };

  const handleOnDelete = () => {
    console.log(index);
    dispatch(deleteQuickMessageThunk({ id: editModel.id }));
  };

  const handleOnEdit = () => {
    dispatch(setEditIndex(index));
  };

  return (
    <td className='action-cell'>
      {!isEdit
        ? (<div className='btn-edit'>
          <button className='edit-action' onClick={handleOnEdit}>
            <PencilIcon size={15} />
          </button>
          <button className='delete-action' onClick={handleOnDelete}>
            <DeleteIcon size={15} />
          </button>
        </div>)
        : (<div className='save'>
          <button className='save-action' onClick={handleOnSave}>
            <CheckIcon size={14} />
          </button>
          <button className='cancel-action' onClick={handleOnCancel}>
            <CloseIcon size={14} />
          </button>
        </div>)
      }
    </td>
  );
};

export default React.memo(Action);
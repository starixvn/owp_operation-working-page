import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import NotePopover from '../../components/NotePopover';
import { TCellModel } from '../../type/type';

const NoteCell: React.FC<TCellModel> = ({
  notePolicy,
  dataSource,
  rowIndex,
  closePopup,
  onShowNote
}) => {
  const policyDefault = {
    HasWrite: false,
    HasRead: false
  };
  const handleShowNote = (show: any) => {
    onShowNote && onShowNote(show);
  };
  return (
    <NotePopover
      key={closePopup ? uuidv4() : rowIndex}
      policy={notePolicy ?? policyDefault}
      event={dataSource[rowIndex]}
      onShowNote={handleShowNote}
    />
  );
};

export default NoteCell;

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'mdi-react/CloseIcon';
import CommentIcon from 'mdi-react/CommentIcon';
import { EditIcon } from 'mdi-react';
import { pull } from 'lodash';
import NoteTable from '../../LiveDetail/MatchNote/NoteTable';

interface NotePopoverProps {
  policy: { [key: string]: any }; // Update the type according to your actual policy type
  event: { [key: string]: any }; // Update the type according to your actual event type
  onShowNote: (show: boolean) => void;
}

const NotePopover: React.FC<NotePopoverProps> = ({
  policy,
  event,
  onShowNote
}) => {
  const iconRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  let popovers: any[] = [];
  const handleToggle = () => {
    popovers.forEach((popover: any) => {
      if (popover === NotePopover) {
        setIsOpen(!isOpen);
        onShowNote(!isOpen);
      } else {
        if (popover.state.isOpen) {
          popover.setState({ isOpen: false });
        }
      }
    });
  };

  const handleSave = (notes: any) => {
    event.notes = notes;
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleDocumentClick, true);
    } else {
      document.removeEventListener('click', handleDocumentClick, true);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      pull(popovers, NotePopover);
    };
  }, [isOpen]);

  useEffect(() => {
    popovers.push(NotePopover);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasNote = event.notes.length > 0;

  return (
    <div className={`note-cell${hasNote ? ' has-note' : ''}`}>
      {hasNote ? (
        <span ref={iconRef} className='icon-comment' onClick={handleToggle}>
          <CommentIcon size={14} />
        </span>
      ) : (
        <span ref={iconRef} className='icon-edit' onClick={handleToggle}>
          <EditIcon size={14} />
        </span>
      )}
      <div className={`note-popover${isOpen ? ' is-show' : ''}`}>
        <span className='close-popup' onClick={handleToggle}>
          <CloseIcon size={14} />
        </span>
        <NoteTable
          matchId={event.oWPMatchId}
          policy={policy}
          rows={event.notes}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

NotePopover.propTypes = {
  policy: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  onShowNote: PropTypes.func.isRequired
};

export default NotePopover;

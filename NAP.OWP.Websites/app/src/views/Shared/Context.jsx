import React from 'react';
import { noop } from 'lodash';

export const HighlightUserContext = React.createContext({ userName: '' });
export const UpdateNoteContext = React.createContext({ onUpdateNotes: noop });
export const UpdateAssignmentContext = React.createContext({
  onUpdateAssignments: noop
});
export const AppContext = React.createContext({
  detailInformationPolicy: { HasRead: false, HasWrite: false }
});

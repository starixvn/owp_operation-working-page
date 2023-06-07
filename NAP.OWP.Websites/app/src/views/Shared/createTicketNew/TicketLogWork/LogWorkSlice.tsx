import { createSlice } from '@reduxjs/toolkit';

const ticketLogWorkSlice = createSlice({
  name: 'ticketLogWorkSlice',
  initialState: {
    isOpen: false,
    subject: '',
    errorSubject: '',
    statusSelected: '',
    subTypeSelected: '',
    recipient: [] as Recipient[],
    comment: '',
    selectedFiles: ''
  },
  reducers: {
    openPopupLogWork: state => {
      state.isOpen = true;
    },
    closePopupLogWork: state => {
      state.isOpen = false;
    }
  }
});

const { actions, reducer } = ticketLogWorkSlice;
const { openPopupLogWork, closePopupLogWork } = actions;

export { openPopupLogWork, closePopupLogWork };

export default reducer;

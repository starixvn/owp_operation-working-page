import { createSlice } from '@reduxjs/toolkit';

const createTicketBoardSliceNew = createSlice({
  name: 'createTicketBoardNew',
  initialState: {
    isOpenCreateTicketInLGA: false,
    isOpenCreateInPreMatch: false,
    isOpenPopup: false,
    isEventChecking: false,
    isLiveIncident: false,
    isOthers: false,
    valueSearch: '',
    valueEvent: null,
    valueOther: '',
    selectedRecipients: [],
    defaultRecipients: [],
    errorOther: false,
    errorInput: false,
    errorRecipient: false,
    errorTextField: '',
    eventChecking: [],
    recipientAssigned: [],
    typeTicketText: '',
    subTypeOption: [],
    subTypeSelected: []
  },
  reducers: {
    setDefaultRecipients: {
      reducer: (state, { payload }) => {
        state.defaultRecipients = payload;
      }
    },
    setSubTypeSelected: {
      reducer: (state, action) => {
        state.subTypeSelected = action.payload;
      }
    },
    setSubTypeOption: {
      reducer: (state, action) => {
        state.subTypeOption = action.payload;
      }
    },
    setTypeTicketText: {
      reducer: (state, action) => {
        state.typeTicketText = action.payload;
      }
    },
    closePopupNewAdd: {
      reducer: state => {
        state.isOpenCreateInPreMatch = false;
      }
    },
    openPopupNewAdd: {
      reducer: state => {
        state.isOpenCreateInPreMatch = true;
      }
    },
    setRecipientAssigned: {
      reducer: (state, action) => {
        state.recipientAssigned = action.payload;
      }
    },
    setEventChecking: {
      reducer: (state, action) => {
        state.eventChecking = action.payload;
      }
    },
    changeErrorTextField: {
      reducer: (state, action) => {
        state.errorTextField = action.payload;
      }
    },
    setSelectedRecipients: {
      reducer: (state, action) => {
        state.selectedRecipients = action.payload;
      }
    },
    changeErrorOther: {
      reducer: (state, action) => {
        state.errorOther = action.payload;
      }
    },
    changeErrorInput: {
      reducer: (state, action) => {
        state.errorInput = action.payload;
      }
    },
    changeErrorRecipient: {
      reducer: (state, action) => {
        state.errorRecipient = action.payload;
      }
    },
    otherSubject: {
      reducer: (state, action) => {
        state.valueOther = `${action.payload}`;
      }
    },
    selectedEvent: {
      reducer: (state, action) => {
        state.valueEvent = action.payload;
      }
    },
    includeSuggestion: {
      reducer: (state, action) => {
        state.valueSearch = `${action.payload}`;
      }
    },
    closeCreatePopup: {
      reducer: state => {
        state.isOpenPopup = false;
        state.isEventChecking = false;
        state.isOthers = false;
        state.isLiveIncident = false;
      }
    },
    openPopupEventChecking: {
      reducer: state => {
        state.isOpenPopup = true;
        state.isEventChecking = true;
        state.isLiveIncident = false;
        state.isOthers = false;
      }
    },
    openPopupLiveIncident: {
      reducer: state => {
        state.isOpenPopup = true;
        state.isLiveIncident = true;
        state.isEventChecking = false;
        state.isOthers = false;
      }
    },
    openPopupOthers: {
      reducer: state => {
        state.isOpenPopup = true;
        state.isOthers = true;
        state.isEventChecking = false;
      }
    },
    closePopupCreateTicketInLGA: {
      reducer: state => {
        state.isOpenCreateTicketInLGA = false;
      }
    },
    openPopupCreateTicketInLGA: {
      reducer: state => {
        state.isOpenCreateTicketInLGA = true;
      }
    }
  }
});

const { actions, reducer } = createTicketBoardSliceNew;
const {
  openPopupNewAdd,
  closePopupNewAdd,
  closeCreatePopup,
  openPopupEventChecking,
  openPopupLiveIncident,
  openPopupOthers,
  includeSuggestion,
  selectedEvent,
  otherSubject,
  changeErrorInput,
  changeErrorRecipient,
  changeErrorOther,
  setSelectedRecipients,
  changeErrorTextField,
  setEventChecking,
  setRecipientAssigned,
  setTypeTicketText,
  setDefaultRecipients,
  setSubTypeOption,
  setSubTypeSelected,
  closePopupCreateTicketInLGA,
  openPopupCreateTicketInLGA
} = actions;

export {
  openPopupNewAdd,
  closePopupNewAdd,
  closeCreatePopup,
  openPopupEventChecking,
  openPopupLiveIncident,
  openPopupOthers,
  includeSuggestion,
  selectedEvent,
  otherSubject,
  changeErrorInput,
  changeErrorRecipient,
  changeErrorOther,
  setSelectedRecipients,
  changeErrorTextField,
  setEventChecking,
  setRecipientAssigned,
  setTypeTicketText,
  setDefaultRecipients,
  setSubTypeOption,
  setSubTypeSelected,
  closePopupCreateTicketInLGA,
  openPopupCreateTicketInLGA
};

export default reducer;

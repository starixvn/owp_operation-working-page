import createTicketBoardSlice, {
  openPopupNewAdd,
  closePopupNewAdd,
  closeCreatePopup,
  openPopupEventChecking,
  openPopupOthers,
  includeSuggestion,
  selectedEvent,
  otherSubject,
  getSelectedRecipients,
  changeErrorInput,
  changeErrorRecipient,
  changeErrorOther,
  changeErrorTextField,
  setRecipientPreMatch,
  setEventChecking,
  setTypeTicketText,
  setSubTypeOption,
  setSubTypeSelected
} from './createTicketBoardSliceNew';

describe('createTicketBoardSlice under test', () => {
  it('should return initial state', () => {
    expect(createTicketBoardSlice(undefined, {})).toEqual({
      isOpenCreateInPreMatch: false,
      isOpenPopup: false,
      isEventChecking: false,
      isOthers: false,
      valueSearch: '',
      valueEvent: null,
      valueOther: '',
      selectedRecipients: [],
      errorOther: false,
      errorInput: false,
      errorRecipient: false,
      errorTextField: '',
      isLiveIncident: false,
      eventChecking: [],
      recipientAssigned: [],
      isOpenCreateTicketInLGA: false,
      typeTicketText: '',
      defaultRecipients: [],
      subTypeOption: [],
      subTypeSelected: []
    });
  });
  it('should handle setSubTypeSelected', () => {
    const initialState = {
      subTypeSelected: null
    };
    const action = {
      type: setSubTypeSelected.type,
      payload: 1
    };
    const expectState = {
      subTypeSelected: 1
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle setTypeOption', () => {
    const initialState = {
      subTypeOption: []
    };
    const action = {
      type: setSubTypeOption.type,
      payload: [
        { value: null, label: '' },
        { value: 1, label: 'abc' },
        { value: 2, label: 'xyz' }
      ]
    };
    const expectState = {
      subTypeOption: [
        { value: null, label: '' },
        { value: 1, label: 'abc' },
        { value: 2, label: 'xyz' }
      ]
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle setEventChecking', () => {
    const initialState = {
      eventChecking: []
    };
    const action = {
      type: setEventChecking.type,
      payload: [
        {
          owpLeagueId: 32459,
          leagueName: '*UEFA EUROPA LEAGUE',
          homeId: 123,
          awayId: 141,
          homeName: 'A',
          awayName: 'B',
          eventDateTimeGmt8: '2021-10-01T00:45:00',
          isLeague: false
        }
      ]
    };
    const expectState = {
      eventChecking: [
        {
          owpLeagueId: 32459,
          leagueName: '*UEFA EUROPA LEAGUE',
          homeId: 123,
          awayId: 141,
          homeName: 'A',
          awayName: 'B',
          eventDateTimeGmt8: '2021-10-01T00:45:00',
          isLeague: false
        }
      ]
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });

  it('should handle change error textfield', () => {
    const initialState = {
      errorTextField: ''
    };
    const action = {
      type: changeErrorTextField.type,
      payload: 'abc'
    };
    const expectState = {
      errorTextField: 'abc'
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle selectedRecipient', () => {
    const initialState = {
      selectedRecipients: []
    };
    const action = {
      type: getSelectedRecipients.type,
      payload: [
        {
          ticketTypeRecipientId: 1,
          recipientId: 1,
          recipientType: 1,
          recipientName: 'sa',
          recipientNickname: 'sa_nick'
        }
      ]
    };
    const expectState = {
      selectedRecipients: [
        {
          ticketTypeRecipientId: 1,
          recipientId: 1,
          recipientType: 1,
          recipientName: 'sa',
          recipientNickname: 'sa_nick'
        }
      ]
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle open event checking popup', () => {
    const initialState = {
      isOpenPopup: false,
      isEventChecking: false,
      isOthers: false,
      isLiveIncident: false
    };
    const expectEventCheckingState = {
      isOpenPopup: true,
      isEventChecking: true,
      isOthers: false,
      isLiveIncident: false
    };

    const action = {
      type: openPopupEventChecking.type
    };

    const state = createTicketBoardSlice(initialState, action);

    expect(state).toEqual(expectEventCheckingState);
  });
  it('should handle searchValue', () => {
    const initialState = {
      valueSearch: ''
    };
    const action = {
      type: includeSuggestion.type,
      payload: 'johnny'
    };
    const expectState = {
      valueSearch: 'johnny'
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle change other error', () => {
    const initialState = {
      errorOther: false
    };
    const action = {
      type: changeErrorOther.type,
      payload: true
    };
    const expectState = {
      errorOther: true
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle change event error', () => {
    const initialState = {
      errorInput: false
    };
    const action = {
      type: changeErrorInput.type,
      payload: true
    };
    const expectState = {
      errorInput: true
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle change recipient error', () => {
    const initialState = {
      errorRecipient: false
    };
    const action = {
      type: changeErrorRecipient.type,
      payload: true
    };
    const expectState = {
      errorRecipient: true
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle other value', () => {
    const initialState = {
      valueOther: ''
    };
    const action = {
      type: otherSubject.type,
      payload: 'johnny'
    };
    const expectState = {
      valueOther: 'johnny'
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle event selected', () => {
    const initialState = {
      valueEvent: {}
    };
    const action = {
      type: selectedEvent.type,
      payload: {
        owpLeagueId: 12312,
        leagueName: '*UEFA EUROPA LEAGUE',
        homeId: 0,
        awayId: 0,
        homeName: null,
        awayName: null,
        eventDateTimeGmt8: '2021-10-01T00:45:00',
        isLeague: false
      }
    };
    const expectState = {
      valueEvent: {
        owpLeagueId: 12312,
        leagueName: '*UEFA EUROPA LEAGUE',
        homeId: 0,
        awayId: 0,
        homeName: null,
        awayName: null,
        eventDateTimeGmt8: '2021-10-01T00:45:00',
        isLeague: false
      }
    };
    const state = createTicketBoardSlice(initialState, action);
    expect(state).toEqual(expectState);
  });
  it('should handle open others popup', () => {
    const initialState = {
      isOpenPopup: false,
      isEventChecking: false,
      isOthers: false
    };
    const expectOthersState = {
      isOpenPopup: true,
      isEventChecking: false,
      isOthers: true
    };
    const action = {
      type: openPopupOthers.type
    };

    const state = createTicketBoardSlice(initialState, action);

    expect(state).toEqual(expectOthersState);
  });
  it('should handle set state typeTicketText', () => {
    const initialState = {
      typeTicketText: ''
    };
    const expectOthersState = {
      typeTicketText: 'Ticket Support'
    };
    const action = {
      type: setTypeTicketText.type,
      payload: 'Ticket Support'
    };

    const state = createTicketBoardSlice(initialState, action);

    expect(state).toEqual(expectOthersState);
  });
  it('should handle open create ticket of pre-match', () => {
    const initialState = {
      isOpenCreateInPreMatch: false
    };
    const expectOthersState = {
      isOpenCreateInPreMatch: true
    };
    const action = {
      type: openPopupNewAdd.type
    };

    const state = createTicketBoardSlice(initialState, action);

    expect(state).toEqual(expectOthersState);
  });
  it('should handle close create ticket of pre-match', () => {
    const initialState = {
      isOpenCreateInPreMatch: true
    };
    const expectOthersState = {
      isOpenCreateInPreMatch: false
    };
    const action = {
      type: closePopupNewAdd.type
    };

    const state = createTicketBoardSlice(initialState, action);

    expect(state).toEqual(expectOthersState);
  });
  it('should handle close popup', () => {
    const initialState = {
      isOpenPopup: true,
      isEventChecking: true,
      isLiveIncident: true,
      isOthers: false
    };
    const expectEventCheckingState = {
      isOpenPopup: false,
      isEventChecking: false,
      isLiveIncident: false,
      isOthers: false
    };
    const action = {
      type: closeCreatePopup.type
    };

    const state = createTicketBoardSlice(initialState, action);

    expect(state).toEqual(expectEventCheckingState);
  });
});

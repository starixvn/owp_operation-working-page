import copySlice, {
  copyElement,
  highlightElement,
  resetCopyInfo
} from './copySlice';

describe('copySlice under test', () => {
  it('should return the initial state', () => {
    expect(copySlice(undefined, {})).toEqual({
      isCopying: false,
      copiedValue: {},
      highlightedCell: {
        rowId: null,
        isTakeOver: false
      }
    });
  });
  describe('copyElement under test', () => {
    it('should handle update state isCopying, copiedValue', () => {
      const initialState = {
        isCopying: false,
        copiedValue: {
          HDP: '',
          OU: ''
        },
        highlightedCell: {
          rowId: null,
          isTakeOver: false
        }
      };

      const expectState = {
        isCopying: true,
        copiedValue: {
          HDP: 'starix14',
          OU: 'starix16'
        },
        highlightedCell: {
          rowId: null,
          isTakeOver: false
        }
      };

      const action = {
        type: copyElement.type,
        payload: {
          copiedValue: { HDP: 'starix14', OU: 'starix16' },
          isCopying: true
        }
      };

      const state = copySlice(initialState, action);

      expect(state).toEqual(expectState);
    });
  });

  describe('highlightElement under test', () => {
    it('should handle highlightElement reducer', () => {
      const initialState = {
        isCopying: false,
        copiedValue: {
          HDP: 'starix14',
          OU: 'starix16'
        },
        highlightedCell: {
          rowId: null,
          isTakeOver: false
        }
      };

      const expectState = {
        isCopying: false,
        copiedValue: {
          HDP: 'starix14',
          OU: 'starix16'
        },
        highlightedCell: {
          rowId: 1,
          isTakeOver: true
        }
      };

      const action = {
        type: highlightElement.type,
        payload: {
          highlightedCell: {
            rowId: 1,
            isTakeOver: true
          }
        }
      };

      const state = copySlice(initialState, action);

      expect(state).toEqual(expectState);
    });
  });

  describe('reset under test', () => {
    it('should handle reset reducer', () => {
      const initialState = {
        isCopying: false,
        copiedValue: {
          HDP: '',
          OU: ''
        },
        highlightedCell: {
          isTakeOver: false,
          PreMatchLeagueId: 1
        }
      };

      const expectState = {
        isCopying: false,
        copiedValue: {},
        highlightedCell: {
          isTakeOver: false,
          PreMatchLeagueId: null
        }
      };

      const action = {
        type: resetCopyInfo.type
      };

      const state = copySlice(initialState, action);

      expect(state).toEqual(expectState);
    });
  });
});

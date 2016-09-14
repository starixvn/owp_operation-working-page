import { createSlice } from '@reduxjs/toolkit';

const copySlice = createSlice({
  name: 'copy',
  initialState: {
    isCopying: false,
    copiedValue: {},
    highlightedCell: {
      rowId: null,
      isTakeOver: false
    }
  },
  reducers: {
    copyElement: {
      reducer: (state, action) => {
        const { copiedValue, isCopying } = action.payload;
        state.isCopying = isCopying;
        state.copiedValue = copiedValue;
      }
    },
    highlightElement: {
      reducer: (state, action) => {
        const { highlightedCell } = action.payload;
        state.highlightedCell = highlightedCell;
        state.isCopying = false;
      }
    },
    resetCopyInfo: {
      reducer: state => {
        state.highlightedCell.PreMatchLeagueId = null;
        state.highlightedCell.isTakeOver = false;
        state.copiedValue = {};
        state.isCopying = false;
      }
    }
  }
});

const { actions, reducer } = copySlice;
const { copyElement, highlightElement, resetCopyInfo } = actions;
export { copyElement, highlightElement, resetCopyInfo };
export default reducer;

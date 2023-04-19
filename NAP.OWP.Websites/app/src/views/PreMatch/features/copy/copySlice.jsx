import { createSlice } from '@reduxjs/toolkit';

const copySlice = createSlice({
  name: 'copy',
  initialState: {
    isCopying: false,
    copiedValue: [],
    rowStart: null,
    rowEnd: null,
    highlightedCell: {
      PreMatchLeagueId: [],
      isTakeOver: false
    }
  },
  reducers: {
    copyElement: {
      reducer: (state, action) => {
        const { copiedValue, isCopying, leagueIndex, rowIndex } =
          action.payload;
        state.isCopying = isCopying;
        state.copiedValue.push({
          value: copiedValue,
          rowIndex
        });
        state.copiedValue = state.copiedValue.sort(
          (src, dest) => src.rowIndex - dest.rowIndex
        );
        const { rowStart, rowEnd } = state;
        if (!rowStart) {
          state.rowStart = leagueIndex;
          state.rowEnd = leagueIndex;
        }
        if (leagueIndex < rowStart) {
          state.rowStart = leagueIndex;
        }
        if (leagueIndex > rowEnd) {
          state.rowEnd = leagueIndex;
        }
      }
    },
    highlightElement: {
      reducer: (state, action) => {
        const { PreMatchLeagueId, isTakeOver } = action.payload;
        state.highlightedCell.PreMatchLeagueId.push(PreMatchLeagueId);
        state.isCopying = false;
        if (isTakeOver !== state.highlightedCell.isTakeOver) {
          state.highlightedCell.PreMatchLeagueId = [];
          state.highlightedCell.PreMatchLeagueId.push(PreMatchLeagueId);
          state.highlightedCell.isTakeOver = isTakeOver;
        }
      }
    },
    resetCopyInfo: {
      reducer: state => {
        state.highlightedCell.PreMatchLeagueId = [];
        state.highlightedCell.isTakeOver = false;
        state.copiedValue = [];
        state.rowStart = [];
        state.rowEnd = [];
        state.isCopying = false;
      }
    }
  }
});

const { actions, reducer } = copySlice;
const { copyElement, highlightElement, resetCopyInfo } = actions;
export { copyElement, highlightElement, resetCopyInfo };
export default reducer;

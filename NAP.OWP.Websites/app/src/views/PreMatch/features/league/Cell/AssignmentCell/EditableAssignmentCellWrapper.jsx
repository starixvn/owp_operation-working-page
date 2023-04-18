import React from 'react';
import PropTypes from 'prop-types';
import EditableAssignmentCell from './EditableAssignmentCell';
import { buildClassNameAssignmentCell } from '../../../../helper/preMatchHelper';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { copyElement, highlightElement } from '../../../copy/copySlice';
import {
  pasteCopiedValue,
  pasteCopiedMultipleValue
} from '../../shiftSlice/shiftSlice';
import { isTakeOver, notificationContent, prepareValueCopy } from './Helper';
import { Cell } from 'fixed-data-table-2';

const propTypes = {
  columnId: PropTypes.string.isRequired,
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const EditableAssignmentCellWrapper = props => {
  const copyModel = useSelector(state => state.copy);
  const { dataSource, rowIndex, columnId } = props;
  const { highlightedCell, isCopying, ...rest } = copyModel;
  const { PreMatchLeagueId, InfoSiteMatchId, LeagueName } =
    dataSource[rowIndex];
  const dispatch = useDispatch();
  console.log(rowIndex + '' + LeagueName);
  const handleCopy = e => {
    e.stopPropagation();

    if (e.ctrlKey) {
      dispatch(
        highlightElement({
          PreMatchLeagueId,
          isTakeOver: isTakeOver(columnId)
        })
      );

      dispatch(
        copyElement({
          copiedValue: prepareValueCopy(dataSource[rowIndex], columnId),
          leagueId: PreMatchLeagueId,
          isCopying: true
        })
      );
      toast.success(notificationContent('Press ESC to exit Copy assignment'), {
        position: 'top-right',
        autoClose: true
      });
    }
    const copyProp = {
      ...rest,
      rowIndex,
      isTakeOver: isTakeOver(columnId)
    };

    if (isCopying && e.altKey) {
      dispatch(pasteCopiedMultipleValue(copyProp));
    } else if (isCopying && !e.ctrlKey) {
      dispatch(pasteCopiedValue(copyProp));
    }
  };

  const isHighlight =
    highlightedCell.PreMatchLeagueId.some(id => id === PreMatchLeagueId) &&
    (highlightedCell.isTakeOver ? isTakeOver(columnId) : !isTakeOver(columnId));

  if (InfoSiteMatchId) {
    return <Cell className='cell-empty' />;
  }
  return (
    <div onClick={e => handleCopy(e)}>
      <EditableAssignmentCell
        {...props}
        hightLightClassName={buildClassNameAssignmentCell(
          isHighlight,
          isCopying
        )}
      />
    </div>
  );
};

EditableAssignmentCellWrapper.propTypes = propTypes;
export default EditableAssignmentCellWrapper;

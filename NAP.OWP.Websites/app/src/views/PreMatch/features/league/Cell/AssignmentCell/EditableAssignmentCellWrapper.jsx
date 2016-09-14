import React from 'react';
import PropTypes from 'prop-types';
import EditableAssignmentCell from './EditableAssignmentCell';
import { buildClassNameAssignmentCell } from '../../../../helper/preMatchHelper';
import { useSelector, useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import { toast } from 'react-toastify';
import { copyElement, highlightElement } from '../../../copy/copySlice';
import { pasteCopiedValue } from '../../shiftSlice/shiftSlice';
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
  const { highlightedCell, isCopying, copiedValue } = copyModel;
  const { PreMatchLeagueId, InfoSiteMatchId } = dataSource[rowIndex];
  const dispatch = useDispatch();

  const handelCopy = e => {
    e.stopPropagation();

    if (e.ctrlKey) {
      const valueCopied = prepareValueCopy(dataSource[rowIndex], columnId);
      const highlightedModel = {
        PreMatchLeagueId,
        isTakeOver: isTakeOver(columnId)
      };

      dispatch(
        highlightElement({
          highlightedCell: highlightedModel
        })
      );

      toast.success(notificationContent('Press ESC to exit Copy assignment'), {
        position: 'top-right',
        autoClose: true
      });
      dispatch(
        copyElement({
          copiedValue: valueCopied,
          isCopying: true
        })
      );
    }

    if (isCopying && !e.ctrlKey) {
      const position = {
        rowIndex,
        isTakeOver: isTakeOver(columnId)
      };
      const pastedModel = Object.assign(position, copiedValue);
      dispatch(pasteCopiedValue(pastedModel));
    }
  };

  const isHighlight =
    isEqual(highlightedCell.PreMatchLeagueId, PreMatchLeagueId) &&
    (highlightedCell.isTakeOver ? isTakeOver(columnId) : !isTakeOver(columnId));

  if (InfoSiteMatchId) {
    return <Cell className='cell-empty' />;
  }
  return (
    <div onClick={e => handelCopy(e)}>
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

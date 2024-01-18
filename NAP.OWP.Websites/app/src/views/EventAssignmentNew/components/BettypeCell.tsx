import React from 'react';
import { buildAssignment } from '../helper/assignmentHelper';
import EditableButtonGroup from '../../components/Assignment/EditableButtonGroup';
import { TAssignment, TAssignmentBuilder, TBettype } from '../type/type';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import EditableButtonBase from '../../components/Assignment/EditableButtonBase';
import {
  onUpdatedAssignment,
  onDeletedAssignment
} from '../table/eventAssignmentTableSlice';
import Utils from '../../Shared/Utils';

const BettypeCell = (props: TAssignmentBuilder) => {
  const policy = useAppSelector(state => state.policy.entities);
  const dispatch = useAppDispatch();
  const filterDate = useAppSelector(
    state => state.filter.filterState.selectedDate
  );

  const assignment = buildAssignment(props, policy);
  const {
    keyIndex,
    policyForBetType,
    main,
    others,
    assignmentBetType,
    isAllowAdd,
    otherTime
  } = assignment;

  const { bettypeName, rowIndex } = props;
  const handleOnSavedAssignment = (
    assignmentUpdate: TAssignment,
    bettypeName: TBettype,
    rowIndex: number
  ) => {
    dispatch(
      onUpdatedAssignment({
        assignment: assignmentUpdate,
        bettypeName,
        rowIndex
      })
    );
  };

  const handleOnDeletedAssignment = (
    assignmentUpdate: TAssignment,
    bettypeName: TBettype,
    rowIndex: number
  ) => {
    dispatch(
      onDeletedAssignment({
        assignment: assignmentUpdate,
        bettypeName,
        rowIndex
      })
    );
  };

  return (
    <EditableButtonBase
      key={keyIndex}
      policy={policyForBetType}
      filterDate={Utils.formatDate(filterDate)}
      main={main}
      others={others}
      matchId={main.oWPMatchId}
      betType={assignmentBetType}
      isAllowAdd={isAllowAdd}
      index={keyIndex}
      columnName={bettypeName}
      rowIndex={rowIndex}
      onSaved={handleOnSavedAssignment}
      onDeleted={handleOnDeletedAssignment}
      otherTime={otherTime}
    />
  );
};

export default BettypeCell;

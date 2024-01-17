
import React from 'react';
import { buildAssignment } from '../helper/assignmentHelper';
import EditableButtonGroup from '../../components/Assignment/EditableButtonGroup';
import { TAssignmentBuilder } from '../type/type';

const BettypeCell = (props: TAssignmentBuilder) => {
  const assignment = buildAssignment(props);
  const {
    keyIndex,
    policyForBetType,
    main,
    others,
    assignmentBetType,
    isAllowAdd,
    otherTime
  } = assignment;

  const { bettypeName, rowIndex, onSavedAssignment, onDeletedAssignment } =
    props;

  return (
    <EditableButtonGroup
      key={keyIndex}
      policy={policyForBetType}
      main={main}
      others={others}
      matchId={main.oWPMatchId}
      betType={assignmentBetType}
      isAllowAdd={isAllowAdd}
      index={keyIndex}
      columnName={bettypeName}
      rowIndex={rowIndex}
      onSaved={onSavedAssignment}
      onDeleted={onDeletedAssignment}
      otherTime={otherTime}
    />
  );
};

export default BettypeCell;

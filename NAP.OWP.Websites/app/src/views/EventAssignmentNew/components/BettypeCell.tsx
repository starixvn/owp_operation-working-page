import React from 'react';
import { buildAssignment } from '../helper/assignmentHelper';
import EditableButtonGroup from '../../components/Assignment/EditableButtonGroup';
import { TAssignmentBuilder } from '../type/type';
import { useAppSelector } from '../app/hooks';

const BettypeCell = (props: TAssignmentBuilder) => {
  // const policy = useAppSelector(state => state.policy.entities);

  // const assignment = buildAssignment(props, policy);
  // const {
  //   keyIndex,
  //   policyForBetType,
  //   main,
  //   others,
  //   assignmentBetType,
  //   isAllowAdd,
  //   otherTime
  // } = assignment;

  // const { bettypeName, rowIndex, onSavedAssignment, onDeletedAssignment } =
  //   props;

  return (
    <h5>hehe </h5>

    // <EditableButtonGroup
    //   key={keyIndex}
    //   policy={policyForBetType}
    //   main={main}
    //   others={others}
    //   matchId={main.oWPMatchId}
    //   betType={assignmentBetType}
    //   isAllowAdd={isAllowAdd}
    //   index={keyIndex}
    //   columnName={bettypeName}
    //   rowIndex={rowIndex}
    //   onSaved={onSavedAssignment}
    //   onDeleted={onDeletedAssignment}
    //   otherTime={otherTime}
    // />
  );
};

export default BettypeCell;

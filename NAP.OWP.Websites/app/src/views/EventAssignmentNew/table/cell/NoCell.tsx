import React from 'react';
import { TCellModel } from '../../type/type';
import AbsencePersonIcon from '../../../../assets/svg-element/AbsencePersonIcon';
import { UncontrolledTooltip } from 'reactstrap';
import { isEqual } from 'lodash';
import { MATCH_STATUS } from '../../const.json';
import { LinkIcon, LinkOffIcon } from 'mdi-react';

const {
  LIVE,
  IN_PLAY,
  POSTPONED
} = MATCH_STATUS;

const NoCell = (props: TCellModel) => {
  const { rowIndex, dataSource } = props;
  const { isShowAbsenceIcon,
    matchNo,
    matchStatus,
    infoSiteMatchId,
    isInfoSiteLinked,
    isLiveStatusSynchronized
  } = dataSource[rowIndex];

  const renderInfoSiteLinked = () => {
    if (isLiveStatusSynchronized &&
      [IN_PLAY, LIVE, POSTPONED].some(status => isEqual(matchStatus, status))
    ) {
      return <span className='badge-label match-status'>LIVE</span>;
    }

    return isInfoSiteLinked ?
      <LinkIcon color='#00920A' size={15} />
      :
      <LinkOffIcon color='#FF0000' size={15} />;
  };

  return (
    <div className='match-no'>
      {isShowAbsenceIcon && <AbsencePersonIcon />}
      <span className='match-number'>{matchNo}</span>
      <span id={`InfoSite${rowIndex}`} className='icon-validInfoSiteId'>
        {renderInfoSiteLinked()}
      </span>
      <UncontrolledTooltip placement='right' target={`InfoSite${rowIndex}`}>
        InfositeId: {infoSiteMatchId}
      </UncontrolledTooltip>

      {!isEqual(matchStatus, LIVE) && (
        <>
          <span
            id={`MatchStatus${rowIndex}`}
            className={`icon-status icon-${matchStatus.toLowerCase()}`}
          />
          <UncontrolledTooltip
            placement='right'
            target={`MatchStatus${rowIndex}`}>
            {matchStatus}
          </UncontrolledTooltip>
        </>
      )}
    </div>
  );
};

export default NoCell;
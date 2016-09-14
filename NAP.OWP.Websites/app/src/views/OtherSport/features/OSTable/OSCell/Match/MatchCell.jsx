import React from 'react';
import PropTypes from 'prop-types';
import { TooltipText } from '../../../../../Shared/common/Tooltip';
import Utils from '../../../../../Shared/Utils';
import { formatTime } from '../../../../../Shared/DateTime/dateTimeHelper';
const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

export const MatchCell = props => {
  const { dataSource, rowIndex } = props;

  const {
    away,
    homeName,
    matchOffer,
    autoLink,
    dateTime,
    league,
    adminsiteMatchId,
    iptv,
    wb,
    sport,
    provider
  } = dataSource[rowIndex];

  const dateTimeFormated = formatTime(
    dateTime,
    'minute',
    'MMM DD - hh:mm A'
  );
  const handleCopy = () => {
    const text = `Sport: ${sport}\nK.O Time: ${dateTimeFormated}\nLeague: ${league}\nMatch: ${homeName} -vs- ${away}\nMatch ID: ${adminsiteMatchId ??
      ''}\nIPTV/Streaming: ${getIpTvStreamingInfo()}\nProvider: ${provider}`;

    window.executeCopy(text);
  };

  const getIpTvStreamingInfo = () => [iptv, wb].filter(Boolean).join('/');

  const renderAutoLink = content => {
    const autoLinkContent =
      Utils.toLowerCaseForFilter(content) === 'yes' ? 'Auto Link' : content;
    return <span className='auto-link'>{autoLinkContent}</span>;
  };

  return (
    <div className='match-cell'>
      <TooltipText
        text={
          <div className='match-content'>
            <div className='home'>{homeName}</div>
            <div className='away'>{away}</div>{' '}
          </div>
        }
        toolTipContent={`${homeName} -vs- ${away}`}
        innerClassName='home-away'
        rowIndex={rowIndex}
      />

      <div className='label'>
        {matchOffer && (
          <TooltipText
            text={<span className='match-offer'>{matchOffer}</span>}
            toolTipContent={matchOffer}
            rowIndex={rowIndex}
            innerClassName='match-offer'
          />
        )}

        {autoLink && (
          <TooltipText
            text={renderAutoLink(autoLink)}
            toolTipContent={renderAutoLink(autoLink)}
            rowIndex={rowIndex}
            innerClassName='auto-link'
          />
        )}
      </div>
      <div className='copy-info'>
        <button onClick={handleCopy} className='copy-btn btn btn-primary'>
          <span className='icon-content_copy'></span>
        </button>
      </div>
    </div>
  );
};

MatchCell.propTypes = propTypes;

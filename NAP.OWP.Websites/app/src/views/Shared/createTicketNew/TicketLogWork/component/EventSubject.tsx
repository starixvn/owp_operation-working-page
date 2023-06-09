import { TextField } from '@mui/material';
import { ClearIcon } from 'mdi-react';
import React, { useState } from 'react';
import { get } from '../../../Service/Service';
import { urlGetMatchInfo } from '../../const/const';
import { formatTime } from '../../../DateTime/dateTimeHelper';

type Props = {
  sendMatchInfo: (value: MatchInfo) => void;
};

const EventSubject = ({ sendMatchInfo }: Props) => {
  const [error, setError] = useState('');
  const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null);
  const [input, setInput] = useState('');

  const handleOnBlur = async (adminSiteId: string) => {
    const validAdminSideId = parseInt(adminSiteId);
    if (validAdminSideId) {
      const response = await get({ adminSiteId, url: urlGetMatchInfo });
      setMatchInfo(response?.data);
      setInput(formatTime(response?.data?.koTime, 'minute', 'lll') || '');
      response?.data ? setError('') : setError('Invalid MatchId');
      return;
    }
    setError('Invalid MatchId');
    setMatchInfo(null);
  };

  const resetInput = () => {
    setInput('');
    setError('');
    setMatchInfo(null);
  };
  const handleOnChange = (adminSiteId: string) => {
    const validAdminSideId = parseInt(adminSiteId);
    validAdminSideId && setInput(adminSiteId);
  };
  return (
    <div className='form-createTicket'>
      <div className='left-form'>
        <label
          className='label'
          style={{ marginTop: '10px' }}
          htmlFor='subject'>
          Subject:<span className='required'>*</span>
        </label>
      </div>
      <div className='right-form'>
        <TextField
          id='subject'
          helperText={error}
          error={Boolean(error)}
          margin='normal'
          value={formatTime(matchInfo?.koTime, 'minute', 'lll')}
          onBlur={event => handleOnBlur(event.target.value)}
          variant='standard'
          label={
            matchInfo && (
              <div className='selected-event'>
                <span>{matchInfo.leagueName}</span>
                <span className='league-event-selected'>
                  {matchInfo.homeName} vs {matchInfo.awayName}
                </span>
              </div>
            )
          }
        />
        <button onClick={resetInput}>
          <ClearIcon />
        </button>
      </div>
    </div>
  );
};

export default EventSubject;

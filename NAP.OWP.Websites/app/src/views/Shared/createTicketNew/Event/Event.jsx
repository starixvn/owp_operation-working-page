import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Autocomplete from '@mui/material/Autocomplete';
import { formatTime } from '../../DateTime/dateTimeHelper';
import { useSelector } from 'react-redux';
import useStableDispatch from '../../customHook/useStableDispatch';
import {
  includeSuggestion,
  selectedEvent,
  changeErrorInput,
  setEventChecking,
  setRecipientAssigned
} from '../createTicketBoardSliceNew';
import Service from '../Service';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

const propTypes = {
  typeTicketText: PropTypes.string.isRequired,
  ticketType: PropTypes.number.isRequired
};
const Event = props => {
  const { typeTicketText, ticketType } = props;
  const dispatch = useStableDispatch();
  const inputText = useSelector(state => state.createTicketBoard).valueSearch;

  const { errorInput, eventChecking } = useSelector(
    state => state.createTicketBoard
  );
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventOption, setEventOption] = useState([]);

  const handleChangedAutoComplete = (event, value) => {
    if (value) {
      const assignee = eventChecking.findIndex(
        x => x.eventInfoViewModel[0].owpLeagueId === value.owpLeagueId
      );
      dispatch(setRecipientAssigned(eventChecking[assignee].userViewModel));
    }
    setEventOption(value);
    dispatch(selectedEvent(value));
    dispatch(changeErrorInput(false));
  };
  const filterResult = value => {
    const event = value.map(x => x.eventInfoViewModel);
    const result = event.reduce((a, b) => a.concat(b), []);
    result.sort(
      (a, b) =>
        a.leagueName.localeCompare(b.leagueName) ||
        new Date(a.eventDateTimeGmt8).getTime() -
          new Date(b.eventDateTimeGmt8).getTime()
    );
    return result;
  };
  const handleSearch = event => {
    if (!event.target.value) {
      dispatch(includeSuggestion('undefined'));
      setEventOption([]);
      return;
    }
    dispatch(includeSuggestion(event.target.value));
  };

  useEffect(() => {
    setOptions([eventOption]);
    if (isEmpty(eventOption)) {
      setOpen(false);
    }
  }, [eventOption]);

  useEffect(() => {
    const doGetEvents = async () => {
      const result = await Service.event(inputText, ticketType);
      dispatch(setEventChecking(result.data));
      if (result.data) {
        const optionResult = filterResult(result.data);
        setOptions(optionResult);
      } else {
        setOptions([]);
        setOpen(false);
      }
    };
    if (inputText === 'undefined') {
      return;
    }
    if (inputText.length >= 2) {
      doGetEvents();
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [dispatch, inputText, ticketType]);
  return (
    <>
      <div className='header-popup'>
        <h1> Type: {typeTicketText} </h1>
      </div>
      <div className='form-createTicket'>
        <div className='left-form'>
          <label
            className='label'
            style={{ marginTop: '10px' }}
            htmlFor='subject'>
            Event:<span className='required'>*</span>
          </label>
        </div>
        <div className='right-form'>
          <Badge id='selected-event'>
            <Autocomplete
              id='tags-filled'
              freeSolo
              options={options}
              filterOptions={option => option}
              onChange={handleChangedAutoComplete}
              onInputChange={handleSearch}
              onClose={() => setOpen(false)}
              onOpen={() => {
                if (inputText.length >= 2 && !isEmpty(options[0])) {
                  setOpen(true);
                }
              }}
              open={open}
              getOptionLabel={option => {
                if (!option) {
                  return '';
                }
                return option.homeName
                  ? `${formatTime(option.eventDateTimeGmt8, 'minute', 'lll')}`
                  : `${option.leagueName}`;
              }}
              renderInput={params => (
                <TextField
                  helperText={errorInput ? 'This field is required' : ''}
                  error={errorInput}
                  {...params}
                  label={
                    eventOption &&
                    eventOption.length !== 0 &&
                    !eventOption.isLeague ? (
                      <div className='selected-event'>
                        <span>{eventOption.leagueName}</span>
                        <span className='league-event-selected'>
                          {eventOption.homeName} vs {eventOption.awayName}
                        </span>
                      </div>
                    ) : (
                      ''
                    )
                  }
                  margin='normal'
                  variant='standard'
                />
              )}
              renderOption={(optionProps, option, state) => {
                if (option && option.homeName) {
                  return (
                    <div {...optionProps} key={state.index}>
                      <div className='event-option'>
                        <div className='league-name'>{option.leagueName}</div>
                        <div className='league-event'>
                          {option.homeName}&nbsp;vs&nbsp;{option.awayName}
                        </div>
                        <div className='league-time'>
                          {' '}
                          {`${formatTime(
                            option.eventDateTimeGmt8,
                            'minute',
                            'lll'
                          )}`}
                        </div>
                      </div>
                    </div>
                  );
                }
                if (option && !option.homeName && option.leagueName) {
                  return (
                    <div {...optionProps} key={state.index}>
                      <div className='league-name'>{option.leagueName}</div>
                    </div>
                  );
                }
                return <div key={state.index}></div>;
              }}
            />
          </Badge>
        </div>
      </div>
    </>
  );
};
Event.propTypes = propTypes;
export default Event;

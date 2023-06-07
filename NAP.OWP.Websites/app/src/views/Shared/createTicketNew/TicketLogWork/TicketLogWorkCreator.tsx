import React, { useEffect, useState } from 'react';
import Header from './component/Header';
import Subject from './component/Subject';
import { getSubTypeByType } from '../Helper/HelperCreateTicket';
import Subtype from './component/Subtype';
import { STATUS, subtypeDefault } from './constant.json';
import Status from './component/Status';
import Recipient from './component/Recipient';
import Comment from './component/Comment';
import Attachments from '../Attachments/Attachments';
import ButtonGroup from './component/ButtonGroup';
const TicketLogWorkCreator = () => {
  const [subject, setSubject] = useState('');
  const [errorSubject, setErrorSubject] = useState('');
  const [subTypeOption, setSubTypeOption] = useState<SubTypeOption[]>([]);
  const [subTypeSelected, setSubtypeSelected] =
    useState<SubTypeOption>(subtypeDefault);
  const [statusSelected, setStatusSelected] = useState<StatusOption>(STATUS[1]);
  const [recipient, setRecipient] = useState<Recipient[]>([]);
  const [comment, setComment] = useState('');
  const [selectedFiles, setSelectedFiles] = useState();

  useEffect(() => {
    (async () => {
      const subType: SubType[] = await getSubTypeByType(5);
      const option = subType.map(
        ({ subTypeId: value, subTypeName: label }) => ({
          value,
          label
        })
      );
      setSubTypeOption([...option, { value: 0, label: 'Others' }]);
    })();
  }, []);

  const handleOnSubmit = () => {
    console.log('submit');
  };

  const handleOnClosePopup = () => {
    console.log('close popup');
  };

  return (
    <div className='chat-board-popup' id='create-ticket-other-popup'>
      <Header ticketHeader='Log Work' />
      <div className='log-work'>
      <div className='subtype-status'>
      <Subtype
        options={subTypeOption}
        handleChangeSubType={value =>
          setSubtypeSelected(value as SubTypeOption)
        }
        selected={subTypeSelected}
      />
      <Status
        options={STATUS}
        selected={statusSelected}
        handleOnChange={value => setStatusSelected(value as StatusOption)}
      />
      </div>
      <Subject
        errorValue={errorSubject}
        subjectValue={subject}
        handleOnChangeSubject={value => setSubject(value)}
      />
      <Recipient
        isErrorRecipient={false}
        handleOnErrorSubmit={() => console.log()}
        handleOnChange={() => console.log()}
        selectedRecipients={recipient}
      />
      <Comment comment={comment} handleOnChange={value => setComment(value)} />
      <Attachments
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <ButtonGroup
        handleOnClosePopup={handleOnClosePopup}
        handleSubmit={handleOnSubmit}
      />
      </div>
    </div>
  );
};

export default TicketLogWorkCreator;

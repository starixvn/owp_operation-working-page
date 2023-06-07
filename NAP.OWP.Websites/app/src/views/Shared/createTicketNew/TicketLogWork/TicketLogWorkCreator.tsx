import React, { useEffect, useState } from 'react';
import useStableDispatch from '../../customHook/useStableDispatch';
import Header from './component/Header';
import Subject from './component/Subject';
import {
  formatRecipientModel,
  getRecipientDefaultBySubType,
  getSubTypeByType,
  informResult,
  saveFileToBackEnd
} from '../Helper/HelperCreateTicket';
import Subtype from './component/Subtype';
import { STATUS } from './constant.json';
import Status from './component/Status';
import Recipient from './component/Recipient';
import Comment from './component/Comment';
import Attachments from '../Attachments/Attachments';
import ButtonGroup from './component/ButtonGroup';
import { getSubjectBySubtype, isMatchCheckType } from './LogWorkHelper';
import { useSelector } from 'react-redux';
import { closePopupLogWork } from './../createTicketBoardSliceNew';
import { post } from '../../Service/Service';
import { urlRequestLogWork } from '../const/const';

const TicketLogWorkCreator = ({ creatorInfo }: LogWorkProps) => {
  const [subject, setSubject] = useState('');
  const [errorSubject, setErrorSubject] = useState('');
  const [subTypeOption, setSubTypeOption] = useState<SubTypeOption[]>([]);
  const [subTypeSelected, setSubtypeSelected] = useState<SubTypeOption>();
  const [statusSelected, setStatusSelected] = useState<StatusOption>(STATUS[1]);
  const [recipient, setRecipient] = useState<Recipient[]>([]);
  const [comment, setComment] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isErrorRecipient, setErrorRecipient] = useState(false);

  const { isOpenLogWork } = useSelector(
    (state: any) => state.createTicketBoard
  );
  const dispatch = useStableDispatch();

  useEffect(() => {
    (async () => {
      const subType: SubType[] = await getSubTypeByType(5);
      const option = subType.map(
        ({ subTypeId: value, subTypeName: label }) => ({
          value,
          label
        })
      );
      const subTypeDefault = option.find(x => x.label === 'Others');
      const recipientDefault = await getRecipientDefaultBySubType(
        subTypeDefault?.value
      );

      setSubTypeOption(option);
      setSubtypeSelected(subTypeDefault);
      setRecipient(recipientDefault);
      setSubject(subTypeDefault!.label);
    })();
  }, []);

  const handleOnChangeSubtype = async (subtype: SubTypeOption | null) => {
    setSubtypeSelected(subtype!);
    const recipientBySubtype = await getRecipientDefaultBySubType(
      subtype?.value
    );
    setRecipient(recipientBySubtype);
    setSubject(getSubjectBySubtype(subtype!));
  };

  const handleOnSubmit = async () => {
    if (
      !recipient.length ||
      (!isMatchCheckType(subTypeSelected!) &&
        (!subject.length || subject.length > 200))
    ) {
      !recipient.length && setErrorRecipient(true);
      !subject.length && setErrorSubject('This field is required');
      subject.length > 200 &&
        setErrorSubject('The maximum of characters is 200. Please try again');
      return;
    }

    setErrorSubject('');
    const Recipients = formatRecipientModel(recipient, creatorInfo);
    const resultSaveFile =
      selectedFiles.length && (await saveFileToBackEnd(selectedFiles));
    const newAddModel = {
      Files: resultSaveFile || [],
      CreatorId: creatorInfo.recipientId,
      Subject: subject,
      Recipients,
      Message: comment,
      SubType: subTypeSelected?.value,
      TicketType: 5,
      url: urlRequestLogWork
    };
    const result = await post(newAddModel);
    informResult(result);
  };

  return (
    isOpenLogWork && (
      <div className='chat-board-popup' id='create-ticket-other-popup'>
        <Header
          ticketHeader='Ticket Log Work'
          handleClosePopup={() => dispatch(closePopupLogWork(false))}
        />
        <div className='log-work'>
          <div className='subtype-status'>
            <Subtype
              options={subTypeOption}
              handleChangeSubType={handleOnChangeSubtype}
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
            handleOnChangeSubject={value => {
              setSubject(value);
              setErrorSubject('');
            }}
          />
          <Recipient
            isErrorRecipient={isErrorRecipient}
            handleOnErrorSubmit={error => setErrorRecipient(error)}
            handleOnChange={value => setRecipient(value)}
            selectedRecipients={recipient}
          />
          <Comment
            comment={comment}
            handleOnChange={value => setComment(value)}
          />
          <Attachments
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
          <ButtonGroup
            handleOnClosePopup={() => dispatch(closePopupLogWork(false))}
            handleSubmit={handleOnSubmit}
          />
        </div>
      </div>
    )
  );
};

export default TicketLogWorkCreator;

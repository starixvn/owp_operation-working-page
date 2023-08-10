import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MessageList from './Message/MessageList';
import InputMessage from './Message/InputMessage';
import useStableDispatch from '../customHook/useStableDispatch';
import { useSelector } from 'react-redux';
import {
  closePopup,
  createNewMessage,
  setMessage,
  setModelQuoteMessage
} from './chatBoardSlice';
import TicketDetailHeader from './TicketDetailHeader';
import Axios from 'axios';
import { URL, TicketStatus as TicketStatusConst } from './const/index.json';
import {
  getTicketTitle,
  validateFileExtension,
  validateFileSize
} from './helper/chatBoardHelper';
import DragAndDrop from '../common/DragAndDrop/DragAndDrop';
import ToastsWrapper from '../../components/ToastrWrapper';
import {
  NET_CORE_FILE_UPLOAD,
  NET_FW_FILE_UPLOAD
} from '../../Shared/Constants';
import { updateTicketStatus } from './chatBoardThunkNative';
import isEqual from 'lodash.isequal';
import TicketDetailInformation from './TicketDetailInformation';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from 'mdi-react';

const TicketDetail = ({ policy = 'policy' }) => {
  const dispatch = useStableDispatch();
  const { permission } = useSelector(state => state[policy]);
  const { HasWrite } = permission;
  const [isExpandInfo, setIsExpandInfo] = useState(false);
  const {
    ticketDetail,
    inputMessage,
    ticketSubTypeOptions,
    modelQuoteMessage
  } = useSelector(state => state.chatBoard);
  const { ticketId } = ticketDetail;

  const { messageId } = modelQuoteMessage;

  const handleOnClickClosePopUp = () => {
    dispatch(closePopup());
  };

  const renderCloseBtn = () => (
    <span
      data-testid='close-testId'
      className='close-chat-board-popup'
      onClick={handleOnClickClosePopUp}
    />
  );

  const handleSendMessage = async (event, fileId, fileName) => {
    event.preventDefault();

    let newMessage = {
      ticketId: ticketDetail.ticketId,
      ticketEventType: ticketDetail.eventType,
      ticketTitle: getTicketTitle(ticketDetail),
      message: inputMessage,
      actorId: permission.ActorId,
      fileId: '',
      quoteMessageId: messageId
    };

    if (fileId) {
      newMessage = {
        ...newMessage,
        fileId,
        message: fileName
      };
    }

    if (!newMessage.message) {
      return;
    }

    dispatch(setMessage(''));
    dispatch(setModelQuoteMessage({}));
    const actionResult = await dispatch(createNewMessage(newMessage));

    if (createNewMessage.rejected.match(actionResult)) {
      ToastsWrapper.showError(actionResult.payload);
      return;
    }
    if (isEqual(ticketDetail.ticketStatus, TicketStatusConst.Closed)) {
      const model = {
        ticketId: ticketDetail.ticketId,
        ticketStatus: TicketStatusConst.Open,
        actorId: permission.ActorId
      };
      await dispatch(updateTicketStatus(model));
    }
  };

  const handleSendFile = async (event, file) => {
    if (!validateFileExtension(file.name)) {
      ToastsWrapper.showError('File extension not allowed!');
    } else if (!validateFileSize(file.size)) {
      ToastsWrapper.showError(
        "The file's size should not larger than 5MB. Try another one"
      );
    } else {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const url =
        process.env.NODE_ENV === 'development'
          ? `${NET_CORE_FILE_UPLOAD}/${URL.UPLOAD_FILE}`
          : `${window.netCoreRootUrl}/${NET_FW_FILE_UPLOAD}/${URL.UPLOAD_FILE}`;

      const { data } = await Axios.post(url, formData);

      await handleSendMessage(event, data, file.name);
    }
  };

  useEffect(() => {
    setIsExpandInfo(false);
  }, [ticketId]);

  return (
    <div className='chat-board-popup'>
      <DragAndDrop onDrop={handleSendFile}>
        <div className='chatBoard-Header'>
          {renderCloseBtn()}
          <div className='ticket-header'>
            <TicketDetailHeader {...ticketDetail} />
          </div>
        </div>
        <div className='chatBoard-info'>
          {isExpandInfo ? (
            <>
              <div className='show-info' onClick={() => setIsExpandInfo(false)}>
                <KeyboardArrowUpIcon />
                <p>Show less ticket information</p>
              </div>
              <TicketDetailInformation
                policy={policy}
                ticketSubTypeOptions={ticketSubTypeOptions}
                permission={permission}
                ticketDetail={ticketDetail}
              />
            </>
          ) : (
            <div className='show-info' onClick={() => setIsExpandInfo(true)}>
              <KeyboardArrowDownIcon />
              <p>Show more ticket information</p>
            </div>
          )}
        </div>
        <MessageList policy={policy} ticketId={ticketId} />
        {HasWrite && (
          <InputMessage
            handleSendFile={handleSendFile}
            handleSendMessage={handleSendMessage}
          />
        )}
      </DragAndDrop>
    </div>
  );
};
TicketDetail.propTypes = {
  policy: PropTypes.string
};
export default TicketDetail;

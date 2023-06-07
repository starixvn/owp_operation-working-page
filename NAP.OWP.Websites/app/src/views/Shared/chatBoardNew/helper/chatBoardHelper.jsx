import {
  validExtension,
  imageExtension,
  EVENT_TYPE
} from '../const/index.json';

const buildMessageListClassName = (height, isExpandInfo) => {
  const className = 'message-list';
  switch (true) {
    case height <= 350:
      return `${className}-100`;
    case height <= 540:
      return `${className}-150`;
    case height <= 590:
      return `${className}-200`;
    case height <= 640:
      return `${className}-220`;
    case height <= 690:
      return `${className}-240`;
    case height <= 750:
      return `${className}-320`;
    case height <= 970:
      if (isExpandInfo) {
        return `${className}-550`;
      }
      return `${className}-700`;
    default:
      if (isExpandInfo) {
        return `${className}-750`;
      }
      return `${className}-900`;
  }
};

const getExtensionFile = fileName =>
  fileName.substring(fileName.lastIndexOf('.')).toLowerCase().trim();

const isImage = fileName => isContain(imageExtension, fileName);

const validateFileExtension = fileName => isContain(validExtension, fileName);

const isContain = (validExtensionList, fileName) => {
  const fileType = getExtensionFile(fileName);
  return validExtensionList.indexOf(fileType) >= 0;
};

const validateFileSize = size => size / (1024 * 1024) <= 5;

const getTicketTitle = ticket => {
  if (ticket.eventType === EVENT_TYPE.OTHER) {
    return ticket.subject;
  }
  if (ticket.eventType === EVENT_TYPE.MATCH) {
    return `${ticket.owpLeagueName} - ${ticket.homeName}/${ticket.awayName}`;
  }
  if (ticket.eventType === EVENT_TYPE.LOG_WORK) {
    return ticket.eventName
      ? `${ticket.eventName} - ${ticket.homeName}/${ticket.awayName}`
      : ticket.subject;
  }
  return ticket.owpLeagueName;
};

export {
  buildMessageListClassName,
  validateFileExtension,
  validateFileSize,
  getTicketTitle,
  isImage
};

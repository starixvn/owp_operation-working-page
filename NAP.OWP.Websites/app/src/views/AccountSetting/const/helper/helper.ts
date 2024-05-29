import { TQuickMessage } from '../../Type';

const isFileExceed5Mb = (file: File) => {
  const BYTES = 1024;
  const MB_MAX = 5;

  return file.size / (BYTES * BYTES) >= MB_MAX;
};

const isValidQuickMessage = (
  editModel: TQuickMessage,
  quickMessages: TQuickMessage[]
) => {
  const { shortcut, message, id } = editModel;
  if (!shortcut.replace('/', '')) {
    return 'Shortcut is empty';
  }
  if (!message) {
    return 'Message is empty';
  }
  if (quickMessages.some(m => m.shortcut === shortcut && m.id !== id)) {
    return 'Shortcut is duplicate';
  }
  return '';
};

export { isFileExceed5Mb, isValidQuickMessage };

import { TFeedback } from "./type";

const validateInfoCreateFeedback = (info: TFeedback) => {
  const { feedBackInfo } = info;
  const { functionName, inputMessage, selectedFile, selectedImage } = feedBackInfo;
  return (!functionName || (!inputMessage && !selectedFile && !selectedImage))
    ? {
      valid: false,
      message: 'Please input required field'
    }
    : {
      valid: true,
      message: ''
    };
};

export {
  validateInfoCreateFeedback
};

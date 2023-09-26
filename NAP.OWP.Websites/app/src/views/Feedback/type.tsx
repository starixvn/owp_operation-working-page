
enum RateIconEnum {
  DEFAULT = 'default',
  ANGRY = 'angry',
  SAD = 'sad',
  NORMAL = 'normal',
  GOOD = 'good',
  AMAZING = 'amazing'
}

enum StatusEnum {
  FEED_BACK = 'FEED_BACK',
  THANK_YOU = 'THANK_YOU'
}

type TFeedback = {
  feedBackInfo: {
    functionName: Required<string>,
    rate: RateIconEnum,
    inputMessage: string,
    selectedImage: File | null,
    selectedFile: File | null
  },
  statusForm: StatusEnum,
  setRateStatus: (status: RateIconEnum) => void,
  setStatusForm: (status: StatusEnum) => void,
  setFunctionName: (name: string) => void,
  postFeedback: () => Promise<void>,
}

interface SelectOption {
  value: number;
  label: string;
};

export {
  TFeedback,
  RateIconEnum,
  StatusEnum,
  SelectOption
};

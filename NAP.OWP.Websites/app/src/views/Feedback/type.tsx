
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
    functionId: Required<string>,
    rate: RateIconEnum,
  },
  statusForm: StatusEnum,
  setRateStatus: (status: RateIconEnum) => void,
  setStatusForm: (status: StatusEnum) => void,
  postFeedback: () => Promise<void>,
}

export {
  TFeedback,
  RateIconEnum,
  StatusEnum
};

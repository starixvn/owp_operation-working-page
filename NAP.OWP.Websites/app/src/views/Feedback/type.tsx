
enum RateIconEnum {
  DEFAULT = 'default',
  ANGRY = 'angry',
  SAD = 'sad',
  NORMAL = 'normal',
  GOOD = 'good',
  AMAZING = 'amazing'
}

type TFeedback = {
  feedBackInfo: {
    functionName: Required<string>,
    rate: RateIconEnum,
  },
  setRateStatus: (status: RateIconEnum) => void,
}

export {
  TFeedback,
  RateIconEnum
};

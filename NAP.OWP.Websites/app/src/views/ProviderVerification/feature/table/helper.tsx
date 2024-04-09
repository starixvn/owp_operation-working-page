import { TMaxbetSetting } from "../../type/table";

const buildMaxbetItemInOption = (maxbetSetting: TMaxbetSetting) => {
  const { HandicapSetting, OverUnderSetting } = maxbetSetting;
  const isDisplayHDPSetting =
    HandicapSetting?.SpreadToDisplay ?? OverUnderSetting?.SpreadToDisplay;
  const isHDPSpreadExisting = HandicapSetting?.SpreadToDisplay;
  return `${HandicapSetting?.MaxBetToDisplay}${isDisplayHDPSetting ? '(' + HandicapSetting?.SpreadToDisplay : ''}
${OverUnderSetting?.SpreadToDisplay ? (isHDPSpreadExisting ? '-' : '') + OverUnderSetting.SpreadToDisplay
      : ''}
  ${isDisplayHDPSetting ? ')' : ''}`;
};

export { buildMaxbetItemInOption };

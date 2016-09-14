import { FIFA_IMAGE_STORE } from './FlagStore/FIFA';
import {
  FIFA_FLAG,
  PES_FLAG,
  PES_FLAG_21,
  SABA
} from './FlagStore/FlagsCondition';
import { PES_IMAGE_STORE } from './FlagStore/PES';
import { PES_21_IMAGE_STORE } from './FlagStore/PES21';

export const getFlagFromStore = props => {
  const { flagName, flagNameLibrary, flagURL } = props;
  const flagInStore = flagNameLibrary.find(
    f => f.toLowerCase() === flagName.toLowerCase()
  );
  if (flagInStore) {
    return `${flagURL}/${flagInStore}.jpg`;
  }
  return null;
};

export const flagFactory = props => {
  const { flagName, flagInfo } = props;
  switch (flagInfo) {
    case 'FIFA':
      return getFlagFromStore({
        flagName,
        flagNameLibrary: FIFA_IMAGE_STORE,
        flagURL: FIFA_FLAG.rootPath
      });
    case 'PES':
      return getFlagFromStore({
        flagName,
        flagNameLibrary: PES_IMAGE_STORE,
        flagURL: PES_FLAG.rootPath
      });
    case 'PES 21':
      return getFlagFromStore({
        flagName,
        flagNameLibrary: PES_21_IMAGE_STORE,
        flagURL: PES_FLAG_21.rootPath
      });
    default:
      return null;
  }
};

export const createFlag = props => {
  const { flagName, flagInfo } = props;
  const vStringCondition = /[(]V[)]/im;

  const vString = vStringCondition.exec(flagName);

  if (vString) {
    const vStringRight = flagName
      .substring(vString.index + 3, flagName.length)
      .trim();
    const vStringLeft = flagName.substring(0, vString.index + 3).trim();

    if (vStringRight) {
      const notContainChar = /[^0-9]/im;
      const isContainChar = notContainChar.test(vStringRight);
      return isContainChar
        ? null
        : flagFactory({ flagName: vStringLeft, flagInfo });
    }
    return flagFactory({ flagName: vStringLeft, flagInfo });
  }

  return null;
};

export const testRegex = props => {
  const { leagueName, type, condition } = props;
  const regex = RegExp(condition, 'mi');
  const value = regex.test(leagueName);
  if (value) {
    return type;
  }
  return null;
};

export const checkLeague = props => {
  const { leagueName } = props;
  const isSABA = testRegex({
    leagueName,
    ...SABA
  });
  const pes = testRegex({
    leagueName,
    ...FIFA_FLAG
  });
  const pes21 = testRegex({
    leagueName,
    ...PES_FLAG_21
  });
  const fifa = testRegex({
    leagueName,
    ...PES_FLAG
  });

  if (isSABA && pes && fifa) {
    return { isHaveFlag: null, flagInfo: null };
  }

  if (pes21) {
    return { isHaveFlag: true, flagInfo: PES_FLAG_21.type };
  }

  if (isSABA && pes) {
    return { isHaveFlag: true, flagInfo: FIFA_FLAG.type };
  }

  if (isSABA && fifa) {
    return { isHaveFlag: true, flagInfo: PES_FLAG.type };
  }
  return { isHaveFlag: null, flagInfo: null };
};

export const Flag = props => {
  const { leagueName, homeName, awayName } = props;
  const { isHaveFlag, flagInfo } = checkLeague({ leagueName });

  const result = isHaveFlag
    ? {
        awayFlag: createFlag({ flagName: awayName, flagInfo }),
        homeFlag: createFlag({ flagName: homeName, flagInfo }),
        flagInfo
      }
    : null;

  return result;
};

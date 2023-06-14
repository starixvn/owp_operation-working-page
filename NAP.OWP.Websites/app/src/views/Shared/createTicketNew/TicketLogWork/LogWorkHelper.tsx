import { SubTypeOption } from './Type';
import { subtypeMatchCheck } from './logWorkConst.json';

const getSubjectBySubtype = (subtype: SubTypeOption) =>
  subtype.value === subtypeMatchCheck ? '' : subtype.label;

const isMatchCheckType = (subtype: SubTypeOption) =>
  subtype?.value === subtypeMatchCheck;

const isValidMatchId = (matchId: number) => {
  const minInt32Value = -2147483648;
  const maxInt32Value = 2147483647;

  return (
    Number.isInteger(matchId) &&
    matchId >= minInt32Value &&
    matchId <= maxInt32Value
  );
};

export { getSubjectBySubtype, isMatchCheckType, isValidMatchId };

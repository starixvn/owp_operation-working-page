import { SubTypeOption } from './Type';

const getSubjectBySubtype = (subtype: SubTypeOption) =>
  subtype.label.includes('Match Check') ? '' : subtype.label;

const isMatchCheckType = (subtype: SubTypeOption) =>
  subtype?.label?.includes('Match Check');

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

const getSubjectBySubtype = (subtype: SubTypeOption) =>
  subtype.label.includes('Match Check') ? '' : subtype.label;

const isMatchCheckType = (subtype: SubTypeOption) =>
  subtype.label.includes('Match Check');

export { getSubjectBySubtype, isMatchCheckType };

import handleNoOfferAllMatch from '../helper/noOfferAllMatchHelper';
import updateConfirmAllEvent from '../helper/confirmedHelper';

const buildColumnValueByColumnName = (
  columnKey,
  isNoOfferAll,
  isConfirmAll
) => {
  const columnMappings = {
    'No #': {
      checked: isNoOfferAll,
      onCheckChange: handleNoOfferAllMatch
    },
    'Checked': {
      checked: isConfirmAll,
      onCheckChange: updateConfirmAllEvent
    }
  };

  return columnMappings[columnKey] || {};
};

const sortDataAsc = (entities, columnKey) =>
  [...entities].sort((src, dest) => src[columnKey] - dest[columnKey]);

const sortDataDesc = (entities, columnKey) =>
  [...entities].sort((src, dest) => dest[columnKey] - src[columnKey]);

export { buildColumnValueByColumnName, sortDataAsc, sortDataDesc };

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
  [...entities].sort(
    (src, dest) =>
      src[capitalizeFirstLetter(columnKey)] -
      dest[capitalizeFirstLetter(columnKey)]
  );

const sortDataDesc = (entities, columnKey) =>
  [...entities].sort(
    (src, dest) =>
      dest[capitalizeFirstLetter(columnKey)] -
      src[capitalizeFirstLetter(columnKey)]
  );
const capitalizeFirstLetter = value =>
  value.charAt(0).toLowerCase() + value.slice(1);
export { buildColumnValueByColumnName, sortDataAsc, sortDataDesc };

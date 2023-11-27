import handleNoOfferAllMatch from '../helper/noOfferAllMatchHelper';
import updateConfirmAllEvent from '../helper/confirmedHelper';

const passColorRowTable = dataSource => {
  if (!dataSource) {
    return '';
  }
  return `${dataSource.rowColor}-row`;
};

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

export { passColorRowTable, buildColumnValueByColumnName };

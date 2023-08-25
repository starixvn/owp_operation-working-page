
const initDefaultFilterToDate = () => {
  const currentDate = new Date();
  currentDate.setMonth(11);
  return currentDate;
};

const initDefaultFilterFromDate = () => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 2);
  currentDate.setMonth(10);
  return currentDate;
};

const initDefaultFilterDate = () => ({
  defaultFromDate: initDefaultFilterFromDate(),
  defaultToDate: initDefaultFilterToDate()
});

const getMonthDifference = (startDate: Date, endDate: Date) => {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
    + 1
  );
};

export {
  initDefaultFilterDate,
  getMonthDifference
};

/* eslint-disable no-warning-comments */
const initDefaultFilterFromDate = () => {
  const fromYear = new Date().getFullYear() - 2; // NOSONAR
  const fromDate = new Date(fromYear, 11, 1); // NOSONAR

  return fromDate;
};

const initDefaultFilterToDate = () => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, 10, 30); // NOSONAR
};

const initDefaultFilterDate = () => ({
  defaultFromDate: initDefaultFilterFromDate(),
  defaultToDate: initDefaultFilterToDate()
});

const getDaysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const getMonthDifference = (startDate: Date, endDate: Date) => {
  const MONTH_NUMBER = 12;
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    MONTH_NUMBER * (endDate.getFullYear() - startDate.getFullYear()) +
    1
  );
};

export { initDefaultFilterDate, getMonthDifference, getDaysInMonth };

const initDefaultFilterFromDate = () => {
  const fromYear = new Date().getFullYear() - 2;
  const fromDate = new Date(fromYear, 11, 1);
  return fromDate;
};

const initDefaultFilterToDate = () => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, 10, 30);
};

const initDefaultFilterDate = () => ({
  defaultFromDate: initDefaultFilterFromDate(),
  defaultToDate: initDefaultFilterToDate()
});

const getDaysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const getMonthDifference = (startDate: Date, endDate: Date) => {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear()) +
    1
  );
};

export { initDefaultFilterDate, getMonthDifference, getDaysInMonth };

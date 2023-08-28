const initDefaultFilterFromDate = () => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 2);
  currentDate.setMonth(11);
  currentDate.setDate(1);
  return currentDate;
};

const initDefaultFilterToDate = () => {
  const currentDate = new Date();
  currentDate.setMonth(10);
  currentDate.setDate(30);
  return currentDate;
};


const initDefaultFilterDate = () => ({
  defaultFromDate: initDefaultFilterFromDate(),
  defaultToDate: initDefaultFilterToDate()
});

const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

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
  getMonthDifference,
  getDaysInMonth
};

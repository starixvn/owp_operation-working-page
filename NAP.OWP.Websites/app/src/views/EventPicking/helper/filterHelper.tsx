const currentDate = new Date();
const timeRange = {
  maxFeature: 10,
  maxPrevious: 20
};
const maxDate = new Date(currentDate.setDate(currentDate.getDate() + timeRange.maxFeature));
const minDate = new Date(currentDate.setDate(currentDate.getDate() - timeRange.maxPrevious));

export {
  maxDate,
  minDate
};

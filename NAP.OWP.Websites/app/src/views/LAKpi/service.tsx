import { get } from "../Shared/Service/Service";


const queryDataTable = async (fromDate: Date, toDate: Date) => {
  const url = "http://localhost:5000/api/kpi/la";
  const response = await get({
    url,
    fromDate,
    toDate
  });

  return response.data;
};

export {
  queryDataTable
};
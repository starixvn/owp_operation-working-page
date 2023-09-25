import Axios from 'axios';
import { URL } from './const.json';

const transformFunctionResponse = response =>
  response.data.map(data => ({
    value: data.functionId,
    label: data.functionName
  }));

const queryFunction = async () => {
  const url =
    process.env.NODE_ENV === 'development'
      ? `${URL.NET_Core_TICKET_CENTER}/get-function-feedback`
      : `${window.netCoreRootUrl}/${URL.NET_FW_TICKET_CENTER}/get-function-feedback`;
  const response = await Axios.get(url);
  return transformFunctionResponse(response);
};

export { queryFunction };

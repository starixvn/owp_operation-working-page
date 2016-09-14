import axios from 'axios';

const authorize = async functionKey => {
  const response = await axios.post('api/application/authorize', {
    functionKey
  });
  return response.data;
};
const Service = {
  authorize
};

export default Service;

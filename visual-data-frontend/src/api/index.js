import axios from 'axios';

const url = 'https://8syg62n83a.execute-api.eu-north-1.amazonaws.com/dev/vd';

export const fetchData = async () => {
  try {
    const { data } = await axios.get(url);
    console.log('fetchData!')

    return data;
  } catch (error) {

  }
}
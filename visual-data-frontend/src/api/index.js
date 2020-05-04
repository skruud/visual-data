import axios from 'axios';

const url = 'https://www.finn.no/api/search?vertical=job&subvertical=fulltime&extension=&filters=#';

export const fetchData = async () => {
  try {
    const { data: {objectCount, filterWidgets } } = await axios.get(url);

    return {objectCount, filterWidgets};
  } catch (error) {

  }
}
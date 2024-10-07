import BASE_URL from '../apiconfig';
import axios from 'axios';

export const getAttractions = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/attraction/random`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log('관광지 정보 불러오기 에러 : ', error);
  }
};

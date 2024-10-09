import BASE_URL from '../apiconfig';
import axios from 'axios';

// 일지 공유하기
export const shareActivity = async ({
  id,
  token,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/communities/${id}`, {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    console.log('일지 공유 응답 : ', response.data);
  } catch (error) {
    console.log('일지 공유 에러', error);
  }
};

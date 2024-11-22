import axios from 'axios';
import BASE_URL from '../apiconfig';
import useStore from '../../../store/store';

const likeCourse = async courseId => {
  // 상태관리에서 accessToken 가져옴
  const accessToken = useStore.getState().accessToken;

  try {
    const response = await axios.get(`${BASE_URL}/trail/like/${courseId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('like API Error:', error);
    throw error;
  }
};

const unLikeCourse = async courseId => {
  // 상태관리에서 accessToken 가져옴
  const accessToken = useStore.getState().accessToken;

  try {
    const response = await axios.get(`${BASE_URL}/trail/unlike/${courseId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('좋아요 누름');
    return response.data;
  } catch (error) {
    console.error('like API Error:', error);
    throw error;
  }
};

export {likeCourse, unLikeCourse};

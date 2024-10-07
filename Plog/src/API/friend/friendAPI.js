import axios from 'axios';
import BASE_URL from '../apiconfig';

//친구조회
export const getFriendsList = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log('친구 조회 에러 : ', error);
  }
};

//친구요청
export const addFriend = async (token, friendId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/friends/request`,
      {friendId: friendId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log('친구 조회 에러 : ', error);
  }
};

//이메일로 찾기
export const searchWithEmail = async (token, email) => {
  try {
    const response = await axios.get(`${BASE_URL}/friends/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log('친구 조회 에러 : ', error);
  }
};

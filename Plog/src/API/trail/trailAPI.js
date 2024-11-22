import BASE_URL from '../apiconfig';
import useStore from '../../../store/store';
import axios from 'axios';

const token = 'abc';

//위치 기반 플로깅 코스 추천 - 이거 왜 post? 서버랑 협의 필요

//플로깅 코스 리스트 조회
export const getTrails = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/trail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log('플로깅 코스 리스트 조회 에러 : ', error);
  }
};

//플로깅 코스 상세정보 조회
export const getTrailDetail = async (token, trailId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trail/${trailId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(`코스${trailId} 상세정보 조회 에러 : `, error);
  }
};

//코스 좋아요 - 일반적으로 patch사용하는데 상의해봐야할듯
export const likeTrail = async (token, trailId) => {
  try {
    await axios.get(`${BASE_URL}/trail/like/${trailId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('좋아요 에러 : ', error);
  }
};

//코스 좋아요 취소 - 일반적으로 patch사용하는데 상의해봐야할듯
export const unlikeTrail = async (token, trailId) => {
  try {
    axios.get(`${BASE_URL}/unlike/${trailId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('좋아요 취소 에러 : ', error);
  }
};

//사용자 기반 플로깅 코스 추천
export const recommendTrails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trail/recommend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('플로깅 코스 추천 성공 : ', response);
  } catch (error) {
    console.log('사용자 기반 플로깅 코스 추천 에러 : ', error);
  }
};

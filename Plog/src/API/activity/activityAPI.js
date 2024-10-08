import BASE_URL from '../apiconfig';
import useStore from '../../../store/store';
import axios from 'axios';

//해당 멤버 일지 전체 조회
export const getAcitivities = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('멤버 일지 전체 조회 응답 : ', response);
    return response.data.data;
  } catch (error) {
    console.log('멤버 일지 전체 조회 에러', error);
  }
};

//플로깅 일지 기록
export const postActivity = async ({
  trailId,
  lat,
  lon,
  totalTime,
  review,
  score,
  title,
  totalDistance,
  totalKcal,
  locationName,
  images,
  token,
}) => {
  const formData = new FormData();
  const today = new Date().toISOString().slice(0, -1);

  lat.forEach((latitude, index) => formData.append(`lat[]`, String(latitude)));
  lon.forEach((longitude, index) => formData.append(`lon[]`, String(longitude)));
  
  formData.append('trailId', String(trailId));
  formData.append('totalTime', String(totalTime));
  formData.append('review', review);
  formData.append('score', String(score));
  formData.append('title', title);
  formData.append('totalDistance', String(totalDistance));
  formData.append('totalKcal', String(totalKcal));
  formData.append('creationDate', today);
  formData.append('locationName', locationName);

  if (images && images.length > 0) {
    images.forEach((imageUri) => {
      formData.append('images[]', imageUri);
    });
  }
  // if (images && images.length > 0) {
  //   images.forEach((image, index) => {
  //     formData.append(`images[${index}]`, image);
  //   });
  // }

  try {
    const response = await axios.post(`${BASE_URL}/activities`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('플로깅 일지 기록 응답 : ', response.data);
  } catch (error) {
    console.log('플로깅 일지 기록 에러', error);
  }
};

export const updatePlogHistory = async (
  id,
  title,
  review,
  score,
  images,
  token,
) => {
  const formData = new FormData();

  formData.append('id', id);
  formData.append('title', title);
  formData.append('review', review);
  formData.append('score', score);

  if (images && images.length > 0) {
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  }

  try {
    const response = await axios.patch(
      `${BASE_URL}/activities/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('일지 수정 : ', response);
  } catch (error) {
    console.log('일지 수정 에러 : ', error);
  }
};

//상세 조회
export const getActivityData = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/activities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log('기록 조회 에러 : ', error);
  }
};

//유저의 플로깅 횟수
export const getPloggingCnt = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/activities/total`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log('플로깅 횟수 가져오기 에러 : ', error);
  }
};

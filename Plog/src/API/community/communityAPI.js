import axios from 'axios';
import BASE_URL from '../apiconfig';

export const getMyPosts = async token => {
  try {
    const respose = await axios.get(`${BASE_URL}/communities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('내 공유 게시물 가져오기 성공');
    console.log('내 공유 게시물 목록 : ', respose.data.data);
    return respose.data.data;
  } catch (error) {
    console.log('내 게시물 가져오기 오류 : ', error);
  }
};

export const getOtherPosts = async token => {
  try {
    const respose = await axios.get(`${BASE_URL}/communities/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('친구 공유 게시물 가져오기 성공');
    console.log('친구 공유 게시물 목록 : ', respose.data.data);
    return respose.data.data;
  } catch (error) {
    console.log('친구 게시물 가져오기 오류 : ', error);
  }
};

/* 
response.data.data = 
[
    {
      "member": {
        "id": 12,
        "email": "dkfkzkzj@naver.com",
        "nickname": "김호준",
        "profileImageUrl": "http://k.kakaocdn.net/dn/YTEtE/btsI78te1JG/1Xq5KLTab44YK2o3HnDkQ1/img_640x640.jpg",
        "role": "user",
        "regDate": "2024-10-04T10:06:14.020155",
        "isResign": 0,
        "isFirst": false,
        "activityTime": 1,
        "floggingTime": 1,
        "region_type": 2,
        "regionLat": 36.346756,
        "regionLon": 127.28861,
        "expLevel": 80
      },
      "activity": {
        "id": 24,
        "title": "",
        "lat": [
          37.5172,
          37.5175,
          37.5178
        ],
        "lon": [
          127.0473,
          127.0476,
          127.048
        ],
        "totalDistance": 3,
        "totalKcal": 150,
        "totalTime": 160,
        "creationDate": "2024-10-08T14:27:53.026",
        "locationName": "우온",
        "review": "",
        "score": 0,
        "trail": {
          "id": 1,
          "name": "우온",
          "park": 0.1,
          "ocean": 0,
          "city": 0.9,
          "lake": 0,
          "shopCnt": 0,
          "toiletCnt": 0,
          "distance": 0,
          "time": null,
          "area": 51658,
          "lat": [
            36.35096,
            36.34908,
            36.34856,
            36.348125,
            36.34753,
            36.347942,
            36.3491,
            36.35049
          ],
          "lon": [
            127.29764,
            127.29663,
            127.298355,
            127.2993,
            127.30009,
            127.30077,
            127.29953,
            127.29822
          ],
          "center": [
            36.348976,
            127.29883
          ],
          "exp": 10,
          "image": "https://bitamin-sassack.s3.ap-northeast-2.amazonaws.com/%EC%98%81%EC%97%AD+%EC%82%AC%EC%A7%84/%EC%9A%B0%EC%98%A8.PNG"
        }
      }
    },
    {
      "member": {
        "id": 12,
        "email": "dkfkzkzj@naver.com",
        "nickname": "김호준",
        "profileImageUrl": "http://k.kakaocdn.net/dn/YTEtE/btsI78te1JG/1Xq5KLTab44YK2o3HnDkQ1/img_640x640.jpg",
        "role": "user",
        "regDate": "2024-10-04T10:06:14.020155",
        "isResign": 0,
        "isFirst": false,
        "activityTime": 1,
        "floggingTime": 1,
        "region_type": 2,
        "regionLat": 36.346756,
        "regionLon": 127.28861,
        "expLevel": 80
      },
      "activity": {
        "id": 42,
        "title": "",
        "lat": [
          36.354977
        ],
        "lon": [
          127.29834
        ],
        "totalDistance": 0,
        "totalKcal": 0,
        "totalTime": 5,
        "creationDate": "2024-10-09T10:17:43.151",
        "locationName": "삼성화재 유성캠퍼스",
        "review": "",
        "score": null,
        "trail": {
          "id": 11,
          "name": "삼성화재 유성캠퍼스",
          "park": 0.9,
          "ocean": 0,
          "city": 0.1,
          "lake": 0,
          "shopCnt": 0,
          "toiletCnt": 0,
          "distance": 0,
          "time": null,
          "area": 41032,
          "lat": [
            36.35636,
            36.355324,
            36.35469,
            36.354023,
            36.354992,
            36.355152
          ],
          "lon": [
            127.30001,
            127.29682,
            127.29675,
            127.29704,
            127.2997,
            127.299965
          ],
          "center": [
            36.35509,
            127.29838
          ],
          "exp": 10,
          "image": "https://bitamin-sassack.s3.ap-northeast-2.amazonaws.com/%EC%98%81%EC%97%AD+%EC%82%AC%EC%A7%84/%EC%82%BC%EC%84%B1%ED%99%94%EC%9E%AC+%EC%9C%A0%EC%84%B1%EC%BA%A0%ED%8D%BC%EC%8A%A4.PNG"
        }
      }
    },
    {
      "member": {
        "id": 12,
        "email": "dkfkzkzj@naver.com",
        "nickname": "김호준",
        "profileImageUrl": "http://k.kakaocdn.net/dn/YTEtE/btsI78te1JG/1Xq5KLTab44YK2o3HnDkQ1/img_640x640.jpg",
        "role": "user",
        "regDate": "2024-10-04T10:06:14.020155",
        "isResign": 0,
        "isFirst": false,
        "activityTime": 1,
        "floggingTime": 1,
        "region_type": 2,
        "regionLat": 36.346756,
        "regionLon": 127.28861,
        "expLevel": 80
      },
      "activity": {
        "id": 28,
        "title": "삼성화재 유성캠퍼스",
        "lat": [
          36.354977
        ],
        "lon": [
          127.29834
        ],
        "totalDistance": 0,
        "totalKcal": 0,
        "totalTime": 6,
        "creationDate": "2024-10-09T05:57:29.52",
        "locationName": "삼성화재 유성캠퍼스",
        "review": "sdsdsaasd",
        "score": 4,
        "trail": {
          "id": 11,
          "name": "삼성화재 유성캠퍼스",
          "park": 0.9,
          "ocean": 0,
          "city": 0.1,
          "lake": 0,
          "shopCnt": 0,
          "toiletCnt": 0,
          "distance": 0,
          "time": null,
          "area": 41032,
          "lat": [
            36.35636,
            36.355324,
            36.35469,
            36.354023,
            36.354992,
            36.355152
          ],
          "lon": [
            127.30001,
            127.29682,
            127.29675,
            127.29704,
            127.2997,
            127.299965
          ],
          "center": [
            36.35509,
            127.29838
          ],
          "exp": 10,
          "image": "https://bitamin-sassack.s3.ap-northeast-2.amazonaws.com/%EC%98%81%EC%97%AD+%EC%82%AC%EC%A7%84/%EC%82%BC%EC%84%B1%ED%99%94%EC%9E%AC+%EC%9C%A0%EC%84%B1%EC%BA%A0%ED%8D%BC%EC%8A%A4.PNG"
        }
      }
    },
    {
      "member": {
        "id": 12,
        "email": "dkfkzkzj@naver.com",
        "nickname": "김호준",
        "profileImageUrl": "http://k.kakaocdn.net/dn/YTEtE/btsI78te1JG/1Xq5KLTab44YK2o3HnDkQ1/img_640x640.jpg",
        "role": "user",
        "regDate": "2024-10-04T10:06:14.020155",
        "isResign": 0,
        "isFirst": false,
        "activityTime": 1,
        "floggingTime": 1,
        "region_type": 2,
        "regionLat": 36.346756,
        "regionLon": 127.28861,
        "expLevel": 80
      },
      "activity": {
        "id": 43,
        "title": "",
        "lat": [
          36.354977
        ],
        "lon": [
          127.29834
        ],
        "totalDistance": 0,
        "totalKcal": 0,
        "totalTime": 52,
        "creationDate": "2024-10-09T10:27:16.553",
        "locationName": "삼성화재 유성캠퍼스",
        "review": "",
        "score": null,
        "trail": {
          "id": 11,
          "name": "삼성화재 유성캠퍼스",
          "park": 0.9,
          "ocean": 0,
          "city": 0.1,
          "lake": 0,
          "shopCnt": 0,
          "toiletCnt": 0,
          "distance": 0,
          "time": null,
          "area": 41032,
          "lat": [
            36.35636,
            36.355324,
            36.35469,
            36.354023,
            36.354992,
            36.355152
          ],
          "lon": [
            127.30001,
            127.29682,
            127.29675,
            127.29704,
            127.2997,
            127.299965
          ],
          "center": [
            36.35509,
            127.29838
          ],
          "exp": 10,
          "image": "https://bitamin-sassack.s3.ap-northeast-2.amazonaws.com/%EC%98%81%EC%97%AD+%EC%82%AC%EC%A7%84/%EC%82%BC%EC%84%B1%ED%99%94%EC%9E%AC+%EC%9C%A0%EC%84%B1%EC%BA%A0%ED%8D%BC%EC%8A%A4.PNG"
        }
      }
    }
  ]

  */

// 일지 공유하기
export const shareActivity = async ({id, token}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/communities/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('일지 공유 응답 : ', response.data);
  } catch (error) {
    console.log('일지 공유 에러', error);
  }
};

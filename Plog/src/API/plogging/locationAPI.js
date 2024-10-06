import axios from "axios";
import BASE_URL from '../apiconfig';
import useStore from '../../../store/store';
import { KAKAO_REST_KEY } from '@env';


const locationPlog = async (locationData) => {
    // 상태관리에서 accessToken 가져옴
    const accessToken = useStore.getState().accessToken;

    try {
        const response = await axios.post(`${BASE_URL}/trail/postion`, locationData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('location API Error:', error);
        throw error;
    }
};

// 카카오 Reverse Geocoding API 호출 함수
const getRegionFromKakao = async (latitude, longitude) => {
    try {
        const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json`, {
            params: {
                x: longitude,  // 경도
                y: latitude    // 위도
            },
            headers: {
                Authorization: `KakaoAK ${KAKAO_REST_KEY}`
            }
        });

        const regionInfo = response.data.documents[0];
        const regionName = regionInfo.address_name;

        return regionName
    } catch (error) {
        console.error("Error fetching region from Kakao:", error);
    }
};

export { locationPlog, getRegionFromKakao };
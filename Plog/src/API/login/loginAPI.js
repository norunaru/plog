import axios from "axios";
import BASE_URL from '../apiconfig';

// 카카오 로그인
const KakaoLogin = async (kakaoAccessToken) => {
    try {
        const response = await axios.post(`${BASE_URL}/members/login`, {
            kakaoAccessToken: kakaoAccessToken,
        });
        return response.data;
    } catch (error) {
        console.error('Login API Error:', error);
        throw error;
    }
};

export { KakaoLogin };
import axios from "axios";
import BASE_URL from '../../../api/APIconfig';

// 카카오 로그인
const KakaoLogin = async (kakaoAccessToken) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/members/login`, {
            kakaoAccessToken: kakaoAccessToken,
        });
        return response.data;
    } catch (error) {
        console.error('Login API Error:', error);
        throw error;
    }
};

export { KakaoLogin };
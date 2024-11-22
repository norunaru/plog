import axios from "axios";
import BASE_URL from '../apiconfig';
import useStore from '../../../store/store';

// 설문조사 결과 전송
const submitSurvey = async (surveyData) => {
    // 상태관리에서 accessToken 가져옴
    const accessToken = useStore.getState().accessToken;

    try {
        const response = await axios.patch(`${BASE_URL}/members/survey`, surveyData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Survey API Error:', error);
        throw error;
    }
};

export { submitSurvey };
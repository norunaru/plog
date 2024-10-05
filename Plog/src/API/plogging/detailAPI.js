import axios from "axios";
import BASE_URL from '../apiconfig';
import useStore from '../../../store/store';


const detailCourse = async (courseId) => {
    // 상태관리에서 accessToken 가져옴
    const accessToken = useStore.getState().accessToken;

    try {
        const response = await axios.get(`${BASE_URL}/trail/${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('detail API Error:', error);
        throw error;
    }
};

export { detailCourse };
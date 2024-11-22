import AsyncStorage from '@react-native-async-storage/async-storage';

const createTokenSlice = (set) => ({
    accessToken: null,
    refreshToken: null,

    setTokens: async (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
        try {
          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
        } catch (e) {
          console.error('토큰 저장 오류:', e);
        }
      },
    
      clearTokens: async () => {
        set({ accessToken: null, refreshToken: null });
        try {
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');
        } catch (e) {
          console.error('토큰 삭제 오류:', e);
        }
      },
    });

export default createTokenSlice;
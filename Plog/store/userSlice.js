import {jwtDecode} from 'jwt-decode';

const createUserSlice = set => ({
  id: null,
  email: null,
  nickname: null,
  role: null,
  isFirst: true,
  exp: 0,

  setUserFromToken: accessToken => {
    const decoded = jwtDecode(accessToken);
    set({
      id: decoded.id,
      email: decoded.email,
      nickname: decoded.nickname,
      role: decoded.role,
      isFirst: decoded.isFirst,
      exp: decoded.exp,
    });
  },

  setIsFirst: value => set({isFirst: value}),

  clearUser: async () => {
    set({
      id: null,
      email: null,
      nickname: null,
      role: null,
      isFirst: true,
    });
  },
});

export default createUserSlice;

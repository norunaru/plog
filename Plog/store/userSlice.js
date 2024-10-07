import {jwtDecode} from 'jwt-decode';

const createUserSlice = set => ({
  id: null,
  email: null,
  nickname: null,
  role: null,
  isFirst: null,
  exp: null,

  setUserFromToken: accessToken => {
    const decoded = jwtDecode(accessToken);
    set({
      id: decoded.id,
      email: decoded.email,
      nickname: decoded.nickname,
      role: decoded.role,
      isFirst: decoded.is_First,
      exp: decoded.exp,
    });
  },

  clearUser: () =>
    set({id: null, email: null, nickname: null, role: null, isFirst: null}),
});

export default createUserSlice;

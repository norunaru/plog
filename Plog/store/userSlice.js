import {jwtDecode} from 'jwt-decode';

const createUserSlice = set => ({
  id: null,
  email: null,
  nickname: null,
  role: null,
  isFirst: true,
  exp: 0,
  lat: 0,
  lng: 0,

  setUserFromToken: accessToken => {
    const decoded = jwtDecode(accessToken);
    set({
      id: decoded.id,
      email: decoded.email,
      nickname: decoded.nickname,
      role: decoded.role,
      isFirst: decoded.isFirst,
      exp: decoded.expLevel,
    });
  },

  setIsFirst: value => set({isFirst: value}),

  setUserLocation: (lat, lng) => {
    set({lat, lng});
  },

  clearUser: async () => {
    set({
      id: null,
      email: null,
      nickname: null,
      role: null,
      isFirst: true,
      lat: 0,
      lng: 0,
      exp: 0,
    });
  },
});

export default createUserSlice;

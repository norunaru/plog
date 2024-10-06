const createTokenSlice = (set) => ({
    accessToken: null,
    refreshToken: null,

    setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
    clearTokens: () => set({ accessToken: null, refreshToken: null }),
});

export default createTokenSlice;
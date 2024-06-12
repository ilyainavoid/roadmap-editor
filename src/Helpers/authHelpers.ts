export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}
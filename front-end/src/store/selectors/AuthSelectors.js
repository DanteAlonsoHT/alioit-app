export const isAuthenticated = (state) => {
    if (state.auth.auth.authToken) return true;
};

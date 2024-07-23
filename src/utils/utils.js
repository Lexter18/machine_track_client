
export const getRol = () => {
    const loginData = JSON.parse(sessionStorage.getItem('login'));
    return loginData ? loginData.rol.authority : null;
};
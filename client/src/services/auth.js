const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("location");
    window.location.href = "/";
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    logout,
    getCurrentUser,
};
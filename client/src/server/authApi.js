import api from "./api.js";

const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  signup: (fullname, company, email, password) =>
    api.post("/auth/register", { fullname, company, email, password }),
};

export default authAPI;

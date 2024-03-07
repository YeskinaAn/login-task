import axios from "axios";

export const privateLoginApi = axios.create({
  baseURL: "https://auth-qa.qencode.com",
});

// const token = localStorage.getItem("token");

// privateLoginApi.interceptors.request.use((config) => ({
//   ...config,
//   headers: {
//     ...config.headers,
//     Authorization: `Bearer ${token}`,
//   },
// }));

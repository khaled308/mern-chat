import axios from "axios";

export const registerService = async (userData) => {
  const { data } = await axios.post("/auth/register", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data && data.token) {
    localStorage.setItem("token", "Bearer " + data.token);
  }
  return data;
};

export const loginService = async (userData) => {
  const { data } = await axios.post("/auth/login", userData);

  if (data && data.token) {
    localStorage.setItem("token", "Bearer " + data.token);
  }
  return data;
};

export const logoutService = async () => {
  const { data } = await axios.post("/logout");

  localStorage.removeItem("token");
  return data;
};

export const getUserService = async () => {
  const { data } = await axios.get("/auth/user");

  return data;
};

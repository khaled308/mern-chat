import axios from "axios";

export const getMessages = async (userId) => {
  const { data } = await axios.get(`/messages/${userId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return data;
};

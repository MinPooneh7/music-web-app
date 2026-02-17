import axiosInstance from "../base";

export async function signup(payload: Payload) {
  const { data } = await axiosInstance.post("/auth/signup", payload);

  return data;
}

interface Payload {
  email: string;
  password: string;
  username: string;
}

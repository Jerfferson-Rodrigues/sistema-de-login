import axios from "axios";

export const api = axios.create({
  baseUrl: "http://localhost:5000",
});

export const createSession = async (email, password) => {
  return api.post("/sessions", { email, password });
};

export const getUser = async () => {
  return api.get("/users");
};

// src/api/auth.ts
import api from "./axios"; 

export const signup = (data: {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}) => api.post("/auth/signup", data);

export const signin = (data: {
  email: string;
  password: string;
}) => api.post("/auth/signin", data);
import { CommonResponse } from './common';

//회원가입 관련
export type RequestSignupDto = {
  email: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: string;
}

export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string|null;
  avatar: string|null;
  createdAt: Date
  updatedAt: Date
}>

//로그인 관련
export type RequestSigninDto = {
  email: string;
  password: string;
}

export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>

//내정보 조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string|null;
  avatar: string|null;
  createdAt: Date
  updatedAt: Date
}>

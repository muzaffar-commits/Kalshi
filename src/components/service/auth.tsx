import apiInstance from "./apiInstance";
import { API_URLs } from "./apiURLs";

export const registerAPI = async (reqBody: any) => {
  try {
    const response = await apiInstance.post(API_URLs.register, reqBody);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const loginAPI = async (reqBody: any) => {
  try {
    const response = await apiInstance.post(API_URLs.login, reqBody);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const googleLoginAPI = async (reqBody: any) => {
  try {
    const response = await apiInstance.post(API_URLs.googleLogin, reqBody);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const emailVerifyAPI = async (reqBody: any) => {
  try {
    const response = await apiInstance.post(API_URLs.verifyEmail, reqBody);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

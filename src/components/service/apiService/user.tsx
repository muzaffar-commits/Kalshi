import apiInstance from "../apiInstance";
import { API_URLs } from "../apiURLs";

export const userBalance = async () => {
  try {
    const response = await apiInstance.get(API_URLs.userBalance);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

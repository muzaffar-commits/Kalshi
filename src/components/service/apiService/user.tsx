import { getErrorMessage } from "@/utils/Content";
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiURLs";

export const userBalance = async () => {
  try {
    const response = await apiInstance.get(API_URLs.userBalance);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const userDetails = async () => {
  try {
    const response = await apiInstance.get(API_URLs.userDetails);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const userPositions = async () => {
  try {
    const response = await apiInstance.get(API_URLs.userPositions);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

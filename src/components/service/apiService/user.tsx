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
export const getFeed = async (id: string) => {
  try {
    const response = await apiInstance.get(`${API_URLs.getFeed}?userId=${id}`);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const imageUpload = async (images: any) => {
  try {
    const response = await apiInstance.post(API_URLs.imageUpload, images, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const userPost = async (reqBody: any) => {
  try {
    const response = await apiInstance.post(API_URLs.userPost, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

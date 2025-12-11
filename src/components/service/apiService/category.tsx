import apiInstance from "../apiInstance";
import { API_URLs } from "../apiURLs";

export const getCommonCategoryAll = async () => {
  try {
    const response = await apiInstance.get(API_URLs.commonCategoryAll);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const commonQuestionFindById = async (id: any) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.commonQuestionFindById}/${id}`
    );
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const questionDetails = async (id: any) => {
  try {
    const response = await apiInstance.get(`${API_URLs.questionDetails}/${id}`);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

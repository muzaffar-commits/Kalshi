// ordersQuoteDetails
import apiInstance from "../apiInstance";
import { API_URLs } from "../apiURLs";

export const getOrdersQuoteDetails = async (
  questionId: any,
  outcomeIndex: any,
  shares: any
) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.ordersQuoteDetails}/?questionId=${questionId}&outcomeIndex=${outcomeIndex}&shares=${shares}`
    );
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getQuoteByBudget = async (
  questionId: any,
  outcomeIndex: any,
  amount: any
) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.quoteByBudget}/?questionId=${questionId}&outcomeIndex=${outcomeIndex}&budgetGross=${amount}`
    );
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const submitOrder = async (reqBody: any) => {
  try {
    const response = await apiInstance.post(API_URLs.submitOrder, reqBody);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getGraphData = async (questionId: any, interval = "") => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.graphData}/${questionId}/graph${
        interval && `?interval=${interval}`
      }`
    );
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const getCommonQuoteSell = async (
  questionId: any,
  outcomeIndex: any,
  amount: any
) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.commonQuoteSell}/?questionId=${questionId}&outcomeIndex=${outcomeIndex}&shares=${amount}`
    );
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getLeaderBoardMarket = async (questionId: any) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.leaderBoardMarketList}/${questionId}/?sort=profit`
    );
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

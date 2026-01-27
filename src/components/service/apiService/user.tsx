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
    const response = await apiInstance.get(
      `${API_URLs.getFeed}${id ? `?userId=${id}` : ""}`,
    );
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const imageUpload = async (images: unknown) => {
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

export const postProfileUpdate = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(API_URLs.profileUpdate, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const userPost = async (reqBody: unknown) => {
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
export const postLikeOrUnlike = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(API_URLs.likeOrUnlike, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const postBookmarkOrUnBookMark = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(
      API_URLs.bookmarkOrUnBookMark,
      reqBody,
    );
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const getBookMarkList = async (id: string) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.bookMarkList}${id ? `?userId=${id}` : ""}`,
    );
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const getCommentsList = async (id: number | null) => {
  try {
    const response = await apiInstance.get(`${API_URLs.getComments}/${id}`);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const replyComments = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(API_URLs.postComments, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
export const getUsersAllDetails = async (id: string, userId: string) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.getProfileListAllUser}${userId ? `?userId=${userId}` : ""}${id ? `&targetId=${id}` : ""}`,
    );
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const postQuestionBookUnBookMark = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(API_URLs.questionBookMark, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const fetchWatchList = async (offset = 0, limit = 30) => {
  try {
    const response = await apiInstance.get(API_URLs.getWatchList, {
      params: {
        offset,
        limit,
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

export const postFollowUser = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(API_URLs.followUser, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
export const postUnFollowUser = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(API_URLs.unFollowUser, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
export const postUserCommentLikeOrUnlike = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(
      API_URLs.userCommentLikeOrUnlike,
      reqBody,
    );
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const fetchNotification = async () => {
  try {
    const response = await apiInstance.get(API_URLs.getNotification);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
export const fetchUnReadCountNotification = async () => {
  try {
    const response = await apiInstance.get(API_URLs.getUnReadCountNotification);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const postReadNotification = async (reqBody: unknown) => {
  try {
    const response = await apiInstance.post(API_URLs.readNotification, reqBody);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const postAllReadNotification = async () => {
  try {
    const response = await apiInstance.post(API_URLs.allReadNotification);
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const getMyAllPost = async (userId: string, id: string) => {
  try {
    const response = await apiInstance.get(
      `${API_URLs.myAllPost}${userId ? `?userId=${userId}` : ""}${id ? `&targetId=${id}` : ""}`,
    );
    return response?.data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
//

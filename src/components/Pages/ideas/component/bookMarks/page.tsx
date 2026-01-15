import { getBookMarkList } from "@/components/service/apiService/user";
import React, { useCallback, useEffect, useState } from "react";
import IdeaTabsTwo from "../IdeaTabsTwo/page";
import { PostFeeBack } from "@/utils/typesInterface";
import { delay } from "@/utils/Content";

type HandleComment = (post: PostFeeBack) => void;

interface propsss {
  userId: string;
  handleComment: HandleComment;
  handleUserDetails: (id: string) => void;
}
export default function BookMarks({
  userId,
  handleComment,
  handleUserDetails,
}: propsss) {
  const [bookMarks, setBookMarks] = useState<PostFeeBack[]>([]);
  const [iseLoader, setIsLoader] = useState(false);
  const bookMarkList = useCallback(async () => {
    setIsLoader(true);
    try {
      const [response] = await Promise.all([
        getBookMarkList(userId),
        delay(1000),
      ]);

      if (response?.success) {
        setBookMarks(response.data ?? []);
      } else {
        setBookMarks([]);
      }
    } catch {
      setBookMarks([]);
    } finally {
      setIsLoader(false);
    }
  }, [userId]);

  useEffect(() => {
    bookMarkList();
  }, [bookMarkList]);
  // const handleComment = () => {

  // };
  return (
    <div>
      <IdeaTabsTwo
        postedList={bookMarks}
        handleComment={handleComment}
        setAllPosts={setBookMarks}
        isBookMark={true}
        loader={iseLoader}
        handleUserDetails={handleUserDetails}
      />
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
// import MobileMenu from "@/components/IdeaList/page";
// import IdeaTabs from "@/components/IdeaTabs/page";
import { getBookMarkList, getFeed } from "@/components/service/apiService/user";
import { useSelector } from "react-redux";
import MobileMenu from "./component/IdeaList/page";
import IdeaTabs from "./component/IdeaTabs/page";
import { PostFeeBack } from "@/utils/typesInterface";

interface userDetails {
  user: {
    user: {
      id: string;
    };
  };
}

const Ideas = () => {
  const [allPosts, setAllPosts] = useState<PostFeeBack[]>([]);
  const users = useSelector((state: userDetails) => state?.user?.user);

  const getListOfPost = useCallback(async () => {
    try {
      const response = await getFeed(users?.id);
      if (response?.success) {
        setAllPosts(response.data ?? []);
      } else {
        setAllPosts([]);
      }
    } catch {
      setAllPosts([]);
    }
  }, [users?.id]);

  useEffect(() => {
    getListOfPost();
  }, [getListOfPost]);

  const bookMarkList = useCallback(async () => {
    try {
      const response = await getBookMarkList(users?.id);
      console.log(response, "response");
    } catch {}
  }, [users?.id]);

  useEffect(() => {
    bookMarkList();
  }, [bookMarkList]);

  //
  return (
    <>
      <div className="dark:bg-[#0f172a] mt-40">
        <div className="max-w-[880px] xl:max-w-[1268px] mx-auto px-4 mt-36 lg:mt-28">
          <div className="lg:flex">
            <div className="md:w-1/4 w-full">
              <h1 className="dark:text-white text-gray-800 lg:text-3xl text-xl mb-0 mt-3">
                Ideas
              </h1>
              <span className="text-gray-500 text-xs">
                Serving public conversation
              </span>
              <MobileMenu />
            </div>
            <div className="md:w-3/4 w-full lg:border-l dark:border-gray-700 border-gray-200 min-h-1/2">
              <div className="lg:border-r dark:border-gray-700 border-gray-200">
                <IdeaTabs
                  allPosts={allPosts}
                  fetchPostList={getListOfPost}
                  setAllPosts={setAllPosts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ideas;

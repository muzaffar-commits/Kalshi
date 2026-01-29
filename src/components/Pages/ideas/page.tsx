import React, { useCallback, useEffect, useState } from "react";
import { getFeed } from "@/components/service/apiService/user";
import { useSelector } from "react-redux";
import MobileMenu from "./component/IdeaList/page";
import IdeaTabs from "./component/IdeaTabs/page";
import { PostFeeBack } from "@/utils/typesInterface";

import { delay } from "@/utils/Content";
import { useRouter } from "next/navigation";

interface userDetails {
  user: {
    user: {
      id: string;
    };
  };
}

const Ideas = () => {
  const [allPosts, setAllPosts] = useState<PostFeeBack[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [currentTabs, setCurrentTabs] = useState("Home");
  const users = useSelector((state: userDetails) => state?.user?.user);
  const router = useRouter();

  const getListOfPost = useCallback(async () => {
    setIsLoader(true);
    try {
      const [response] = await Promise.all([getFeed(users?.id), delay(1000)]);
      if (response?.success) {
        setAllPosts(response.data ?? []);
      } else {
        setAllPosts([]);
      }
    } catch {
      setAllPosts([]);
    } finally {
      setIsLoader(false);
    }
  }, [users?.id, currentTabs]);

  useEffect(() => {
    getListOfPost();
  }, [getListOfPost]);

  const handleComment = (row: PostFeeBack) => {
    router.push(`/ideas/${row?.id}`);
  };

  const handleUserDetails = (id: string) => {
    router.push(`/ideas/profile/${id}`);
  };
  return (
    <>
      <div className="dark:bg-[#1D293D] mt-36">
        <div className="max-w-[880px] xl:max-w-[1268px] mx-auto px-4 mt-36 lg:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-white dark:bg-[#1D293D] ">
                <h1 className="dark:text-white text-gray-800 md:ml-0 ml-16 lg:text-3xl text-xl mb-0 mt-3">
                  Ideas
                </h1>
                <span className="text-gray-500 text-xs md:ml-0 ml-16">
                  Serving public conversation
                </span>
                <MobileMenu />
              </div>
            </div>
            <div className="lg:col-span-3 lg:border-l dark:border-gray-700 border-gray-200 min-h-1/2 ">
              <IdeaTabs
                allPosts={allPosts}
                fetchPostList={getListOfPost}
                setAllPosts={setAllPosts}
                handleComment={handleComment}
                isLoader={isLoader}
                handleUserDetails={handleUserDetails}
              />
              {/* <div className="lg:border-r dark:border-gray-700 border-gray-200">
                {currentTabs == "Home" ? (
                  isComment ? (
                    postDetails && (
                      <CommentPage
                        postDetails={postDetails}
                        handleCloseComment={handleCloseComment}
                        handleUserDetails={handleUserDetails}
                      />
                    )
                  ) : (
                    <IdeaTabs
                      allPosts={allPosts}
                      fetchPostList={getListOfPost}
                      setAllPosts={setAllPosts}
                      handleComment={handleComment}
                      isLoader={isLoader}
                      handleUserDetails={handleUserDetails}
                    />
                  )
                ) : currentTabs == "Replies" ? (
                  <Replies />
                ) : currentTabs == "Bookmarks" ? (
                  isComment ? (
                    postDetails && (
                      <CommentPage
                        postDetails={postDetails}
                        handleCloseComment={handleCloseComment}
                        handleUserDetails={handleUserDetails}
                      />
                    )
                  ) : (
                    <BookMarks
                      userId={users?.id}
                      handleComment={handleComment}
                      handleUserDetails={handleUserDetails}
                    />
                  )
                ) : currentTabs == "Profile" ? (
                  <Profile targetId={targetId} userId={users?.id} />
                ) : currentTabs == "Community Guidelines" ? (
                  <CommunityGuidelines />
                ) : currentTabs == "Support" ? (
                  <Supports />
                ) : (
                  <FAQs />
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ideas;

import React, { useCallback, useEffect, useState } from "react";
// import MobileMenu from "@/components/IdeaList/page";
// import IdeaTabs from "@/components/IdeaTabs/page";
import { getFeed } from "@/components/service/apiService/user";
import { useSelector } from "react-redux";
import MobileMenu from "./component/IdeaList/page";
import IdeaTabs from "./component/IdeaTabs/page";
import { PostFeeBack } from "@/utils/typesInterface";
import Replies from "./component/replies/page";
import BookMarks from "./component/bookMarks/page";
import Profile from "./component/profile/page";
import CommunityGuidelines from "./component/communityGuidelines/page";
import Supports from "./component/supports/page";
import FAQs from "./component/faqs/page";
import CommentPage from "./component/comments/page";

import { delay } from "@/utils/Content";

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
  const [isComment, setIsComment] = useState(false);
  const [postDetails, setPostDetails] = useState<PostFeeBack | null>(null);
  const [targetId, setTargetId] = useState("");
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
    console.log(row, "sdlkfjslkdjfjskdf");

    setPostDetails(row);
    setIsComment(true);
  };
  const handleCloseComment = () => {
    setPostDetails(null);
    setIsComment(false);
  };
  const changeForTabs = (values: string) => {
    setCurrentTabs(values);
    setIsComment(false);
    setTargetId("");
  };

  const handleUserDetails = (id: string) => {
    setTargetId(id);
    setCurrentTabs("Profile");
    // Profile
  };
  return (
    <>
      <div className="dark:bg-[#1D293D] mt-40">
        <div className="max-w-[880px] xl:max-w-[1268px] mx-auto px-4 mt-36 lg:mt-28">
          <div className="lg:flex">
            <div className="md:w-1/4 w-full">
              <h1 className="dark:text-white text-gray-800 lg:text-3xl text-xl mb-0 mt-3">
                Ideas
              </h1>
              <span className="text-gray-500 text-xs">
                Serving public conversation
              </span>
              <MobileMenu
                currentTabs={currentTabs}
                handleTabs={changeForTabs}
              />
            </div>
            <div className="md:w-3/4 w-full lg:border-l dark:border-gray-700 border-gray-200 min-h-1/2">
              <div className="lg:border-r dark:border-gray-700 border-gray-200">
                {currentTabs == "Home" ? (
                  isComment ? (
                    postDetails && (
                      <CommentPage
                        postDetails={postDetails}
                        handleCloseComment={handleCloseComment}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ideas;

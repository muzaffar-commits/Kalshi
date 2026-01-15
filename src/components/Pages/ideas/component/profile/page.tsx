import { getUsersAllDetails } from "@/components/service/apiService/user";
import { delay } from "@/utils/Content";
import React, { useCallback, useEffect, useState } from "react";

export default function Profile({
  targetId,
  userId,
}: {
  targetId: string;
  userId: string;
}) {
  // const [userDetails, setUserDetails] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const getListOfPost = useCallback(async () => {
    setIsLoader(true);
    try {
      const [response] = await Promise.all([
        getUsersAllDetails(targetId, userId),
        delay(1000),
      ]);
      if (response?.success) {
        console.log(response.data ?? []);
      } else {
        console.log([]);
      }
    } catch {
      console.log([]);
    } finally {
      setIsLoader(false);
    }
  }, [targetId, userId]);

  useEffect(() => {
    getListOfPost();
  }, [getListOfPost]);

  // getUsersAllDetails
  return (
    <div className="flex items-center justify-center">
      {isLoader ? "sldkfjs" : "slkdfj"}
      Profile
    </div>
  );
}

import { Skeleton } from "@mui/material";

export const PostSkeleton = ({ count = 3 }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={`md:flex ${
        index > 0 && "pt-4 border-t border-gray-800"
      } border-gray-300 pb-2 items-start gap-4 w-full md:px-4 px-0 animate-pulse`}
    >
      <div>
        <div className="w-[70px] h-[70px] rounded-md bg-gray-300 dark:bg-gray-700 mt-1" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        {/* Text lines */}
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-[90%] bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-[70%] bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* Image placeholder */}
        <div className="mt-4 w-[500px] max-w-full h-[280px] bg-gray-300 dark:bg-gray-700 rounded-md" />

        {/* Actions */}
        <div className="mt-4 flex gap-6">
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  ));
};

export const CreatePostSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-start gap-4 w-full px-4 mt-4">
        {/* Avatar */}
        <div className="w-[60px] h-[60px] rounded-full bg-gray-300 dark:bg-gray-700 mt-1" />

        <div className="flex-1">
          <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
      </div>

      {/* Bottom: Image name + Actions */}
      <div className="flex flex-row pl-7 justify-between items-center mt-3">
        {/* Selected image name */}
        <div className="text-xs gap-4 items-center flex flex-row">
          <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mr-7 items-center">
          {/* Image upload button */}
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-md" />

          {/* Post button */}
          <div className="h-9 w-16 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const CategorySkeleton = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <div className="flex items-center font-semibold">
            <Skeleton
              variant="text"
              className=" !bg-gray-300 dark:!bg-gray-700 "
              width={120}
              height={40}
            />
          </div>
        </li>
      ))}
    </>
  );
};

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReelItem, LinkedQuestion, RootState } from "@/utils/typesInterface";

import {
  setReels,
  appendReels,
  setHasMore,
  setPage,
  setLoading,
  setCurrentIndex,
  updateReelLike,
  updateReelBookmark,
} from "@/components/store/slice/reels";
import ReelCard from "./ReelCard";
import CommentsDrawer from "./CommentsDrawer";
import CreateReelModal from "./CreateReelModal";
import {
  FaPlus,
  FaVideo,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  getReelsFeed,
  toggleReelBookmark,
  toggleReelLike,
} from "@/components/service/apiService/reels";

const ReelsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Pick whichever container is currently visible
  const getActiveContainer = () => {
    const d = desktopContainerRef.current;
    if (d && d.offsetHeight > 0) return d;
    return mobileContainerRef.current;
  };

  const { reels, hasMore, page, isLoading, currentIndex } = useSelector(
    (state: {
      reels: {
        reels: ReelItem[];
        hasMore: boolean;
        page: number;
        isLoading: boolean;
        currentIndex: number;
      };
    }) => state.reels,
  );
  const isAuth = useSelector(
    (state: RootState) =>
      !!(state as Record<string, unknown> & { user: { isAuth: boolean } })?.user
        ?.isAuth,
  );

  const [isMuted, setIsMuted] = useState(true);
  const [commentsReelId, setCommentsReelId] = useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [likeBounce, setLikeBounce] = useState(false);

  const currentReel: ReelItem | undefined = reels[currentIndex];

  // Fetch feed
  const fetchFeed = useCallback(
    async (p: number, reset = false) => {
      dispatch(setLoading(true));
      const res = await getReelsFeed(p, 10);
      if (res?.success) {
        if (reset) {
          dispatch(setReels(res.data.reels));
        } else {
          dispatch(appendReels(res.data.reels));
        }
        dispatch(setHasMore(res.data.hasMore));
      }
      dispatch(setLoading(false));
    },
    [dispatch],
  );

  // Initial load
  useEffect(() => {
    fetchFeed(1, true);
    dispatch(setPage(1));
  }, [fetchFeed, dispatch]);

  // Deep link: ?id=123
  useEffect(() => {
    const id = searchParams?.get("id");
    if (id) {
      const numId = parseInt(id);
      const idx = reels.findIndex((r) => r.id === numId);
      if (idx >= 0) {
        dispatch(setCurrentIndex(idx));
        scrollToIndex(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reels, searchParams]);

  // Intersection observer for snapping / lazy load — runs for both containers
  useEffect(() => {
    const containers = [
      desktopContainerRef.current,
      mobileContainerRef.current,
    ].filter(Boolean) as HTMLDivElement[];
    const observers: IntersectionObserver[] = [];

    for (const container of containers) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.getAttribute("data-index"));
              if (!isNaN(idx)) {
                dispatch(setCurrentIndex(idx));

                if (idx >= reels.length - 3 && hasMore && !isLoading) {
                  const nextPage = page + 1;
                  dispatch(setPage(nextPage));
                  fetchFeed(nextPage);
                }
              }
            }
          });
        },
        { root: container, threshold: 0.6 },
      );

      const items = container.querySelectorAll("[data-index]");
      items.forEach((el) => observer.observe(el));
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [reels, hasMore, isLoading, page, dispatch, fetchFeed]);

  const scrollToIndex = (idx: number) => {
    const container = getActiveContainer();
    if (!container) return;
    const child = container.children[idx] as HTMLElement;
    child?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenComments = (reelId: number) => {
    setCommentsReelId(reelId);
    setCommentsOpen(true);
  };

  const handleReelCreated = () => {
    fetchFeed(1, true);
    dispatch(setPage(1));
  };

  // ── Desktop action handlers ──
  const handleDesktopLike = async () => {
    if (!currentReel) return;
    if (!isAuth) return toast.error("Login to like");
    setLikeBounce(true);
    setTimeout(() => setLikeBounce(false), 400);
    const res = await toggleReelLike(currentReel.id);
    if (res?.success) {
      dispatch(
        updateReelLike({
          reelId: currentReel.id,
          liked: res.data.isLiked,
          likeCount: res.data.likeCount,
        }),
      );
    }
  };

  const handleDesktopBookmark = async () => {
    if (!currentReel) return;
    if (!isAuth) return toast.error("Login to bookmark");
    const res = await toggleReelBookmark(currentReel.id);
    if (res?.success) {
      dispatch(
        updateReelBookmark({
          reelId: currentReel.id,
          bookmarked: res.data.isBookmarked,
          bookmarkCount: res.data.bookmarkCount,
        }),
      );
    }
  };

  const handleDesktopShare = async () => {
    if (!currentReel) return;
    const shareUrl = `${window.location.origin}/reels?id=${currentReel.id}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: currentReel.caption || "Check out this reel!",
          url: shareUrl,
        });
      } catch {
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => toast.success("Link copied!"),
        () => {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          toast.success("Link copied!");
        },
      );
    }
  };

  const formatCount = (n: number): string => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n);
  };

  // ── Left panel: linked question + markets ──
  const LeftPanel = () => {
    const linkedQ = currentReel?.linkedQuestion;

    return (
      <div className="w-[320px] mt-16 flex-shrink-0 h-full  overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {/* Current reel's linked question */}
        {linkedQ ? (
          <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl border border-gray-200 dark:border-gray-700/50 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8160EE] to-[#6235f8] rounded-xl flex items-center justify-center shadow-md">
                <MdQuiz className="text-white text-lg" />
              </div>
              <div>
                <p className="text-xs text-[#8160EE] font-bold uppercase tracking-wider">
                  Linked Market
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {linkedQ.status === "active" || linkedQ.status === "OPEN"
                    ? "Active"
                    : linkedQ.status}
                  {linkedQ.endDate &&
                    ` · Ends ${new Date(linkedQ.endDate).toLocaleDateString()}`}
                </p>
              </div>
            </div>

            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
              {linkedQ.question}
            </h3>

            {linkedQ.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {linkedQ.description}
              </p>
            )}

            <button
              onClick={() => router.push(`/market/${linkedQ.id}`)}
              className="w-full bg-gradient-to-r from-[#8160EE] to-[#6235f8] hover:from-[#7e5bf1] hover:to-[#5b2afc] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-md shadow-[#8160EE]/20"
            >
              Predict Now
            </button>
          </div>
        ) : (
          <div className="bg-white/5 rounded-2xl border border-gray-700/30 p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mx-auto mb-3">
              <MdQuiz className="text-gray-600 text-xl" />
            </div>
            <p className="text-gray-500 text-sm font-medium">
              No linked market
            </p>
            <p className="text-gray-600 text-xs mt-1">
              This reel isn&apos;t linked to a prediction market
            </p>
          </div>
        )}

        {/* Other active markets from reels */}
        <div className="space-y-2 ">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
            More Markets
          </h4>
          {reels
            .filter(
              (r) => r.linkedQuestion && r.linkedQuestion.id !== linkedQ?.id,
            )
            .reduce((acc: LinkedQuestion[], r) => {
              if (
                r.linkedQuestion &&
                !acc.find((q) => q.id === r.linkedQuestion!.id)
              ) {
                acc.push(r.linkedQuestion);
              }
              return acc;
            }, [])
            .slice(0, 5)
            .map((q) => (
              <button
                key={q.id}
                onClick={() => router.push(`/market/${q.id}`)}
                className="w-full bg-white dark:bg-[#1a1f2e] rounded-xl border border-gray-200 dark:border-gray-700/50 p-3 text-left hover:border-[#8160EE]/40 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-snug">
                  {q.question}
                </p>
                <p className="text-xs text-[#8160EE] mt-1.5 font-medium">
                  {q.status === "active" || q.status === "OPEN"
                    ? "Active"
                    : q.status}
                  {q.endDate &&
                    ` · Ends ${new Date(q.endDate).toLocaleDateString()}`}
                </p>
              </button>
            ))}

          {reels.filter((r) => r.linkedQuestion).length === 0 && (
            <p className="text-gray-600 text-xs px-1">
              No markets available yet
            </p>
          )}
        </div>
      </div>
    );
  };

  // ── Desktop action buttons strip ──
  const DesktopActions = () => {
    if (!currentReel) return null;

    return (
      <div className="flex flex-col items-center gap-5 py-4">
        {/* Like */}
        <button
          onClick={handleDesktopLike}
          className={`flex flex-col items-center transition-transform ${likeBounce ? "scale-125" : "scale-100"}`}
        >
          {currentReel.isLiked ? (
            <div className="w-11 h-11 rounded-full bg-red-500/10 flex items-center justify-center">
              <FaHeart className="text-red-500 text-xl" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FaRegHeart className="text-gray-700 dark:text-gray-300 text-xl" />
            </div>
          )}
          <span className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">
            {formatCount(currentReel.likeCount)}
          </span>
        </button>

        {/* Comment */}
        <button
          onClick={() => handleOpenComments(currentReel.id)}
          className="flex flex-col items-center"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${commentsOpen ? "bg-[#8160EE]/10" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            <FaComment
              className={`text-xl ${commentsOpen ? "text-[#8160EE]" : "text-gray-700 dark:text-gray-300"}`}
            />
          </div>
          <span className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">
            {formatCount(currentReel.commentCount)}
          </span>
        </button>

        {/* Bookmark */}
        <button
          onClick={handleDesktopBookmark}
          className="flex flex-col items-center"
        >
          {currentReel.isBookmarked ? (
            <div className="w-11 h-11 rounded-full bg-[#8160EE]/10 flex items-center justify-center">
              <FaBookmark className="text-[#8160EE] text-xl" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FaRegBookmark className="text-gray-700 dark:text-gray-300 text-xl" />
            </div>
          )}
          <span className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">
            {formatCount(currentReel.bookmarkCount)}
          </span>
        </button>

        {/* Share */}
        <button
          onClick={handleDesktopShare}
          className="flex flex-col items-center"
        >
          <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FaShare className="text-gray-700 dark:text-gray-300 text-lg" />
          </div>
          <span className="text-xs mt-1 text-gray-500">Share</span>
        </button>

        {/* Mute */}
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="flex flex-col items-center"
        >
          <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {isMuted ? (
              <FaVolumeMute className="text-gray-500 dark:text-gray-400 text-lg" />
            ) : (
              <FaVolumeUp className="text-gray-700 dark:text-gray-300 text-lg" />
            )}
          </div>
        </button>

        {/* Create reel */}
        {isAuth && (
          <button
            onClick={() => setCreateOpen(true)}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8160EE] to-[#6235f8] hover:from-[#987afa] hover:to-[#6235f8] flex items-center justify-center shadow-lg shadow-[#8160EE]/30 transition-all hover:scale-110 active:scale-95 mt-2"
            title="Create Reel"
          >
            <FaPlus className="text-white text-sm" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0a0e1a]">
      {/* ═══ DESKTOP LAYOUT (lg+) ═══ */}
      <div className="hidden lg:flex w-full h-full items-center justify-center gap-4 px-4">
        {/* Left panel: Question / Markets */}
        <LeftPanel />

        {/* Center: Reel video */}
        <div className="relative w-[380px] flex-shrink-0 h-[calc(100%-32px)] max-h-[780px] bg-black rounded-2xl overflow-hidden shadow-2xl">
          <div
            ref={desktopContainerRef}
            className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            style={{ scrollSnapStop: "always" } as React.CSSProperties}
          >
            {reels.map((reel, idx) => (
              <div
                key={reel.id}
                data-index={idx}
                className="w-full h-full snap-start"
                style={{ scrollSnapStop: "always" } as React.CSSProperties}
              >
                <ReelCard
                  reel={reel}
                  isActive={idx === currentIndex}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((prev) => !prev)}
                  onOpenComments={handleOpenComments}
                  isAuth={isAuth}
                />
              </div>
            ))}

            {isLoading && (
              <div className="w-full h-full snap-start flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-3 border-[#8160EE] border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-400 text-sm">
                    Loading reels...
                  </span>
                </div>
              </div>
            )}

            {!isLoading && reels.length === 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black text-white px-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#8160EE]/20 to-[#8160EE]/5 flex items-center justify-center mb-6">
                  <FaVideo className="text-[#8160EE] text-3xl" />
                </div>
                <p className="text-xl font-bold mb-2">No reels yet</p>
                <p className="text-gray-400 text-sm text-center max-w-[280px] leading-relaxed">
                  Be the first to share your market insights!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Action buttons */}
        <div className="flex-shrink-0 h-[calc(100%-32px)] max-h-[780px] flex flex-col items-center justify-center">
          <DesktopActions />
        </div>

        {/* Right panel: Comments (only when open) */}
        {commentsOpen && (
          <div className="w-[340px] flex-shrink-0 h-[calc(100%-32px)] max-h-[780px]">
            <CommentsDrawer
              reelId={commentsReelId}
              isOpen={commentsOpen}
              onClose={() => setCommentsOpen(false)}
              sidePanel
            />
          </div>
        )}
      </div>

      {/* ═══ MOBILE LAYOUT (< lg) ═══ */}
      <div className="flex lg:hidden w-full h-full bg-black">
        <div className="relative w-full h-full max-w-[420px] mx-auto bg-black">
          <div
            ref={mobileContainerRef}
            className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            style={{ scrollSnapStop: "always" } as React.CSSProperties}
          >
            {reels.map((reel, idx) => (
              <div
                key={reel.id}
                data-index={idx}
                className="w-full h-full snap-start"
                style={{ scrollSnapStop: "always" } as React.CSSProperties}
              >
                <ReelCard
                  reel={reel}
                  isActive={idx === currentIndex}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((prev) => !prev)}
                  onOpenComments={handleOpenComments}
                  isAuth={isAuth}
                />
              </div>
            ))}

            {isLoading && (
              <div className="w-full h-full snap-start flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-3 border-[#8160EE] border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-400 text-sm">
                    Loading reels...
                  </span>
                </div>
              </div>
            )}

            {!isLoading && reels.length === 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#0f172a] to-black text-white px-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#8160EE]/20 to-[#8160EE]/5 flex items-center justify-center mb-6">
                  <FaVideo className="text-[#8160EE] text-3xl" />
                </div>
                <p className="text-xl font-bold mb-2">No reels yet</p>
                <p className="text-gray-400 text-sm text-center max-w-[280px] leading-relaxed">
                  Be the first to share your market insights!
                </p>
                {isAuth && (
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="mt-6 bg-gradient-to-r from-[#8160EE] to-[#6235f8] text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#8160EE]/20"
                  >
                    <FaPlus className="text-sm" />
                    Create First Reel
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mobile FAB */}
          {isAuth && reels.length > 0 && (
            <button
              onClick={() => setCreateOpen(true)}
              className="absolute bottom-6 right-4 z-30 bg-gradient-to-br from-[#8160EE] to-[#6235f8] hover:from-[#8160EE] hover:to-[#6235f8] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl shadow-[#8160EE]/30 transition-all hover:scale-110 active:scale-95"
              title="Create Reel"
            >
              <FaPlus className="text-base" />
            </button>
          )}
        </div>

        {/* Mobile comments drawer */}
        <CommentsDrawer
          reelId={commentsReelId}
          isOpen={commentsOpen}
          onClose={() => setCommentsOpen(false)}
        />
      </div>

      {/* Create reel modal */}
      <CreateReelModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleReelCreated}
      />
    </div>
  );
};

export default ReelsPage;

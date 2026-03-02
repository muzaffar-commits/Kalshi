"use client";
import React, { useRef, useEffect, useState } from "react";
import { ReelItem } from "@/utils/typesInterface";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import {
  toggleReelLike,
  toggleReelBookmark,
  recordReelView,
} from "@/components/service/apiService/reels";
import { useDispatch } from "react-redux";
import {
  updateReelLike,
  updateReelBookmark,
} from "@/components/store/slice/reels";
import toast from "react-hot-toast";
import moment from "moment";

interface ReelCardProps {
  reel: ReelItem;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenComments: (reelId: number) => void;
  isAuth: boolean;
}

const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  isActive,
  isMuted,
  onToggleMute,
  onOpenComments,
  isAuth,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayPause, setShowPlayPause] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewRecorded, setViewRecorded] = useState(false);
  const [likeBounce, setLikeBounce] = useState(false);
  const dispatch = useDispatch();
  const playPauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const viewStartRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
      setIsPlaying(true);
      viewStartRef.current = Date.now();
      setViewRecorded(false);
    } else {
      video.pause();
      setIsPlaying(false);
      if (viewStartRef.current && !viewRecorded) {
        const watchDuration = (Date.now() - viewStartRef.current) / 1000;
        if (watchDuration > 1) {
          recordReelView(reel.id, watchDuration);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (video.duration)
        setProgress((video.currentTime / video.duration) * 100);
      if (video.currentTime > 3 && !viewRecorded) {
        setViewRecorded(true);
        recordReelView(reel.id, video.currentTime);
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [reel.id, viewRecorded]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowPlayPause(true);
    if (playPauseTimeout.current) clearTimeout(playPauseTimeout.current);
    playPauseTimeout.current = setTimeout(() => setShowPlayPause(false), 800);
  };

  const handleLike = async () => {
    if (!isAuth) return toast.error("Login to like");
    setLikeBounce(true);
    setTimeout(() => setLikeBounce(false), 400);
    const res = await toggleReelLike(reel.id);
    if (res?.success) {
      dispatch(
        updateReelLike({
          reelId: reel.id,
          liked: res.data.isLiked,
          likeCount: res.data.likeCount,
        }),
      );
    }
  };

  const handleBookmark = async () => {
    if (!isAuth) return toast.error("Login to bookmark");
    const res = await toggleReelBookmark(reel.id);
    if (res?.success) {
      dispatch(
        updateReelBookmark({
          reelId: reel.id,
          bookmarked: res.data.isBookmarked,
          bookmarkCount: res.data.bookmarkCount,
        }),
      );
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/reels?id=${reel.id}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: reel.caption || "Check out this reel!",
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
        () => fallbackCopy(text),
      );
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Link copied!");
  };

  const formatCount = (n: number): string => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n);
  };

  const creatorName =
    reel.creator?.preferences?.username ||
    reel.creator?.email?.split("@")[0] ||
    "User";

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black snap-start overflow-hidden rounded-xl lg:rounded-2xl">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlayPause}
        preload="metadata"
      />

      {/* Gradient overlays for readability */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

      {/* Play/Pause icon overlay */}
      {showPlayPause && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-5 animate-ping-once">
            {isPlaying ? (
              <FaPause className="text-white text-3xl" />
            ) : (
              <FaPlay className="text-white text-3xl ml-1" />
            )}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-30">
        <div
          className="h-full bg-[#c8aa76] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Right sidebar: actions — MOBILE ONLY (hidden on lg+) */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-20 lg:hidden">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex flex-col items-center transition-transform ${likeBounce ? "scale-125" : "scale-100"}`}
        >
          {reel.isLiked ? (
            <FaHeart className="text-red-500 text-[26px] drop-shadow-lg" />
          ) : (
            <FaRegHeart className="text-white text-[26px] drop-shadow-lg" />
          )}
          <span className="text-white text-[11px] mt-1 font-medium">
            {formatCount(reel.likeCount)}
          </span>
        </button>

        {/* Comment */}
        <button
          onClick={() => onOpenComments(reel.id)}
          className="flex flex-col items-center"
        >
          <FaComment className="text-white text-[26px] drop-shadow-lg" />
          <span className="text-white text-[11px] mt-1 font-medium">
            {formatCount(reel.commentCount)}
          </span>
        </button>

        {/* Bookmark */}
        <button onClick={handleBookmark} className="flex flex-col items-center">
          {reel.isBookmarked ? (
            <FaBookmark className="text-[#c8aa76] text-[26px] drop-shadow-lg" />
          ) : (
            <FaRegBookmark className="text-white text-[26px] drop-shadow-lg" />
          )}
          <span className="text-white text-[11px] mt-1 font-medium">
            {formatCount(reel.bookmarkCount)}
          </span>
        </button>

        {/* Share */}
        <button onClick={handleShare} className="flex flex-col items-center">
          <FaShare className="text-white text-[22px] drop-shadow-lg" />
          <span className="text-white text-[10px] mt-1">Share</span>
        </button>

        {/* Mute/Unmute */}
        <button
          onClick={onToggleMute}
          className="flex flex-col items-center mt-1"
        >
          {isMuted ? (
            <FaVolumeMute className="text-white/80 text-xl" />
          ) : (
            <FaVolumeUp className="text-white/80 text-xl" />
          )}
        </button>
      </div>

      {/* Bottom overlay: creator + caption only */}
      <div className="absolute bottom-5 left-4 right-16 lg:right-4 z-20">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c8aa76] to-[#8a7040] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {creatorName.charAt(0).toUpperCase()}
          </div>
          <span className="text-white font-bold text-sm drop-shadow-lg">
            @{creatorName}
          </span>
          <span className="text-white/60 text-xs">
            {moment(reel.createdAt).fromNow()}
          </span>
        </div>

        {reel.caption && (
          <p className="text-white/90 text-[13px] leading-[18px] drop-shadow line-clamp-2 ml-10">
            {reel.caption}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReelCard;

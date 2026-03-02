"use client";
import React, { useState, useRef } from "react";
import { FaTimes, FaCloudUploadAlt, FaVideo } from "react-icons/fa";
import { createReel } from "@/components/service/apiService/reels";
import toast from "react-hot-toast";

interface CreateReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const CreateReelModal: React.FC<CreateReelModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_CAPTION = 500;

  const processFile = (selected: File) => {
    const allowed = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowed.includes(selected.type)) {
      toast.error("Only MP4, WebM, or MOV files are accepted.");
      return;
    }

    if (selected.size > 50 * 1024 * 1024) {
      toast.error("Video must be under 50 MB.");
      return;
    }

    const url = URL.createObjectURL(selected);
    const tempVideo = document.createElement("video");
    tempVideo.preload = "metadata";
    tempVideo.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      if (tempVideo.duration > 45) {
        toast.error("Video must be 45 seconds or less.");
        return;
      }
      setDuration(Math.round(tempVideo.duration));
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    };
    tempVideo.src = url;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected) processFile(selected);
  };

  console.log(file, "filefilefilefile");

  const handleSubmit = async () => {
    if (!file) return toast.error("Select a video");
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    const formData = new FormData();
    console.log(file, "rams");

    formData.append("video", file);
    formData.append("duration", String(duration));
    if (caption.trim()) formData.append("caption", caption.trim());
    if (questionId.trim()) formData.append("questionId", questionId.trim());
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1], "form");
    }
    const res = await createReel(formData);
    clearInterval(progressInterval);
    setUploadProgress(100);
    setUploading(false);

    if (res?.success) {
      toast.success("Reel published!");
      resetForm();
      onCreated();
      onClose();
    } else {
      toast.error(res?.message || "Upload failed");
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setCaption("");
    setQuestionId("");
    setDuration(0);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    return (bytes / 1024).toFixed(0) + " KB";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-[#1a1f2e] rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c8aa76] to-[#8a7040] flex items-center justify-center">
              <FaVideo className="text-white text-sm" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Create Reel
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="text-gray-500 text-sm" />
          </button>
        </div>

        {/* File selector / Preview */}
        {!preview ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
              dragOver
                ? "border-[#c8aa76] bg-[#c8aa76]/10"
                : "border-gray-300 dark:border-gray-600 hover:border-[#c8aa76]/60 hover:bg-[#c8aa76]/5"
            }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c8aa76]/20 to-[#c8aa76]/5 flex items-center justify-center mb-4">
              <FaCloudUploadAlt className="text-3xl text-[#c8aa76]" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              Tap or drag to upload
            </p>
            <p className="text-xs text-gray-400 mt-1.5 text-center">
              MP4, WebM or MOV &middot; Max 45s &middot; Under 50MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-[350px] mx-auto ring-1 ring-white/10">
            <video
              src={preview}
              className="w-full h-full object-cover"
              controls
              muted
            />
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
                setDuration(0);
              }}
              className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <FaTimes className="text-white text-xs" />
            </button>
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <span className="bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-medium">
                {duration}s
              </span>
              {file && (
                <span className="bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-medium">
                  {formatFileSize(file.size)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Caption */}
        <div className="mt-4 relative">
          <textarea
            className="w-full bg-gray-50 dark:bg-[#0f1520] text-sm text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none resize-none border border-gray-200 dark:border-gray-700/50 focus:border-[#c8aa76]/50 focus:ring-1 focus:ring-[#c8aa76]/20 transition-all"
            rows={3}
            maxLength={MAX_CAPTION}
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <span
            className={`absolute bottom-2 right-3 text-[10px] ${caption.length > MAX_CAPTION * 0.9 ? "text-red-400" : "text-gray-400"}`}
          >
            {caption.length}/{MAX_CAPTION}
          </span>
        </div>

        {/* Link question (optional) */}
        <div className="mt-3">
          <input
            className="w-full bg-gray-50 dark:bg-[#0f1520] text-sm text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none border border-gray-200 dark:border-gray-700/50 focus:border-[#c8aa76]/50 focus:ring-1 focus:ring-[#c8aa76]/20 transition-all"
            placeholder="Link to Question ID (optional)"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            type="number"
          />
          <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
            Link a prediction market question to your reel
          </p>
        </div>

        {/* Upload progress */}
        {uploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Uploading...
              </span>
              <span className="text-xs font-medium text-[#c8aa76]">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c8aa76] to-[#a08850] rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!file || uploading}
          className="w-full mt-4 bg-gradient-to-r from-[#c8aa76] to-[#a08850] hover:from-[#d4b882] hover:to-[#b09860] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#c8aa76]/20 disabled:shadow-none"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <FaVideo className="text-sm" />
              Publish Reel
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateReelModal;

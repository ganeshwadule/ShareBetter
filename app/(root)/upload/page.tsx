"use client";

import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const uploadFileToBunny = (
  file: File,
  uploadUrl: string,
  accessKey: string
): Promise<void> => {
  return fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((response) => {
    if (!response.ok) throw new Error("Upload Failed");
  });
};

const page = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const visibilityRef = useRef<HTMLSelectElement>(null);

  const [videoDuration, setVideoDuration] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);


  const handleSubmit = async (e: FormEvent) => {
    const title = titleRef?.current?.value;
    const description = descRef?.current?.value;
    const visibility = visibilityRef?.current?.value;
    console.log(title,description,visibility);

    e.preventDefault();

    setIsSubmitting(true);
    // this happened 1
    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload a file");
        return;
      }
      // this happened 2
      if (!title || !description) {
        setError("Please fill in all the information to upload the video");
        return;
      }
      // this happened 3
      // upload a video to bunny

      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();

      console.log(videoUploadUrl,videoAccessKey,"Here is the Maal");
      
      if (!videoUploadUrl || !videoAccessKey)
        throw new Error("Failed to get video upload credentials");

      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      // upload a thumbnail

      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId as string);

      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl)
        throw new Error("Failed to get thumbnail upload credentials");

      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      await saveVideoDetails({
        videoId: videoId,
        title: title as string,
        description: description as string,
        thumbnailUrl: thumbnailCdnUrl,
        visibility: visibility as Visibility,
        duration: videoDuration,
      });
      
      console.log("uploaded video")
      router.push(`video/${videoId}`);

    } catch (error) {
      console.log(error)
      console.log("Error in uploading video");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (video.duration !== null || 0) setVideoDuration(video.duration);
  }, [video.duration]);

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>

      {error && <div className="error-field">{error}</div>}

      <form
        className="rounded-20 gap-6 w-full flex flex-col shadow-10 px-5 py-7.5"
        onSubmit={handleSubmit}
      >
        <FormField
          id="title"
          label="Title"
          placeholder="Enter a title for video"
          // value={titleRef.current?.value}
          Ref={titleRef}
          
        />

        <FormField
          id="description"
          label="Description"
          placeholder="Enter a description for the video"
          // value={descRef.current?.value}
          Ref={descRef}
          
          as="textarea"
        />

        <FileInput
          id="Video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          type="video"
          onChange={video.handleFileChange}
          onReset={video.resetFile}
        />

        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          type="image"
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
        />

        <FormField
          id="visibility"
          label="Visibility"
          value={visibilityRef.current?.value}
          Ref={visibilityRef}
          // handleChange={handleChange}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
        />

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "uploading..." : "upload a video"}
        </button>
      </form>
    </div>
  );
};

export default page;

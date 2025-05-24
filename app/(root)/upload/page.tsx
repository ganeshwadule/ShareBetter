"use client";

import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { log } from "console";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

const page = () => {

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const visibilityRef = useRef<HTMLSelectElement>(null);

  const [isSubmitting,setIsSubmitting] = useState(false);


  const [error, setError] = useState("");

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const handleChange = (e: ChangeEvent) => {
    console.log(titleRef?.current?.value);
    console.log(descRef?.current?.value);
    console.log(visibilityRef?.current?.value);
  };

  const handleSubmit = async (e:FormEvent)=>{
      e.preventDefault();

      setIsSubmitting(true);

      try {
        if(!video.file || !thumbnail.file){
          setError("Please upload a file")
          return;
        }

        if(!titleRef?.current?.value || descRef?.current?.value){
          setError("Please fill in all the information to upload the video");
          return;
        }
``
        // upload a video to bunny
      } catch (error) {
        console.log("Error in uploading video")
      }
      finally{
        setIsSubmitting(false);
      }
  }

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>

      {error && <div className="error-field">{error}</div>}

      <form className="w-full shadow-10 flex flex-col px-5 py-7.5 rounded-20" onSubmit={handleSubmit}>
        <FormField
          id="title"
          label="Title"
          placeholder="Enter a title for video"
          value={titleRef.current?.value}
          Ref={titleRef}
          handleChange={handleChange}
        />

        <FormField
          id="description"
          label="Description"
          placeholder="Enter a description for the video"
          value={descRef.current?.value}
          Ref={descRef}
          handleChange={handleChange}
          as="textarea"
        />

        <FileInput 
          id="Video"
          label="Video"
          accept = "video/*"
          file = {video.file}
          previewUrl = {video.previewUrl}
          inputRef = {video.inputRef}
          type = "video"
          onChange = {video.handleFileChange}
          onReset = {video.resetFile}
        />

        <FileInput 
          id="thumbnail"
          label="Thumbnail"
          accept = "image/*"
          file = {thumbnail.file}
          previewUrl = {thumbnail.previewUrl}
          inputRef = {thumbnail.inputRef}
          type = "image"
          onChange = {thumbnail.handleFileChange}
          onReset = {thumbnail.resetFile}
        />

        <FormField
          id="visibility"
          label="Visibility"
          value={visibilityRef.current?.value}
          Ref={visibilityRef}
          handleChange={handleChange}
          as="select"
          options ={ [{value:"public",label:"Public"},{value:"private",label:"Private"}]}
        />

        <button type = "submit" className="submit-button" disabled = {isSubmitting}>
          {
            isSubmitting ? "uploading..." : "upload a video"
          }
        </button>
      </form>
    </div>
  );
};

export default page;

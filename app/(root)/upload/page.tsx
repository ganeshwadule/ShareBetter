"use client";

import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import React, { ChangeEvent, useRef, useState } from "react";

const page = () => {

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const visibilityRef = useRef<HTMLSelectElement>(null);

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent) => {
    console.log(titleRef?.current?.value);
    console.log(descRef?.current?.value);
    console.log(visibilityRef?.current?.value);
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>

      {error && <div className="error-field">{error}</div>}

      <form className="w-full shadow-10 flex flex-col px-5 py-7.5 rounded-20">
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

        <FileInput />

        <FormField
          id="visibility"
          label="Visibility"
          value={visibilityRef.current?.value}
          Ref={visibilityRef}
          handleChange={handleChange}
          as="select"
          options ={ [{value:"public",label:"Public"},{value:"private",label:"Private"}]}
        />
      </form>
    </div>
  );
};

export default page;

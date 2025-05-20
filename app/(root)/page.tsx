import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";


import React from "react";

const Page = () => {
  return (
    <main className="wrapper page">
      <Header subHeader="public library" title="All Videoes" />

      {dummyCards.map((vc) => (
        <VideoCard
        key={vc.id}
          id={vc.id}
          title={vc.title}
          thumbnail={vc.thumbnail}
          createdAt={vc.createdAt}
          userImg={vc.userImg}
          username={vc.username}
          views={vc.views}
          visibility={vc.visibility as Visibility}
          duration={vc.duration}
        />
      ))}
    </main>
  );
};

export default Page;

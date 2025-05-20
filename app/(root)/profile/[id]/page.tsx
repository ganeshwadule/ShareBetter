import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import React from "react";

const Profile = async ({ params }: ParamsWithSearch) => {

  const { id } = await params;

  return (
    <div className="wrapper page">
      
      <Header
        subHeader="uniquegbw09@gmail.com"
        title="Ganesh"
        userImg="/assets/images/dummy.jpg"
      />

    <section className="video-grid">
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
      </section>

    </div>
  );
};

export default Profile;

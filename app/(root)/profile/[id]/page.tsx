import Header from "@/components/Header";
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
     <h1 className="text-2xl font-karla ">User {id}</h1> 
    </div>
  );
};

export default Profile;

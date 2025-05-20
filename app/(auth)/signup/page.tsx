import { PrismaClient } from "@/app/generated/prisma";
import React from "react";

const page = async () => {
    
  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      username: "ganeshwadule",
      password: "1234",
    },
  });

  return <div>Hello</div>;
};

export default page;

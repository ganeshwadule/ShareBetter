import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


const Layout = async ({ children }: { children: ReactNode }) => {

   const session = await auth.api.getSession({
    headers: await headers(),
   });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
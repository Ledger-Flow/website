import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const WebsiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex min-h-dvh flex-col">
      <Navbar />
      <section className="flex-1">{children}</section>
      <Footer />
    </section>
  );
};

export default WebsiteLayout;

import React, { ReactNode } from "react";
import Layout from "../../components/Layouts/SiteLayout";

type Props = {
  children?: ReactNode;
  title?: string;
};

const ProfileLayout = ({ children, title = "Profile" }: Props) => (
  <Layout title={title}>
    <div
      className="w-full "
      style={{
        backgroundImage: "url('/bg-images/blurredbackground.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      {children}
    </div>
  </Layout>
);

export default ProfileLayout;

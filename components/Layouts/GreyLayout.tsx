import Layout from "../../components/Layouts/SiteLayout";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function GreyLayout({ children, title = "Woonmatch" }: Props) {
  return (
    <Layout title={title}>
      <div className="w-full">{children}</div>
    </Layout>
  );
}

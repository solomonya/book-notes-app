import { Footer, Header } from "@/views/Layout";
import React from "react";

interface ILayoutProps {
  children: React.ReactElement;
}

export default function Layout({ children }: ILayoutProps): React.ReactElement {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

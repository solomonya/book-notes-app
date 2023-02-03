import { Footer, Header, Sidebar } from "@/views";
import React from "react";

interface ILayoutProps {
  children: React.ReactElement;
}

export default function Layout({ children }: ILayoutProps): React.ReactElement {
  return (
    <React.Fragment>
      <Header />
      <main className="flex min-h-screen">
        <Sidebar title="Список книг">
          <h1>Список книг TODO...</h1>
        </Sidebar>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}

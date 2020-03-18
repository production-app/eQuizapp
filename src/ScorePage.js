import React from "react";
import Headers from "./components/Header";
import Sidebar from "./components/Sidebar";
import Score from "./components/Score";
import Footer from "./components/Footer";

export default function ScorePage() {
  return (
    <>
      <div className="tm-page-container mx-auto">
        <Headers />
        <section className="tm-section">
          <Sidebar />
          <Score />
        </section>
        <Footer />
      </div>
    </>
  );
}

import React from "react";
import Quiz from "./Quiz";
import Sidebar from "./Sidebar";
import Headers from "./Header";
import Footer from "./Footer";

function QuizWrapper() {
  return (
    <div className="tm-page-container mx-auto">
      <Headers />
      <section className="tm-section">
        <Sidebar />
        <Quiz />
      </section>
      <Footer />
    </div>
  );
}

export default QuizWrapper;

import React from "react";

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      <hr />
      <footer style={{ margin: "0px 0px 0px 130px" }}>
        Copyright © {year} | developerbiodun@gmail.com.{" "}
      </footer>
    </>
  );
}

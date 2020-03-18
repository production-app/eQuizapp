import React from "react";

function Sidebar() {
  return (
    <>
      <nav className="tm-nav">
        <ul>
          <li className="active" style={{ border: "0px" }}>
            <a href="/">
              <span className="tm-nav-deco" />
              Play
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;

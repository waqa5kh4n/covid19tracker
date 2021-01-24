import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        <div> 💡 </div>
      </Link>
      <ul className="nav-links">
        <Link style={{ color: "white", textDecoration: "none", marginTop:"10px", marginRight: "50px" }} to="/graph">
          <li> Graph </li>
        </Link>
        <Link style={{ color: "white", textDecoration: "none", marginTop:"10px" }} to="/about">
          <li> About </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;

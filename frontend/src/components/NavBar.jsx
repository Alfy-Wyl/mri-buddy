import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <nav>
        <Link to={"/"}>
          <img src="/images/image 1.png" alt="MRI-Buddy Logo" />
        </Link>
        <ul>
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
          <li>
            <a href="#Request Buddy">Request Buddy</a>
          </li>
          <li>
            <a href="#About">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

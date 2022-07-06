import React, { useState } from "react";
import "./Nav.scss";
import { NavItems } from "./NavItems";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

function Nav() {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const handleToggle = () => {
    setNavBarOpen(!navBarOpen);
  };

  return (
    <div className="nav-container">
      <button className="nav-btn" onClick={handleToggle}>
        {navBarOpen ? (
          <MdClose style={{ color: "#fff", width: "30px", height: "30px" }} />
        ) : (
          <FiMenu style={{ color: "#7b7b7b", width: "30px", height: "30px" }} />
        )}
      </button>
      <nav className={navBarOpen ? "nav" : "non-existent"}>
        <a href="/" className="nav__logo-link">
          POS
        </a>

        <ul className="nav__list">
          {NavItems.map((item, index) => {
            return (
              <li className="nav__list-item" key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;

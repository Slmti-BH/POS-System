import React, {Link} from "react";
import "./Nav.scss";
import { NavItems } from "./NavItems";

function Nav(){
    return (
      <nav className="nav">
        <a href="/" className="nav__logo-link">POS</a>
        <ul className="nav__list">
          {NavItems.map((item,index)=>{
            return (
              <li className="nav__list-item" key={index}>
                <a className={item.cName} href={item.url}>{item.title}</a>
              </li>
            );
          })
          }

        </ul>
      </nav>
    );
};

export default Nav;
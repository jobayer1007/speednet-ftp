import React from 'react'
import { menuItems } from './menuItems';

const Navbar = () => {
  return (
    <nav>
    <ul className="menus">
    {menuItems.map((menu, index) => {
     return (
      <li className="menu-items" key={index}>
       <a href="/#">{menu.title}</a>
      </li>
     );
    })}
   </ul>
  </nav>
  )
}

export default Navbar
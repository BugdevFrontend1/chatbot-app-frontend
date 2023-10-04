import React from 'react';
import Logo from './assests/udc-logo-long.png'
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" width="400px"/>
      </div>
      <nav className="menu">
        <ul>
          <li><a href="/">About</a></li>
          <li><a href="#about">Acadamic</a></li>
          <li><a href="#admission">Admission</a></li>
          <li><a href="#student">Student</a></li>
          <li><a href="#foundation">Foundation</a></li>
          <li><a href="#apply">Apply</a></li>
          <li><a href="#alumni">Alumni</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

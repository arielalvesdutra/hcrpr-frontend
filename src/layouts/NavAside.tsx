import React from 'react'
import './NavAside.scss'

const NavAside = () => 
  <nav className="navAside">
    <ul>
      <li><a href="/problems" className="active">Problems</a></li>
      <li><a href="/techniques">Techniques</a></li>
      <li><a href="/concepts">Concepts</a></li>
    </ul>
  </nav>

export default NavAside

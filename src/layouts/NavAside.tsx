import React from 'react'
import './NavAside.scss'

const pathName = window.location.pathname

const isActive = (expectedPathName: string):string => {
  if (expectedPathName === pathName) {
    return 'active'
  }
  return ''
}

const NavAside = () => 
  <nav className="navAside">
    <ul>
      <li>
        <a href="/problems" className={isActive('/problems')}>
          Problemas
        </a>
      </li>
      <li>
        <a href="/techniques" className={isActive('/techniques')}>
          Técnicas
        </a>
      </li>
      <li>
        <a href="/concepts" className={isActive('/concepts')}>
          Conceitos
        </a>
      </li>
    </ul>
  </nav>

export default NavAside

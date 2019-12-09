import React from 'react'
import './NavAside.scss'

const pathName = window.location.pathname

const pathStartWith = (parameter:string):boolean => {
  const startWith = new RegExp(`${parameter}`)
  
  if (startWith.test(pathName)) {
    return true
  }
  return false
}

const isActive = ({expectedPathName = '', exact = false}):string => {

  if (exact) return expectedPathName === pathName ? 'active' : ''

  if (pathStartWith(expectedPathName)) {
    return 'active'
  }
  return ''
}

const NavAside = () => 
  <nav className="navAside">
    <ul>
      <li>
        <a href="/problems" 
            className={isActive({expectedPathName: '/problems'}) ||
                       isActive({expectedPathName: '/', exact: true})}>
          Problemas
        </a>
      </li>
      <li>
        <a href="/techniques" className={isActive({expectedPathName: '/techniques'})}>
          Técnicas
        </a>
      </li>
      <li>
        <a href="/concepts" className={isActive({expectedPathName: '/concepts'})}>
          Conceitos
        </a>
      </li>
    </ul>
  </nav>

export default NavAside

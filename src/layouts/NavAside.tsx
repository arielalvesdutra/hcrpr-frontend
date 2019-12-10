import React, { useState } from 'react'
import './NavAside.scss'

const pathName = window.location.pathname

const pathStartWith = (parameter: string): boolean => {
  const startWith = new RegExp(`${parameter}`)

  if (startWith.test(pathName)) {
    return true
  }
  return false
}

const isActive = ({ expectedPathName = '', exact = false }): string => {

  if (exact) return expectedPathName === pathName ? 'active' : ''

  if (pathStartWith(expectedPathName)) {
    return 'active'
  }
  return ''
}

const NavAside = () => {

  const [isHamburguerOpen, setIsHamburguerOpen] = useState(false)

  function toggleHamburguer() {
    setIsHamburguerOpen(!isHamburguerOpen)
  }

  return (
    <nav className="navAside">
      <ul className="navAside__mainLinks" style={{display: isHamburguerOpen ? 'block' :'' }}>
        <li>
          <a href="/problems"
            className={isActive({ expectedPathName: '/problems' }) ||
              isActive({ expectedPathName: '/', exact: true })}>
            Problemas
          </a>
        </li>
        <li>
          <a href="/techniques" className={isActive({ expectedPathName: '/techniques' })}>
            Técnicas
          </a>
        </li>
        <li>
          <a href="/concepts" className={isActive({ expectedPathName: '/concepts' })}>
            Conceitos
          </a>
        </li>
      </ul>
      <button onClick={toggleHamburguer} className="navAside__hamburguer">
        <img className="navAside__hamburguer__img" 
            src={require('../assets/img/icon-hamburguer.svg')} alt="Icone hamburguer" />
      </button>
    </nav>
  )
}

export default NavAside

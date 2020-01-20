import React, { useState } from 'react'
import  { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import './NavAside.scss'

const NavAside = (props: any) => {
  const location = useLocation()
  const pathName = location.pathname
  const [isHamburguerOpen, setIsHamburguerOpen] = useState(false)
  
  function pathStartWith (parameter: string): boolean {
    const startWith = new RegExp(`${parameter}`)
  
    if (startWith.test(pathName)) 
      return true
    return false
  }

  function isActive ({ expectedPathName = '', exact = false }): string {
    if (exact) return expectedPathName === pathName ? 'active' : ''
    if (pathStartWith(expectedPathName)) return 'active'
    return ''
  }

  function toggleHamburguer():void {
    setIsHamburguerOpen(!isHamburguerOpen)
  }

  return (
    <nav className="navAside">
      <ul className="navAside__mainLinks" style={{display: isHamburguerOpen ? 'block' :'' }}>
        <li onClick={toggleHamburguer}>
          <Link to="/problems"
            className={isActive({ expectedPathName: '/problems' }) ||
              isActive({ expectedPathName: '/', exact: true })}>
            <img className="navAside__mainLink__icon"
                src={require('../assets/img/problem.svg')} alt="Ícone de Problema"/>
            <span>
              Problemas
            </span>
          </Link>
        </li>
        <li onClick={toggleHamburguer}>
          <Link to="/techniques" className={isActive({ expectedPathName: '/techniques' })}>
            <img className="navAside__mainLink__icon"
                src={require('../assets/img/tools.svg')} alt="Ícone de Técnicas"/>
            <span>
              Técnicas
            </span>
          </Link>
        </li>
        <li onClick={toggleHamburguer}>
          <Link to="/concepts" className={isActive({ expectedPathName: '/concepts' })}>
            <img className="navAside__mainLink__icon"
                src={require('../assets/img/concepts.svg')} alt="Ícone de Conceitos"/>
            <span>
              Conceitos
            </span>
          </Link>
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

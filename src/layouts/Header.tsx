import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'

const Header = (props: any) => 
  <header className="header">
    <div className="header__brand">
      <Link to="/" className="header__brand__link">
        <img className="header__brand__logo" src="/brand-logo.svg" alt="Logo"/>
        <span className="header__brand__name">HCRPR</span>
      </Link>
    </div>
    <div className="header__links">
      <span title="Obter informações">
        <img width="25px" src={require('../assets/img/icon-info.svg')} alt="Informções" />
      </span>
    </div>
  </header>

export default Header

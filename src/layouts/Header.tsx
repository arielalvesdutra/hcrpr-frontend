import React from 'react'
import './Header.scss'

const Header = (props: any) => 
  <header className="header">
    <div className="header__brand">
      <a href="/" className="header__brand__link">
        <img className="header__brand__logo" src="/brand-logo.svg" alt="Logo"/>
        <span className="header__brand__name">HCRPR</span>
      </a>
    </div>
    <div className="header__links">
      <span title="Obter informações">
        <img width="25px" src={require('../assets/img/icon-info.svg')} alt="Informções" />
      </span>
    </div>
  </header>

export default Header

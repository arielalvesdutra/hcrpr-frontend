import React from 'react'
import BreadcrumbLink from '../types/BreadcrumbLink'

import './Breadcrumb.scss'
import { Link } from 'react-router-dom'

type Props = {
  links: BreadcrumbLink[]
}

const Breadcrumb = ( props: Props) => 
  <div className="breadcrumb">
    {props.links.map((breadLink, key) => (
      <span key={key}><Link to={breadLink.link}>{breadLink.name} ></Link> </span>
    ))}
  </div>

export default Breadcrumb

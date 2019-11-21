import React from 'react'
import BreadcrumbLink from '../types/BreadcrumbLink'

import './Breadcrumb.scss'

type Props = {
  links: BreadcrumbLink[]
}

const Breadcrumb = ( props: Props) => 
  <div className="breadcrumb">
    {props.links.map((breadLink, key) => (
      <span key={key}><a href={breadLink.link}>{breadLink.name} ></a> </span>
    ))}
  </div>

export default Breadcrumb

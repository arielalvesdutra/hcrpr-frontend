import React from 'react'
import './Content.scss'

import BreadcrumbLink from '../types/BreadcrumbLink'
import Breadcrumb from './Breadcrumb'

interface IContentProps {
  children: any,
  title: string,
  breadcrumbLinks: BreadcrumbLink[]
}

const Content = (props: IContentProps) => 
  <main className="content">
    <Breadcrumb links={props.breadcrumbLinks}/>
    <h1 className="content__title">{props.title}</h1>

    {props.children}
  </main>

export default Content

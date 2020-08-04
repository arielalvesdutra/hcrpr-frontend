import React from 'react'
import './Content.scss'

import BreadcrumbLink from '../types/BreadcrumbLink'
import Breadcrumb from './Breadcrumb'

interface ContentProps {
  children: any,
  title: string,
  breadcrumbLinks: BreadcrumbLink[]
}

const Content = (props: ContentProps) =>
  <main className="content">
    <div>
      <Breadcrumb links={props.breadcrumbLinks} />
    </div>
    <h1 className="content__title">{props.title}</h1>

    {props.children}
  </main>

export default Content

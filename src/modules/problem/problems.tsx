import React from 'react'
import Content from '../../layouts/Content'

import BreadcrumbLink from '../../types/BreadcrumbLink'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems")
]

const Problems = () => 
  <Content 
    title="Problemas"
    breadcrumbLinks={breadcrumbLinks}
    >
    Problemas
  </Content>

export default Problems

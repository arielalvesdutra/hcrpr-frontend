import React from 'react'
import Content from '../../layouts/Content'

import BreadcrumbLink from '../../types/BreadcrumbLink'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts")
]

const Concepts = () => 
    <Content
        title="Conceitos"
        breadcrumbLinks={breadcrumbLinks}>
      Conceitos
    </Content>

export default Concepts

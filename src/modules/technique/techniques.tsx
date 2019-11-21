import React from 'react'
import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'

const breadcrumbLinks = [
  new BreadcrumbLink("Técnicas", "/techniques")
]

const Techniques = () =>           
  <Content 
      title="Técnicas"
      breadcrumbLinks={breadcrumbLinks}>
        
    As técnicas
  </Content>

export default Techniques

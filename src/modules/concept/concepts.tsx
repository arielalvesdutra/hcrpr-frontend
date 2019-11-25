import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import AddConcept from '../../components/concept/AddConcept'
import ListConcepts from '../../components/concept/ListConcepts'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts")
]

interface IConceptsProps { }

class Concepts extends Component<IConceptsProps> {
  
  render() {
    
    return (
      <Content
          title="Conceitos"
          breadcrumbLinks={breadcrumbLinks}>

        <AddConcept />
        <ListConcepts />
      </Content>
    )
  }
}

export default connect(null, null)(Concepts)

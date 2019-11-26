import React, { Component} from 'react'
import { connect } from 'react-redux'

import BreadcrumbLink from '../../types/BreadcrumbLink'
import Content from '../../layouts/Content'
import AddTechnique from '../../components/technique/AddTechnique'
import ListTechniques from '../../components/technique/ListTechniques'

const breadcrumbLinks = [
  new BreadcrumbLink("Técnicas", "/techniques")
]

interface ITechniquesProps { }

class Techniques extends Component<ITechniquesProps> {

  render() {

    return (
        <Content 
            title="Técnicas"
            breadcrumbLinks={breadcrumbLinks}>
              
          <AddTechnique />
          <ListTechniques />
        </Content>
    )
  }
}

export default connect(null, null)(Techniques)

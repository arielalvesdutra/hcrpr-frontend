import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import AddProblem from '../../components/problem/AddProblem'
import ListProblems from '../../components/problem/ListProblems'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems")
]

interface IProblemsProps {}

class Problems extends Component<IProblemsProps> {

  render() {

    return (
        <Content 
            title="Problemas"
            breadcrumbLinks={breadcrumbLinks}>
              
          <AddProblem />
          <ListProblems />
        </Content>
    )
  }
}

export default connect(null, null)(Problems)


import React from 'react'
import Content from '../../layouts/Content'

import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Problem from '../../models/Problem'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems")
]

const fakeProblems = [
  new Problem(1, "Distração nos estudos", "A distração nos estudos"),
  new Problem(2, "Algum outro problema", "O outro problema...")
]

const mapProblemsToItems = (parameterProblems:Problem[]):ListItem[] => {

  return parameterProblems.map((someProblem, key) => {
    return {
      title: someProblem.name
    }
  })
}

const Problems = () => 
  <Content 
    title="Problemas"
    breadcrumbLinks={breadcrumbLinks}>
    
    <section className="list_problems">
      <h2 className="content_subtitle">Lista de problemas</h2>

      <List items={mapProblemsToItems(fakeProblems)} />

    </section>
  </Content>

export default Problems

import React from 'react'
import Content from '../../layouts/Content'

import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Concept from '../../models/Concept'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts")
]

const fakeConcepts = [
  new Concept(1, "Grandes numeros", "Os grandes numeros"),
  new Concept(2, "Regressão à média", "Esse conceito procura...")
]

const mapConceptsToItems = (parameterConcepts:Concept[]):ListItem[] => {

  return parameterConcepts.map((someConcept, key) => {
    return {
      title: someConcept.name
    }
  })
}

const Concepts = () => 
    <Content
        title="Conceitos"
        breadcrumbLinks={breadcrumbLinks}>
    <section className="list_concepts">
      <h2 className="content_subtitle">Lista de conceitos</h2>

      <List items={mapConceptsToItems(fakeConcepts)} />
    </section>

    </Content>

export default Concepts

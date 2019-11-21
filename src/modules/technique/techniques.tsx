import React from 'react'
import Content from '../../layouts/Content'

import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Technique from '../../models/Technique'

const breadcrumbLinks = [
  new BreadcrumbLink("Técnicas", "/techniques")
]

const fakeTechniques = [
  new Technique(1, "Técnica X", "A técnica X")
]

const mapTechniquesToItems = (parameterTechniques:Technique[]):ListItem[] => {

  return parameterTechniques.map((someTechnique, key) => {
    return {
      title: someTechnique.name
    }
  })
}

const Techniques = () =>           
  <Content 
      title="Técnicas"
      breadcrumbLinks={breadcrumbLinks}>
        
    <section className="list_techniques">
      <h2 className="content_subtitle">Lista de técnicas</h2>

      <List items={mapTechniquesToItems(fakeTechniques)} />
    </section>
  </Content>

export default Techniques

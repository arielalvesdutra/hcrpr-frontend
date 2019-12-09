import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Concept from '../../models/Concept'
import {  fetchConceptById } from '../../redux/actions/conceptsActions'
import ConceptBasicInfos from '../../components/concept/ConceptBasicInfos'
import { usePageTitle } from '../../components/shared/UsePageTitle'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts"),
  new BreadcrumbLink("Detalhe", "#")
]

interface IConceptByIdProps {
  match: any
  currentConcept: Concept
  onFetchConceptById(id: number): any
}

class ConceptById extends Component<IConceptByIdProps> {

  componentDidMount = () => {
    const conceptId = this.props.match.params.id
    this.props.onFetchConceptById(conceptId)
  }

  componentDidUpdate = () => {
    const { currentConcept } = this.props
  
    if (currentConcept !== undefined) usePageTitle(`Conceito - ${currentConcept.name}`)
  }

  render() {

    const { currentConcept } = this.props
    
    return (
      <Content
          title="Detalhe do Conceito"
          breadcrumbLinks={breadcrumbLinks}>

        <ConceptBasicInfos key={currentConcept.id} concept={currentConcept} />
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {

  const { currentConcept } = props.concepts

  return {
    currentConcept
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchConceptById: (id:number) => dispatch(fetchConceptById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptById)

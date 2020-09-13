import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchConceptById } from '../../redux/actions/conceptsActions'
import { IConceptsInitialState } from '../../redux/reducers/conceptsReducer'
import Content from '../../layouts/Content'
import BreadcrumbLink from '../../interfaces/BreadcrumbLink'
import Concept from '../../models/Concept'
import ConceptBasicInfos from '../../components/concept/ConceptBasicInfos'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'

const breadcrumbLinks: BreadcrumbLink[] = [
  { name: "Conceitos", link: "/concepts" },
  { name: "Detalhe", link: "#" } 
]

interface ConceptByIdProps {
  currentConcept: Concept
  isLoadingCurrentConcept: boolean
  match: any
  onFetchConceptById(id: number): void
}

const ConceptById = (props: ConceptByIdProps) => {
  const { currentConcept, isLoadingCurrentConcept } = props
  const { onFetchConceptById, match } = props
  useEffect(() => {
    const conceptId = match.params.id
    onFetchConceptById(conceptId)
  }, [ onFetchConceptById, match])

  const pageTitle = currentConcept && currentConcept.name
    ? `Conceitos - ${currentConcept.name}`
    : `Conceitos`
  usePageTitle(pageTitle)

  if (isLoadingCurrentConcept)
    return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

  return (
    <Content
        title="Detalhe do Conceito"
        breadcrumbLinks={breadcrumbLinks}>

      <ConceptBasicInfos key={currentConcept.id} concept={currentConcept} />
    </Content>
  )
}

const mapStateToProps = (props: any) => {
  const { currentConcept, isLoadingCurrentConcept }: IConceptsInitialState = props.concepts

  return { currentConcept, isLoadingCurrentConcept }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchConceptById: (id: number) => dispatch(fetchConceptById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptById)

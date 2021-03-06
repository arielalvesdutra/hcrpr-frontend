import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../interfaces/BreadcrumbLink'
import AddConcept from '../../components/concept/AddConcept'
import ListConcepts from '../../components/concept/ListConcepts'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'
import { IConceptsInitialState } from '../../redux/reducers/conceptsReducer'
import { fetchAllConcepts } from '../../redux/actions/conceptsActions'

const breadcrumbLinks: BreadcrumbLink[] = [
  { name: "Conceitos", link: "/concepts" }
]

interface ConceptsProps {
  isLoadingConcepts: boolean
  onFetchAllConcepts(filters: Object): void
}

const Concepts = (props: ConceptsProps) => {
  const { isLoadingConcepts, onFetchAllConcepts } = props

  usePageTitle(`Conceitos`)
  useEffect(() => {
    onFetchAllConcepts({ page: 1 })
  }, [ onFetchAllConcepts ])

  if (isLoadingConcepts)
    return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

  return (
    <Content
        title="Conceitos"
        breadcrumbLinks={breadcrumbLinks}>

      <AddConcept />
      <ListConcepts />
    </Content>
  )
}

const mapStateToProps = (props: any) => {
  const { isLoadingConcepts }: IConceptsInitialState = props.concepts
  return {
    isLoadingConcepts
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchAllConcepts: (filters: any) => dispatch(fetchAllConcepts(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Concepts)

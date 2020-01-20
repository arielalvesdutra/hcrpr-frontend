import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import AddConcept from '../../components/concept/AddConcept'
import ListConcepts from '../../components/concept/ListConcepts'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'
import { IConceptsInitialState } from '../../redux/reducers/conceptsReducer'
import { fetchAllConcepts } from '../../redux/actions/conceptsActions'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts")
]

interface IConceptsProps { 
  isLoadingConcepts: boolean
  onFetchAllConcepts(filters:any): any
}

class Concepts extends Component<IConceptsProps> {

  componentDidMount = () => {
    usePageTitle(`Conceitos`)
    this.props.onFetchAllConcepts({ page: 1})
  }
  
  render() {
    const { isLoadingConcepts } = this.props
    
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
}

const mapStateToProps = (props:any) => {
  const { isLoadingConcepts }:IConceptsInitialState = props.concepts
  return {
    isLoadingConcepts
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllConcepts: (filters:any) => dispatch(fetchAllConcepts(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Concepts)

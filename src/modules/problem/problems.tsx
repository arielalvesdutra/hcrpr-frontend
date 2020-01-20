import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import AddProblem from '../../components/problem/AddProblem'
import ListProblems from '../../components/problem/ListProblems'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'
import { IProblemsInitialState } from '../../redux/reducers/problemsReducer'
import { fetchAllProblems } from '../../redux/actions/problemsActions'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems")
]

interface IProblemsProps {
  isLoadingProblems: boolean
  onFetchAllProblems(filters:any): any
}

class Problems extends Component<IProblemsProps> {

  componentDidMount = () => {
    usePageTitle(`Problemas`)
    this.props.onFetchAllProblems({page: 1})
  }

  render() {
    const { isLoadingProblems } = this.props

    if (isLoadingProblems)
      return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

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

const mapStateToProps = (props:any) => {
  const { isLoadingProblems }:IProblemsInitialState = props.problems
  return {
    isLoadingProblems
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllProblems: (filters:any) => dispatch(fetchAllProblems(filters))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Problems)


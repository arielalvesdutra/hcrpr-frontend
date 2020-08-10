import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import AddProblem from '../../components/problem/AddProblem/AddProblem'
import ListProblems from '../../components/problem/ListProblems/ListProblems'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'
import { IProblemsInitialState } from '../../redux/reducers/problemsReducer'
import { fetchAllProblems } from '../../redux/actions/problemsActions'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems")
]

interface ProblemsProps {
  isLoadingProblems: boolean
  onFetchAllProblems(filters: Object): void
}

const Problems = (props: ProblemsProps) => {
  const { isLoadingProblems, onFetchAllProblems } = props

  usePageTitle('Problemas')
  useEffect(() => {
    onFetchAllProblems({ page: 1 })
  }, [ onFetchAllProblems ])
  
  if (isLoadingProblems)
      return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

  return (
    <Content
      title="Problemas"
      breadcrumbLinks={breadcrumbLinks}>
      <section className="problem">
        <AddProblem />
        <ListProblems />
      </section>
    </Content>
  )
}

const mapStateToProps = (props: any) => {
  const { isLoadingProblems }: IProblemsInitialState = props.problems
  return {
    isLoadingProblems
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchAllProblems: (filters: any) => dispatch(fetchAllProblems(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Problems)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Problem from '../../models/Problem'
import {  fetchProblemById } from '../../redux/actions/problemsActions'
import ProblemBasicInfos from '../../components/problem/ProblemBasicInfos'
import ProblemComments from '../../components/problem/ProblemComments'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems"),
  new BreadcrumbLink("Detalhe", "#")
]

interface IProblemByIdProps {
  match: any
  currentProblem: Problem
  onFetchProblemById(id: number): any
}

class ProblemById extends Component<IProblemByIdProps> {

  componentDidMount = () => {
    const problemId = this.props.match.params.id
    this.props.onFetchProblemById(problemId)
  }

  render() {

    const { currentProblem } = this.props
    const { id } = currentProblem

    return (
      <Content
          title="Detalhe do Problema"
          breadcrumbLinks={breadcrumbLinks}>

        <ProblemBasicInfos problem={currentProblem} key={id} />
        <ProblemComments problem={currentProblem} key={(id !== undefined ? id + 1 : id)} />
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    currentProblem: props.problems.currentProblem
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchProblemById: (id:number) => dispatch(fetchProblemById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemById)

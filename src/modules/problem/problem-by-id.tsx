import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Problem from '../../models/Problem'
import {  fetchProblemById } from '../../redux/actions/problems'
import ProblemBasicInfos from '../../components/ProblemBasicInfos'

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

    return (
      <Content
          title="Detalhe do Problema"
          breadcrumbLinks={breadcrumbLinks}>

        <ProblemBasicInfos problem={currentProblem} key={currentProblem.id} />
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

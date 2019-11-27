import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Problem from '../../models/Problem'
import {  fetchProblemById } from '../../redux/actions/problemsActions'
import ProblemBasicInfos from '../../components/problem/ProblemBasicInfos'
import ProblemComments from '../../components/problem/ProblemComments'
import ProblemSolutionAttempts from '../../components/problem/ProblemSolutionAttempts'
import ProblemRelatedConcepts from '../../components/problem/ProblemRelatedConcepts'
import { fetchAllConcepts } from '../../redux/actions/conceptsActions'
import Concept from '../../models/Concept'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems"),
  new BreadcrumbLink("Detalhe", "#")
]

interface IProblemByIdProps {
  match: any
  currentProblem: Problem
  concepts: Concept[]
  onFetchProblemById(id: number): any
  onFetchAllConcepts(): any
}

class ProblemById extends Component<IProblemByIdProps> {

  componentDidMount = () => {
    const problemId = this.props.match.params.id
    const { onFetchAllConcepts, onFetchProblemById } = this.props
    onFetchProblemById(problemId)
    onFetchAllConcepts()
  }

  render() {

    const { currentProblem, concepts } = this.props
    const { id } = currentProblem

    return (
      <Content
          title="Detalhe do Problema"
          breadcrumbLinks={breadcrumbLinks}>

        <ProblemBasicInfos problem={currentProblem} key={id} />
        <ProblemComments problem={currentProblem} key={(id !== undefined ? id + 1 : id)} />
        <ProblemSolutionAttempts problem={currentProblem} key={(id !== undefined ? id + 2 : id)} />
        <ProblemRelatedConcepts problem={currentProblem} concepts={concepts}
            key={(id !== undefined ? id + 3 : id)}/>
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    currentProblem: props.problems.currentProblem,
    concepts: props.concepts.concepts
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchProblemById: (id:number) => dispatch(fetchProblemById(id)),
    onFetchAllConcepts: () => dispatch(fetchAllConcepts({ size: 100 }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemById)

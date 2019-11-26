import React, { Component } from 'react'
import { connect } from 'react-redux'

import BreadcrumbLink from '../../types/BreadcrumbLink'
import Content from '../../layouts/Content'
import SolutionAttemptBasicInfo from '../../components/solution-attempt/SolutionAttemptBasicInfo'
import { fetchSolutionAttemptById } from '../../redux/actions/problemsActions'
import SolutionAttempt from '../../models/SolutionAttempt'

interface ISolutionAttemptByIdProps {
  match: any
  onFetchSolutionAttemptById:any
  currentSolutionAttempt: SolutionAttempt
}

class SolutionAttemptById extends Component<ISolutionAttemptByIdProps> {

  componentDidMount = () => {
    const problemId = this.props.match.params.id
    const solutionAttemptId = this.props.match.params.solutionAttemptId
    this.props.onFetchSolutionAttemptById(problemId,solutionAttemptId)
  }

  render() {

    const problemId = this.props.match.params.id
    const { currentSolutionAttempt} = this.props

    const breadcrumbLinks = [
      new BreadcrumbLink("Problemas", "/problems"),
      new BreadcrumbLink(`Detalhe`, `/problems/${problemId ? problemId : ''}`),
      new BreadcrumbLink("Tentativa de Solução", "#")
    ]

    return (
      <Content
          title="Detalhe da Tentativa de Solução"
          breadcrumbLinks={breadcrumbLinks}>

        <SolutionAttemptBasicInfo key={currentSolutionAttempt.id} 
              solutionAttempt={currentSolutionAttempt} />
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  const {currentProblemSolutionAttempt} = props.problems 
  
  return {
    currentSolutionAttempt: currentProblemSolutionAttempt
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchSolutionAttemptById: (problemId:number, attemptId:number) => 
          dispatch(fetchSolutionAttemptById(problemId, attemptId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionAttemptById)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import SolutionAttempt from '../../models/SolutionAttempt'
import Technique from '../../models/Technique'
import { fetchSolutionAttemptById } from '../../redux/actions/problemsActions'
import { fetchAllTechniques } from '../../redux/actions/techniquesActions'
import SolutionAttemptBasicInfo from '../../components/solution-attempt/SolutionAttemptBasicInfo'
import SolutionAttemptComments from '../../components/solution-attempt/SolutionAttemptComments'
import SolutionAttemptTechniques from '../../components/solution-attempt/SolutionAttemptTechniques'
import { usePageTitle } from '../../components/shared/UsePageTitle'


interface ISolutionAttemptByIdProps {
  match: any
  onFetchSolutionAttemptById:any
  onFetchAllTechniques(): any
  currentSolutionAttempt: SolutionAttempt
  techniques: Technique[]
}

class SolutionAttemptById extends Component<ISolutionAttemptByIdProps> {

  componentDidMount = () => {
    const problemId = this.props.match.params.id
    const solutionAttemptId = this.props.match.params.solutionAttemptId
    const { onFetchAllTechniques, onFetchSolutionAttemptById } = this.props

    onFetchSolutionAttemptById(problemId,solutionAttemptId)
    onFetchAllTechniques()
  }

  componentDidUpdate = () => {
    const { currentSolutionAttempt } = this.props
  
    if (currentSolutionAttempt !== undefined) usePageTitle(`Tentativa - ${currentSolutionAttempt.name}`)
  }  

  render() {

    const problemId = this.props.match.params.id
    const { currentSolutionAttempt, techniques} = this.props
    const { id } = currentSolutionAttempt

    const breadcrumbLinks = [
      new BreadcrumbLink("Problemas", "/problems"),
      new BreadcrumbLink(`Detalhe`, `/problems/${problemId ? problemId : ''}`),
      new BreadcrumbLink("Tentativa de Solução", "#")
    ]

    return (
      <Content
          title="Detalhe da Tentativa de Solução"
          breadcrumbLinks={breadcrumbLinks}>

        <SolutionAttemptBasicInfo key={id} 
              solutionAttempt={currentSolutionAttempt} />
        <SolutionAttemptComments key={id ? id + 1 : '2'}
              solutionAttempt={currentSolutionAttempt}/>
        <SolutionAttemptTechniques key={id ? id + 2 : '3'} 
              solutionAttempt={currentSolutionAttempt} techniques={techniques}/>
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  const {currentProblemSolutionAttempt} = props.problems 
  const { techniques } = props.techniques
  return {
    currentSolutionAttempt: currentProblemSolutionAttempt,
    techniques 
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchSolutionAttemptById: (problemId:number, attemptId:number) => 
          dispatch(fetchSolutionAttemptById(problemId, attemptId)),
    onFetchAllTechniques: () => dispatch(fetchAllTechniques())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionAttemptById)

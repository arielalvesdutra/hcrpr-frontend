import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchSolutionAttemptById } from '../../redux/actions/problemsActions'
import { fetchAllTechniques } from '../../redux/actions/techniquesActions'
import { ITechniquesInitialState } from '../../redux/reducers/techniquesReducer'
import { IProblemsInitialState } from '../../redux/reducers/problemsReducer'
import Content from '../../layouts/Content'
import BreadcrumbLink from '../../interfaces/BreadcrumbLink'
import SolutionAttempt from '../../models/SolutionAttempt'
import Technique from '../../models/Technique'
import SolutionAttemptBasicInfo from '../../components/solution-attempt/SolutionAttemptBasicInfo'
import SolutionAttemptComments from '../../components/solution-attempt/SolutionAttemptComments'
import SolutionAttemptTechniques from '../../components/solution-attempt/SolutionAttemptTechniques'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'
import { keyWithMilliseconds } from '../../components/shared/UseKeyWithMilliseconds'


interface SolutionAttemptByIdProps {
  currentSolutionAttempt: SolutionAttempt
  techniques: Technique[]
  isLoading: boolean
  isLoadingTechniques: boolean
  match: any
  onFetchSolutionAttemptById(problemId: number, attemptId: number): void
  onFetchAllTechniques(): void
}

const SolutionAttemptById = (props: SolutionAttemptByIdProps) => {
  const problemId = props.match.params.id
  const solutionAttemptId = props.match.params.solutionAttemptId
  const { onFetchAllTechniques, onFetchSolutionAttemptById } = props

  useEffect(() => {

    onFetchSolutionAttemptById(problemId, solutionAttemptId)
    onFetchAllTechniques()
  }, [ onFetchAllTechniques, onFetchSolutionAttemptById, problemId, solutionAttemptId ])

  const { currentSolutionAttempt, techniques, isLoading } = props
  const { id } = currentSolutionAttempt
  
  const pageTitle = currentSolutionAttempt && currentSolutionAttempt.name
    ? `Tentativa - ${currentSolutionAttempt.name}`
    : `Tentativa`

  usePageTitle(pageTitle)

  const breadcrumbLinks: BreadcrumbLink[] = [
    { name: "Problemas", link:  "/problems"},
    { name: `Detalhe`, link: `/problems/${problemId ? problemId : ''}`},
    { name: "Tentativa de Solução", link: "#" }
  ]

  if (isLoading)
    return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

  return (
    <Content
      title="Detalhe da Tentativa de Solução"
      breadcrumbLinks={breadcrumbLinks}>

      <SolutionAttemptBasicInfo key={id ? keyWithMilliseconds(id) : '1'}
        solutionAttempt={currentSolutionAttempt} />
      <SolutionAttemptComments key={id ? id + 1 : '2'}
        solutionAttempt={currentSolutionAttempt} />
      <SolutionAttemptTechniques key={id ? id + 2 : '3'}
        solutionAttempt={currentSolutionAttempt} techniques={techniques} />
    </Content>
  )
}

const mapStateToProps = (props: any) => {
  const { currentProblemSolutionAttempt,
    isLoadingCurrentProblemSolutionAttempt }: IProblemsInitialState = props.problems
  const { techniques, isLoadingTechniques }: ITechniquesInitialState = props.techniques
  return {
    currentSolutionAttempt: currentProblemSolutionAttempt,
    isLoading: isLoadingCurrentProblemSolutionAttempt,
    techniques,
    isLoadingTechniques
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchSolutionAttemptById: (problemId: number, attemptId: number) =>
      dispatch(fetchSolutionAttemptById(problemId, attemptId)),
    onFetchAllTechniques: () => dispatch(fetchAllTechniques())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionAttemptById)

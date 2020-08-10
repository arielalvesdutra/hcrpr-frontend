import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Problem from '../../models/Problem'
import Concept from '../../models/Concept'
import Loading from '../../components/shared/Loading'
import ProblemBasicInfos from '../../components/problem/ProblemBasicInfos/ProblemBasicInfos'
import ProblemComments from '../../components/problem/ProblemComments/ProblemComments'
import ProblemSolutionAttempts from '../../components/problem/ProblemSolutionAttempts/ProblemSolutionAttempts'
import ProblemRelatedConcepts from '../../components/problem/ProblemRelatedConcepts/ProblemRelatedConcepts'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import { IProblemsInitialState } from '../../redux/reducers/problemsReducer'
import { IConceptsInitialState } from '../../redux/reducers/conceptsReducer'
import { 
  fetchProblemById, 
  fetchAllProblemRelatedConcepts, 
  clearCurrentProblemData } from '../../redux/actions/problemsActions'
import { fetchAllConcepts } from '../../redux/actions/conceptsActions'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems"),
  new BreadcrumbLink("Detalhe", "#")
]

interface ProblemByIdProps {
  isLoadingCurrentProblem: boolean
  isLoadingConcepts: boolean
  match: any
  currentProblem: Problem
  concepts: Concept[]
  relatedConcepts: Concept[]
  onFetchProblemById(id: number): Problem
  onFetchAllConcepts(): Concept[]
  onFetchAllProblemRelatedConcepts(id: number): Concept[]
  onClearCurrentProblemData(): void
}

const ProblemById = (props: ProblemByIdProps) => {
  const problemId = props.match.params.id

  const { onClearCurrentProblemData } = props
  const { onFetchProblemById } = props
  const { onFetchAllConcepts, onFetchAllProblemRelatedConcepts } = props
  const { currentProblem, concepts, relatedConcepts, isLoadingCurrentProblem } = props
  const [isProblemFirstLoadCompleted, setIsProblemFirstLoadCompleted] = useState(false)

  useEffect(() => {

    onClearCurrentProblemData()
    onFetchProblemById(problemId)
    onFetchAllConcepts()
    onFetchAllProblemRelatedConcepts(problemId)

    setIsProblemFirstLoadCompleted(true)
  }, [
    onClearCurrentProblemData,
    onFetchAllProblemRelatedConcepts,
    onFetchAllConcepts,
    onFetchProblemById,
    problemId
  ])


  const pageTitle = currentProblem && currentProblem.name
    ? `Problemas - ${currentProblem.name}`
    : `Problemas`
  usePageTitle(pageTitle)

  if (!isProblemFirstLoadCompleted || !currentProblem.id)
    return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

  return (
    <Content
      title="Detalhe do Problema"
      breadcrumbLinks={breadcrumbLinks}>

      <ProblemBasicInfos problem={currentProblem} key={`basicInfo`} isLoading={isLoadingCurrentProblem} />
      <ProblemComments problem={currentProblem} key={`comments`} />
      <ProblemSolutionAttempts problem={currentProblem} key={`attempts`} />
      <ProblemRelatedConcepts
        problem={currentProblem}
        concepts={concepts}
        relatedConcepts={relatedConcepts}
        key={`concepts`} />
    </Content>
  )
}

const mapStateToProps = (props: any) => {

  const { currentProblem, isLoadingCurrentProblem,
    currentProblemRelatedConcepts }: IProblemsInitialState = props.problems
  const { concepts, isLoadingConcepts }: IConceptsInitialState = props.concepts

  return {
    isLoadingCurrentProblem,
    currentProblem,
    isLoadingConcepts,
    concepts,
    relatedConcepts: currentProblemRelatedConcepts
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClearCurrentProblemData: () =>
      dispatch(clearCurrentProblemData()),
    onFetchProblemById: (id: number) =>
      dispatch(fetchProblemById(id)),
    onFetchAllConcepts: () =>
      dispatch(fetchAllConcepts({ size: 100 })),
    onFetchAllProblemRelatedConcepts: (problemId: number) =>
      dispatch(fetchAllProblemRelatedConcepts(problemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemById)

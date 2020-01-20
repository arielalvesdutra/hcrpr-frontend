import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Problem from '../../models/Problem'
import Concept from '../../models/Concept'
import Loading from '../../components/shared/Loading'
import ProblemBasicInfos from '../../components/problem/ProblemBasicInfos'
import ProblemComments from '../../components/problem/ProblemComments'
import ProblemSolutionAttempts from '../../components/problem/ProblemSolutionAttempts'
import ProblemRelatedConcepts from '../../components/problem/ProblemRelatedConcepts'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import { IProblemsInitialState } from '../../redux/reducers/problemsReducer'
import { IConceptsInitialState } from '../../redux/reducers/conceptsReducer'
import { fetchProblemById, fetchAllProblemRelatedConcepts } from '../../redux/actions/problemsActions'
import { fetchAllConcepts } from '../../redux/actions/conceptsActions'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems"),
  new BreadcrumbLink("Detalhe", "#")
]

interface IProblemByIdProps {
  isLoadingCurrentProblem: boolean
  isLoadingConcepts: boolean
  match: any
  currentProblem: Problem
  concepts: Concept[]
  relatedConcepts: Concept[]
  onFetchProblemById(id: number): any
  onFetchAllConcepts(): any
  onFetchAllProblemRelatedConcepts(id: number): any
}

class ProblemById extends Component<IProblemByIdProps> {

  componentDidMount = () => {
    const problemId = this.props.match.params.id
    const { 
      onFetchAllConcepts, 
      onFetchProblemById, 
      onFetchAllProblemRelatedConcepts } = this.props
    onFetchProblemById(problemId)
    onFetchAllConcepts()
    onFetchAllProblemRelatedConcepts(problemId)
  }

  componentDidUpdate = () => {
    const { currentProblem } = this.props

    if (currentProblem !== undefined) usePageTitle(`Problema - ${currentProblem.name}`)
  }

  render() {

    const { currentProblem, concepts, relatedConcepts,
      isLoadingCurrentProblem, isLoadingConcepts } = this.props
    const { id } = currentProblem

    if (isLoadingCurrentProblem || isLoadingConcepts)
        return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

    return (
      <Content
          title="Detalhe do Problema"
          breadcrumbLinks={breadcrumbLinks}>
            
        <ProblemBasicInfos problem={currentProblem} key={id} />
        <ProblemComments problem={currentProblem} key={(id !== undefined ? id + 1 : id)} />
        <ProblemSolutionAttempts problem={currentProblem} key={(id !== undefined ? id + 2 : id)} />
        <ProblemRelatedConcepts 
            problem={currentProblem} 
            concepts={concepts}
            relatedConcepts={relatedConcepts}  
            key={(relatedConcepts !== undefined ? relatedConcepts.length + 1000 : id)}/>
      </Content>
    )
  }
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

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchProblemById: (id:number) => dispatch(fetchProblemById(id)),
    onFetchAllConcepts: () => dispatch(fetchAllConcepts({ size: 100 })),
    onFetchAllProblemRelatedConcepts: (problemId: number) => 
        dispatch(fetchAllProblemRelatedConcepts(problemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemById)

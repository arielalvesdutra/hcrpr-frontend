import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createSolutionAttempt, fetchAllSolutionAttempts, deleteSolutionAttempt, 
  setCurrentProblemSolutionAttemptsPage } from '../../redux/actions/problemsActions'
import SolutionAttempt from '../../models/SolutionAttempt'
import './ProblemSolutionAttempts.scss'
import Problem from '../../models/Problem'
import Pagination from '../shared/Pagination'
import List, {ListItem} from '../shared/List'

interface IProblemSolutionAttemptsProps {
  problem: Problem
  onCreateSolutionAttempt: any
  onFetchAllSolutionAttempts: any
  onDeleteSolutionAttempt: any 
  onSetCurrentSolutionAttemptsPage: any
  attempts: SolutionAttempt[]
  itemsPerPage:number
  totalItems: number
  totalPages: number
  currentPage?: number
}

interface IProblemSolutionAttemptsState {
  name: string
  description: string
  fieldErrors: any
}

const mapSolutionAttemptsToItems = (problemId:number, parameterAttempts: SolutionAttempt[]):ListItem[] => {

  return parameterAttempts.map((parameterAttempt, key) => {
    return {
      id: parameterAttempt.id,
      title: parameterAttempt.name,
      link: `/problems/${problemId}/solution-attempts/${parameterAttempt.id}`
    }
  })
}

class ProblemSolutionAttempts extends Component<IProblemSolutionAttemptsProps, IProblemSolutionAttemptsState> {

  state = {
    name: '',
    description: '',
    fieldErrors: { } as any
  }

  componentDidMount = () => {
    const { onFetchAllSolutionAttempts, problem } = this.props

    if (problem.id !== undefined) 
      onFetchAllSolutionAttempts(problem.id, { sort: 'createdAt,desc' })
  }

  change = (event:any) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  clearErrors = () => {
    this.setState({ fieldErrors: {}})
  }

  validForm = () => {
    let fieldErrors:any = {}
    
    if (!this.state.name) {
      if (fieldErrors.name === undefined) fieldErrors.name = []
      fieldErrors.name.push('O campo nome deve ser preenchido')
    }

    if (this.state.name.length < 5) {
      if (fieldErrors.name === undefined) fieldErrors.name = []
      fieldErrors.name.push('O campo nome deve ter no mínimo 5 caracteres')
    }

    if (!this.state.description) {
      if (fieldErrors.description === undefined) fieldErrors.description = []
      fieldErrors.description.push('O campo descrição deve ser preenchido')
    }

    if (this.state.description.length < 5) {
      if (fieldErrors.description === undefined) fieldErrors.description = []
      fieldErrors.description.push('O campo descrição deve ter no mínimo 5 caracteres')
    }

    if(Object.keys(fieldErrors).length > 0) {
      
      this.setState({
        fieldErrors: fieldErrors
      })

      throw new Error('Há erros de preenchimento de campos no formulário')
    }
  }

  onCreateAttemptFormSubmit = (event:any) => {
    event.preventDefault()

    try {
      this.clearErrors()
      this.validForm()
      const { name, description } = this.state
      const { onCreateSolutionAttempt, problem } = this.props
      if (problem === undefined) return
      onCreateSolutionAttempt(problem.id, new SolutionAttempt(name, description))
    } catch(error) { console.log(error) }
    
  }

  render() {

    const { onCreateAttemptFormSubmit, change } = this
    const { name, description, fieldErrors } = this.state
    const { attempts, problem, onDeleteSolutionAttempt, 
      onFetchAllSolutionAttempts, currentPage, itemsPerPage, 
      totalItems, totalPages, onSetCurrentSolutionAttemptsPage } = this.props

    const fetchAllSolutionAttemptForPagination = (filters ={}) => {
      onFetchAllSolutionAttempts(problem.id, filters)
    }
  
    const showFieldErrors = (errors: []) => errors.map((err:string, key:any) => 
      <div key={key} className="row errorMessage">{err}</div>
    )

    const AddProblemSolutionAttempt = (
      <form onSubmit={onCreateAttemptFormSubmit}
          className="problemSolutionAttempts__addAttempt">
        <h3 className="content__subtitle__h3">Cadastrar Tentativa de Solução</h3>
        <div className="row">
          <label className="problemSolutionAttempts__addAttempt__label">
            Nome:
          </label>
          <input type="text" name="name"
              className="problemSolutionAttempts__addAttempt__input"
              value={name}
              onChange={change}
              placeholder="Digite o nome da tentativa de solução"/>
          
          {fieldErrors.name && (showFieldErrors(fieldErrors.name))}

        </div>
        <div className="row">
          <label className="problemSolutionAttempts__addAttempt__label">
            Descrição:
          </label>
          <textarea name="description"
              className="problemSolutionAttempts__addAttempt__contentTextArea"
              value={description}
              onChange={change}
              placeholder="Digite a descrição da tentativa de solução"></textarea>
          {fieldErrors.description && (showFieldErrors(fieldErrors.description))}
        </div>
        <div className="row">
          <button
              className="problemSolutionAttempts__addAttempt__addButton"
              type="submit">
            Adicionar tentativa de solução
          </button>
        </div>
      </form>
    )

    const ButtonToDeleteAttempt = (attemptId:number) =>
      <button onClick={() => onDeleteSolutionAttempt(problem.id, attemptId)} 
        className="problemSolutionAttempts__list__deleteButton">
        Deletar
      </button>

    const ListProblemSolutionAttemptsWithPagination = (
      <div className="problemSolutionAttempts__list_area">
        <h3 className="content__subtitle__h3">Lista de tentativas de solução</h3>

        {problem.id !== undefined && attempts && attempts.length > 0 && (
          <>
            <List actionButtons={[ButtonToDeleteAttempt]}
              items={mapSolutionAttemptsToItems(problem.id , attempts)} />
            <Pagination
              currentPage={currentPage}
              items={attempts}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              totalPages={totalPages}
              setItemsCurrentPage={onSetCurrentSolutionAttemptsPage}
              searchItemsCallback={fetchAllSolutionAttemptForPagination} />
          </>
        )}
        {attempts && attempts.length <= 0 && (
          <div className="row">
            <strong>
              Não há tentativas de solução cadastradas.
            </strong>
          </div>
        )}
      </div>
    )

    return (
      <section className="problemSolutionAttempts">
        <h2 className="content_subtitle">Tentativas de Solução</h2>
        <div className="problemSolutionAttempts__container">
          {AddProblemSolutionAttempt}
          {ListProblemSolutionAttemptsWithPagination}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (props:any)  => {
  
  const { currentProblemSolutionAttempts,   
    currentProblemSolutionAttemptsPage,
    currentProblemSolutionAttemptsTotalItems,
    currentProblemSolutionAttemptsTotalPages,
    currentProblemSolutionAttemptsItemsPerPage } = props.problems

  return {
    attempts: currentProblemSolutionAttempts,
    currentPage: currentProblemSolutionAttemptsPage,
    totalItems: currentProblemSolutionAttemptsTotalItems,
    totalPages: currentProblemSolutionAttemptsTotalPages,
    itemsPerPage: currentProblemSolutionAttemptsItemsPerPage
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onCreateSolutionAttempt: (problemId:number, SolutionAttempt: SolutionAttempt) =>  
          dispatch(createSolutionAttempt(problemId, SolutionAttempt)),

    onFetchAllSolutionAttempts: (problemId: number, filters= {}) => dispatch(fetchAllSolutionAttempts(problemId, filters)),
    onDeleteSolutionAttempt: (problemId: number, solutionAttemptId: number) =>
          dispatch(deleteSolutionAttempt(problemId, solutionAttemptId)),
    onSetCurrentSolutionAttemptsPage: (page:number) => dispatch(setCurrentProblemSolutionAttemptsPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemSolutionAttempts)

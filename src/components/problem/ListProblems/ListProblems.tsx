import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllProblems, deleteById, setProblemCurrentPage } from '../../../redux/actions/problemsActions'
import { IProblemsInitialState } from '../../../redux/reducers/problemsReducer'
import Problem from '../../../models/Problem'
import List, { ListItem } from '../../../components/shared/List'
import Pagination from '../../../components/shared/Pagination'
import Loading from '../../shared/Loading'
import './ListProblems.scss'

const mapProblemsToItems = (parameterProblems:Problem[]):ListItem[] => {

  return parameterProblems.map((parameterProblem, key) => {
    return {
      id: parameterProblem.id,
      title: parameterProblem.name,
      link: `/problems/${parameterProblem.id}`
    }
  })
}

interface IProblemsProps {
  onFetchAllProblems: any
  onDeleteById: any
  isLoadingProblems: boolean
  onSetCurrentPage: any
  problems: Problem[]
  itemsPerPage:number
  totalItems: number
  totalPages: number
  currentPage?: number
}

class ListProblems extends Component<IProblemsProps> {

  onDeleteByIdWithConfirmation = (id: number) => {
    const { onDeleteById } = this.props
    if (window.confirm("Você tem certeza?")) onDeleteById(id)
  }

  render() {

    const { problems, isLoadingProblems, totalPages,
      itemsPerPage, totalItems, onFetchAllProblems, 
      currentPage, onSetCurrentPage } = this.props
    const { onDeleteByIdWithConfirmation } = this

    const ButtonToDeleteProblem = (id:number) =>
      <button onClick={() => onDeleteByIdWithConfirmation(id)} 
        className="list__problems__deleteButton">
        Deletar
      </button>

    if (isLoadingProblems) 
      return <section className="list__problems"><Loading /></section>
    
    return (
      <section className="list__problems">
        <h2 className="content__subtitle">Lista de problemas</h2>
        {problems && (
          <>
            <List actionButtons={[ButtonToDeleteProblem]}
                items={mapProblemsToItems(problems)} />
            <Pagination
              currentPage={currentPage}
              items={problems}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              totalPages={totalPages}
              setItemsCurrentPage={onSetCurrentPage}
              searchItemsCallback={onFetchAllProblems} />
          </>
        )}
        {!isLoadingProblems && problems && problems.length <= 0 && (
        <div>
          <strong>
            Não há problemas cadastrados
          </strong>
        </div>
      )}
      </section>
    )
  }
}

const mapStateToProps = (props: any) => {
  const { problems, totalItems, itemsPerPage, 
    isLoadingProblems, totalPages, currentPage }:IProblemsInitialState = props.problems
  
  return {
    problems,
    isLoadingProblems,
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllProblems: (filters = {}) => dispatch(fetchAllProblems(filters)),
    onDeleteById: (id:number) => dispatch(deleteById(id)),
    onSetCurrentPage: (page: number) => dispatch(setProblemCurrentPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProblems)


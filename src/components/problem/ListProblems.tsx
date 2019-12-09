import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchAllProblems, deleteById, setProblemCurrentPage } from '../../redux/actions/problemsActions'
import Problem from '../../models/Problem'
import List, { ListItem } from '../../components/shared/List'
import Pagination from '../../components/shared/Pagination'
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
  loadingProblems: boolean
  onSetCurrentPage: any
  problems: Problem[]
  itemsPerPage:number
  totalItems: number
  totalPages: number
  currentPage?: number
}

class ListProblems extends Component<IProblemsProps> {

  componentDidMount = () => {
    this.props.onFetchAllProblems()
  }

  onDeleteByIdWithConfirmation = (id: number) => {
    const { onDeleteById } = this.props
    if (window.confirm("Você tem certeza?")) onDeleteById(id)
  }

  render() {

    const { problems, loadingProblems, totalPages,
      itemsPerPage, totalItems, onFetchAllProblems, 
      currentPage, onSetCurrentPage } = this.props
    const { onDeleteByIdWithConfirmation } = this

    const ButtonToDeleteProblem = (id:number) =>
      <button onClick={() => onDeleteByIdWithConfirmation(id)} 
        className="list__problems__deleteButton">
        Deletar
      </button>

    return (
      <section className="list_problems">
        <h2 className="content_subtitle">Lista de problemas</h2>
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
        {loadingProblems === false && problems && problems.length <= 0 && (
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
    loadingProblems, totalPages, currentPage } = props.problems
  
  return {
    problems,
    totalItems,
    itemsPerPage,
    loadingProblems,
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


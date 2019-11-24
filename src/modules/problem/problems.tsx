import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Problem from '../../models/Problem'
import { fetchAllProblems, deleteById, setProblemCurrentPage } from '../../redux/actions/problems'

import AddProblem from '../../components/AddProblem'
import './problems.scss'
import Pagination from '../../components/Pagination'


const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems")
]

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

class Problems extends Component<IProblemsProps> {

  componentDidMount = () => {
    this.props.onFetchAllProblems()
  }

  render() {

    const { problems, loadingProblems, onDeleteById, totalPages,
      itemsPerPage, totalItems, onFetchAllProblems, 
      currentPage, onSetCurrentPage } = this.props

      const buttonToDeleteProblem = (id:number) =>
      <button onClick={() => onDeleteById(id)} 
         className="list__problems__deleteButton">
        Deletar
      </button>

    return (
        <Content 
            title="Problemas"
            breadcrumbLinks={breadcrumbLinks}>
              
          <AddProblem />
          <section className="list_problems">
            <h2 className="content_subtitle">Lista de problemas</h2>
            {problems && (
              <>
                <List actionButtons={[buttonToDeleteProblem]}
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
        </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(Problems)


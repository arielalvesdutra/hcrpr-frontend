import React, { Component } from 'react'
import { connect } from 'react-redux'

import Concept from '../../models/Concept'
import {
  fetchAllConcepts, deleteById,
  setConceptCurrentPage
} from '../../redux/actions/conceptsActions'
import { IConceptsInitialState } from '../../redux/reducers/conceptsReducer'
import List, { ListItem } from '../../components/shared/List'
import Pagination from '../../components/shared/Pagination'
import Loading from '../shared/Loading'
import './ListConcepts.scss'

export const mapConceptsToItems = (parameterConcepts: Concept[]): ListItem[] => {

  return parameterConcepts.map((parameterConcept, key) => {
    return {
      id: parameterConcept.id,
      title: parameterConcept.name,
      link: `/concepts/${parameterConcept.id}`
    }
  })
}

interface IConceptsProps {
  onFetchAllConcepts: any
  onDeleteById: any
  concepts: Concept[]
  isLoadingConcepts: boolean
  itemsPerPage: number
  totalItems: number
  totalPages: number
  currentPage?: number
  onSetCurrentPage: any
}

class ListConcepts extends Component<IConceptsProps> {

  onDeleteByIdWithConfirmation = (id: number) => {
    const { onDeleteById } = this.props
    if (window.confirm("Você tem certeza?")) onDeleteById(id)
  }

  render() {
    const { concepts, isLoadingConcepts, totalPages,
      itemsPerPage, totalItems, onFetchAllConcepts,
      currentPage, onSetCurrentPage } = this.props
    const { onDeleteByIdWithConfirmation } = this

    const ButtonToDeleteConcept = (id: number) =>
      <button onClick={() => onDeleteByIdWithConfirmation(id)}
        className="list__concepts__deleteButton">
        Deletar
       </button>

    if (isLoadingConcepts)
      return <section className="list__concepts"><Loading /></section>

    return (
      <section className="list__concepts">
        <h2 className="content__subtitle">Lista de conceitos</h2>
        {concepts && (
          <>
            <List actionButtons={[ButtonToDeleteConcept]}
              items={mapConceptsToItems(concepts)} />
            <Pagination
              currentPage={currentPage}
              items={concepts}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              totalPages={totalPages}
              setItemsCurrentPage={onSetCurrentPage}
              searchItemsCallback={onFetchAllConcepts} />
          </>
        )}

        {!isLoadingConcepts && concepts && concepts.length <= 0 && (
          <div>
            <strong>
              Não há conceitos cadastrados
            </strong>
          </div>
        )}
      </section>
    )
  }
}

const mapStateToProps = (props: any) => {

  const { concepts, totalItems, itemsPerPage,
    isLoadingConcepts, totalPages, currentPage }: IConceptsInitialState = props.concepts

  return {
    concepts,
    totalItems,
    itemsPerPage,
    isLoadingConcepts,
    totalPages,
    currentPage
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchAllConcepts: (filters = {}) => dispatch(fetchAllConcepts(filters)),
    onDeleteById: (id: number) => dispatch(deleteById(id)),
    onSetCurrentPage: (page: number) => dispatch(setConceptCurrentPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListConcepts)

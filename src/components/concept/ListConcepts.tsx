import React, { Component } from 'react'
import { connect } from 'react-redux'

import Concept from '../../models/Concept'
import { fetchAllConcepts, deleteById, setConceptCurrentPage } from '../../redux/actions/conceptsActions'
import List, { ListItem } from '../../components/shared/List'
import Pagination from '../../components/shared/Pagination'
import './ListConcepts.scss'

const mapConceptsToItems = (parameterConcepts:Concept[]):ListItem[] => {

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
  loadingConcepts: boolean
  itemsPerPage:number
  totalItems: number
  totalPages: number
  currentPage?: number
  onSetCurrentPage: any
}

class ListConcepts extends Component<IConceptsProps> {

  componentDidMount = () => {
    this.props.onFetchAllConcepts({ page: 1})
  }

  render() {

    const { concepts, loadingConcepts, onDeleteById, totalPages,
      itemsPerPage, totalItems, onFetchAllConcepts, 
      currentPage, onSetCurrentPage } = this.props

    const ButtonToDeleteConcept = (id:number) =>
       <button onClick={() => onDeleteById(id)} 
          className="list__concepts__deleteButton">
         Deletar
       </button>
     
    return (
      <section className="list_concepts">
        <h2 className="content_subtitle">Lista de conceitos</h2>
        
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

        {loadingConcepts === false && concepts && concepts.length <= 0 && (
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
    loadingConcepts, totalPages, currentPage } = props.concepts
  
  return {
    concepts: concepts,
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    loadingConcepts: loadingConcepts,
    totalPages: totalPages,
    currentPage: currentPage
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllConcepts: (filters = {}) => dispatch(fetchAllConcepts(filters)),
    onDeleteById: (id:number) => dispatch(deleteById(id)),
    onSetCurrentPage: (page: number) => dispatch(setConceptCurrentPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListConcepts)

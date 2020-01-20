import React, { Component} from 'react'
import { connect } from 'react-redux'

import { fetchAllTechniques, deleteById,
  setTechniqueCurrentPage } from '../../redux/actions/techniquesActions'
import { ITechniquesInitialState } from '../../redux/reducers/techniquesReducer'
import Technique from '../../models/Technique'
import List, { ListItem } from '../shared/List'
import Pagination from '../shared/Pagination'
import Loading from '../shared/Loading'
import './ListTechniques.scss'

export const mapTechniquesToItems = (parameterTechniques:Technique[]):ListItem[] => {

  return parameterTechniques.map((parameterTechnique, key) => {
    return {
      id: parameterTechnique.id,
      title: parameterTechnique.name,
      link: `/techniques/${parameterTechnique.id}`
    }
  })
}

interface ITechniquesProps {
  onFetchAllTechniques: any
  onDeleteById: any
  techniques: Technique[]
  onSetCurrentPage: any
  isLoadingTechniques: boolean
  itemsPerPage:number
  totalItems: number
  totalPages: number
  currentPage?: number
}

class ListTechniques extends Component<ITechniquesProps> {


  onDeleteByIdWithConfirmation = (id: number) => {
    const { onDeleteById } = this.props
    if (window.confirm("Você tem certeza?")) onDeleteById(id)
  }

  render() {

    const { techniques, isLoadingTechniques, totalPages,
      itemsPerPage, totalItems, onFetchAllTechniques, 
      currentPage, onSetCurrentPage } = this.props
    const { onDeleteByIdWithConfirmation } = this

    const ButtonToDeleteTechnique = (id:number) =>
       <button onClick={() => onDeleteByIdWithConfirmation(id)} 
          className="list__techniques__deleteButton">
         Deletar
       </button>
    
    if (isLoadingTechniques) return <section className="list__techniques"><Loading /></section>

    return (
      <section className="list__techniques">        
        {techniques && (
          <>
            <List actionButtons={[ButtonToDeleteTechnique]}
              items={mapTechniquesToItems(techniques)} />

            <Pagination
                currentPage={currentPage}
                items={techniques}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                totalPages={totalPages}
                setItemsCurrentPage={onSetCurrentPage}
                searchItemsCallback={onFetchAllTechniques} />
          </>
        )}

        {!isLoadingTechniques && techniques && techniques.length <= 0 && (
          <div>
            <strong>
              Não há técnicas cadastradas
            </strong>
          </div>
        )}
      </section>
    )
  }
}

const mapStateToProps = (props: any) => {
  const { techniques,  totalItems, itemsPerPage, 
    isLoadingTechniques, totalPages, currentPage }: ITechniquesInitialState = props.techniques

  return {
    techniques,
    isLoadingTechniques,
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllTechniques: (filters = {}) => dispatch(fetchAllTechniques(filters)),
    onDeleteById: (id:number) => dispatch(deleteById(id)),
    onSetCurrentPage: (page: number) => dispatch(setTechniqueCurrentPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTechniques)

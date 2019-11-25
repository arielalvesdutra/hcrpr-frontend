import React, { Component} from 'react'
import { connect } from 'react-redux'

import { fetchAllTechniques, deleteById,
  setTechniqueCurrentPage } from '../../redux/actions/techniquesActions'
import Technique from '../../models/Technique'
import List, { ListItem } from '../shared/List'
import Pagination from '../shared/Pagination'

import './ListTechniques.scss'

const mapTechniquesToItems = (parameterTechniques:Technique[]):ListItem[] => {

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
  loadingTechniques: boolean
  itemsPerPage:number
  totalItems: number
  totalPages: number
  currentPage?: number
}

class ListTechniques extends Component<ITechniquesProps> {

  componentDidMount = () => {
    this.props.onFetchAllTechniques()
  }

  render() {

    const { techniques, loadingTechniques, onDeleteById, totalPages,
      itemsPerPage, totalItems, onFetchAllTechniques, 
      currentPage, onSetCurrentPage } = this.props

    const ButtonToDeleteTechnique = (id:number) =>
       <button onClick={() => onDeleteById(id)} 
          className="list__techniques__deleteButton">
         Deletar
       </button>

    return (
      <section className="list_techniques">
        <h2 className="content_subtitle">Lista de técnicas</h2>
        
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

        {loadingTechniques === false && techniques && techniques.length <= 0 && (
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
    loadingTechniques, totalPages, currentPage } = props.techniques

  return {
    techniques,
    totalItems,
    itemsPerPage,
    loadingTechniques,
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

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Concept from '../../models/Concept'
import { fetchAllConcepts, deleteById } from '../../redux/actions/concepts'

import AddConcept from '../../components/AddConcept'
import './concepts.scss'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts")
]

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
  concepts: Concept[],
  loadingConcepts: boolean
}

class Concepts extends Component<IConceptsProps> {

  state = {
    modal: false
  }

  componentDidMount = () => {
    this.props.onFetchAllConcepts()
  }
  
  render() {

    const {concepts, loadingConcepts, onDeleteById } = this.props

    const buttonToDeleteConcept = (id:number) =>
       <button onClick={() => onDeleteById(id)} 
          className="list__concepts__deleteButton">
         Deletar
       </button>
     
    return (
      <Content
          title="Conceitos"
          breadcrumbLinks={breadcrumbLinks}>

        <AddConcept />
        <section className="list_concepts">
          <h2 className="content_subtitle">Lista de conceitos</h2>
          
          {concepts && (
            <List actionButtons={[buttonToDeleteConcept]}
                items={mapConceptsToItems(concepts)} />
          )}

          {loadingConcepts === false && concepts && concepts.length <= 0 && (
            <div>
              <strong>
                Não há coceitos cadastrados
              </strong>
            </div>
          )}
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    concepts: props.concepts.concepts,
    loadingConcepts: props.concepts.loadingConcepts
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllConcepts: () => dispatch(fetchAllConcepts()),
    onDeleteById: (id:number) => dispatch(deleteById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Concepts)

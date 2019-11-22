import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Concept from '../../models/Concept'
import {  fetchConceptById } from '../../redux/actions/concepts'
import './concept-by-id.scss'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts"),
  new BreadcrumbLink("Detalhe", "#")
]

interface IConceptByIdProps {
  match: any
  currentConcept: Concept
  onFetchConceptById(id: number): any
}

class ConceptById extends Component<IConceptByIdProps> {

  componentDidMount = () => {
    const conceptId = this.props.match.params.id
    this.props.onFetchConceptById(conceptId)
  }

  render() {
    
    return (
      <Content
          title="Detalhe do Conceito"
          breadcrumbLinks={breadcrumbLinks}>

        <section className="detail__concept">
          <h2 className="content_subtitle">Descrição</h2>
          <div className="detail__concept__infos">
            <div className="row">
                <strong>ID # </strong> {this.props.currentConcept.id}
            </div>
            <div className="row">
              <span className="detail__concept__infos__title">
                Nome: 
              </span>
              {this.props.currentConcept.name}
            </div>
            <div className="row">

            <span className="detail__concept__infos__title">
                Descrição: 
              </span>
              {this.props.currentConcept.description}
            </div>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    currentConcept: props.concepts.currentConcept
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchConceptById: (id:number) => dispatch(fetchConceptById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptById)

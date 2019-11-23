import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Technique from '../../models/Technique'
import {  fetchTechniqueById } from '../../redux/actions/techniques'
import './technique-by-id.scss'

const breadcrumbLinks = [
  new BreadcrumbLink("Técnicas", "/techniques"),
  new BreadcrumbLink("Detalhe", "#")
]

interface ITechniqueByIdProps {
  match: any
  currentTechnique: Technique
  onFetchTechniqueById(id: number): any
}

class TechniqueById extends Component<ITechniqueByIdProps> {

  componentDidMount = () => {
    const techniqueId = this.props.match.params.id
    this.props.onFetchTechniqueById(techniqueId)
  }

  render() {
    
    return (
      <Content
          title="Detalhe da Técnica"
          breadcrumbLinks={breadcrumbLinks}>

        <section className="detail__technique">
          <h2 className="content_subtitle">Informações</h2>
          <div className="detail__technique__infos">
            <div className="row">
                <strong>ID # </strong> {this.props.currentTechnique.id}
            </div>
            <div className="row">
              <span className="detail__technique__infos__title">
                Nome: 
              </span>
              {this.props.currentTechnique.name}
            </div>
            <div className="row">

            <span className="detail__technique__infos__title">
                Descrição: 
              </span>
              {this.props.currentTechnique.description}
            </div>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    currentTechnique: props.techniques.currentTechnique
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchTechniqueById: (id:number) => dispatch(fetchTechniqueById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechniqueById)

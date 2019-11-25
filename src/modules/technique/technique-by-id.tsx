import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Technique from '../../models/Technique'
import {  fetchTechniqueById } from '../../redux/actions/techniquesActions'
import TechniqueBasicInfo from '../../components/technique/TechniqueBasicInfos'

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
    const { currentTechnique } = this.props
    return (
      <Content
          title="Detalhe da Técnica"
          breadcrumbLinks={breadcrumbLinks}>
          
          <TechniqueBasicInfo technique={currentTechnique} key={currentTechnique.id}/>
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

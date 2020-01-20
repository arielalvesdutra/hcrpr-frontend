import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Technique from '../../models/Technique'
import {  fetchTechniqueById } from '../../redux/actions/techniquesActions'
import TechniqueBasicInfo from '../../components/technique/TechniqueBasicInfos'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import { ITechniquesInitialState } from '../../redux/reducers/techniquesReducer'
import Loading from '../../components/shared/Loading'

const breadcrumbLinks = [
  new BreadcrumbLink("Técnicas", "/techniques"),
  new BreadcrumbLink("Detalhe", "#")
]

interface ITechniqueByIdProps {
  isLoadingCurrentTechnique: boolean
  match: any
  currentTechnique: Technique
  onFetchTechniqueById(id: number): any
}

class TechniqueById extends Component<ITechniqueByIdProps> {

  componentDidMount = () => {
    const techniqueId = this.props.match.params.id
    this.props.onFetchTechniqueById(techniqueId)
  }

  componentDidUpdate = () => {
    const { currentTechnique } = this.props
  
    if (currentTechnique !== undefined) usePageTitle(`Técnica - ${currentTechnique.name}`)
  }

  render() {
    const { currentTechnique, isLoadingCurrentTechnique } = this.props

    if (isLoadingCurrentTechnique)
      return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

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
  const { currentTechnique, 
    isLoadingCurrentTechnique }: ITechniquesInitialState = props.techniques

  return {
    currentTechnique,
    isLoadingCurrentTechnique
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchTechniqueById: (id:number) => dispatch(fetchTechniqueById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechniqueById)

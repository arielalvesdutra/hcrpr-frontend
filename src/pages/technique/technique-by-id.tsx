import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchTechniqueById } from '../../redux/actions/techniquesActions'
import { ITechniquesInitialState } from '../../redux/reducers/techniquesReducer'
import Content from '../../layouts/Content'
import BreadcrumbLink from '../../interfaces/BreadcrumbLink'
import Technique from '../../models/Technique'
import TechniqueBasicInfo from '../../components/technique/TechniqueBasicInfos'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'

const breadcrumbLinks: BreadcrumbLink[] = [
  { name: "Técnicas", link: "/techniques" },
  { name: "Detalhe", link: "#"}
]

interface TechniqueByIdProps {
  isLoadingCurrentTechnique: boolean
  match: any
  currentTechnique: Technique
  onFetchTechniqueById(id: number): void
}

const TechniqueById = (props: TechniqueByIdProps) => {
  const { currentTechnique, isLoadingCurrentTechnique } = props
  const { onFetchTechniqueById, match } = props

  useEffect(() => {
    const techniqueId = match.params.id
    onFetchTechniqueById(techniqueId)
  }, [ onFetchTechniqueById, match ])

  
  const pageTitle = currentTechnique && currentTechnique.name
    ? `Técnicas - ${currentTechnique.name}`
    : `Técnicas`
  usePageTitle(pageTitle)
  
  if (isLoadingCurrentTechnique)
    return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

  return (
    <Content
        title="Detalhe da Técnica"
        breadcrumbLinks={breadcrumbLinks}>

      <TechniqueBasicInfo technique={currentTechnique} key={currentTechnique.id} />
    </Content>
  )
}

const mapStateToProps = (props: any) => {
  const { currentTechnique, isLoadingCurrentTechnique }: ITechniquesInitialState = props.techniques

  return {
    currentTechnique,
    isLoadingCurrentTechnique
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchTechniqueById: (id: number) => dispatch(fetchTechniqueById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechniqueById)

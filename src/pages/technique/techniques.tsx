import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import BreadcrumbLink from '../../types/BreadcrumbLink'
import Content from '../../layouts/Content'
import AddTechnique from '../../components/technique/AddTechnique'
import ListTechniques from '../../components/technique/ListTechniques'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import Loading from '../../components/shared/Loading'
import { fetchAllTechniques } from '../../redux/actions/techniquesActions'
import { ITechniquesInitialState } from '../../redux/reducers/techniquesReducer'

const breadcrumbLinks = [
  new BreadcrumbLink("Técnicas", "/techniques")
]

interface TechniquesProps {
  onFetchAllTechniques(filters: Object): void
  isLoadingTechniques: boolean
}

const Techniques = (props: TechniquesProps) => {
  const { isLoadingTechniques, onFetchAllTechniques } = props

  useEffect(() => {
    onFetchAllTechniques({ page: 1 })
  }, [ onFetchAllTechniques ])

  usePageTitle(`Técnicas`)

  if (isLoadingTechniques)
    return <Content title="" breadcrumbLinks={[]}><Loading /></Content>

  return (
    <Content
        title="Técnicas"
        breadcrumbLinks={breadcrumbLinks}>

      <AddTechnique />
      <ListTechniques />
    </Content>
  )
}

const mapStateToProps = (props: any) => {
  const { isLoadingTechniques }: ITechniquesInitialState = props.techniques
  return {
    isLoadingTechniques
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchAllTechniques: (filters: any) => dispatch(fetchAllTechniques(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Techniques)

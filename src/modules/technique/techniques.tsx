import React, { Component} from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Technique from '../../models/Technique'
import { fetchAllTechniques } from '../../redux/actions/techniques'

const breadcrumbLinks = [
  new BreadcrumbLink("Técnicas", "/techniques")
]

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
  techniques: Technique[]
}

class Techniques extends Component<ITechniquesProps> {

  componentDidMount = () => {
    this.props.onFetchAllTechniques()
  }

  render() {
    return (
        <Content 
            title="Técnicas"
            breadcrumbLinks={breadcrumbLinks}>
              
          <section className="list_techniques">
            <h2 className="content_subtitle">Lista de técnicas</h2>
            
            {this.props.techniques && (
              <List items={mapTechniquesToItems(this.props.techniques)} />
            )}
          </section>
        </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    techniques: props.techniques.techniques
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllTechniques: () => dispatch(fetchAllTechniques())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Techniques)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Concept from '../../models/Concept'
import { fetchAllConcepts } from '../../redux/actions/concepts'

const breadcrumbLinks = [
  new BreadcrumbLink("Conceitos", "/concepts")
]

const mapConceptsToItems = (parameterConcepts:Concept[]):ListItem[] => {

  return parameterConcepts.map((someConcept, key) => {
    return {
      title: someConcept.name
    }
  })
}

interface IConceptsProps {
  onFetchAllConcepts: any
  concepts: Concept[]
}

class Concepts extends Component<IConceptsProps> {

  componentDidMount = () => {
    this.props.onFetchAllConcepts()
  }

  render() {

    return (
      <Content
          title="Conceitos"
          breadcrumbLinks={breadcrumbLinks}>

        <section className="list_concepts">
          <h2 className="content_subtitle">Lista de conceitos</h2>
          
          {this.props.concepts && (
            <List items={mapConceptsToItems(this.props.concepts)} />
          )}
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    concepts: props.concepts.concepts
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllConcepts: () => dispatch(fetchAllConcepts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Concepts)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import List, {ListItem} from '../../components/List'
import Problem from '../../models/Problem'
import { fetchAllProblems } from '../../redux/actions/problems'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems")
]

const mapProblemsToItems = (parameterProblems:Problem[]):ListItem[] => {

  return parameterProblems.map((parameterProblem, key) => {
    return {
      id: parameterProblem.id,
      title: parameterProblem.name,
      link: `/problems/${parameterProblem.id}`
    }
  })
}

interface IProblemsProps {
  onFetchAllProblems: any
  problems: Problem[]
}

class Problems extends Component<IProblemsProps> {

  componentDidMount = () => {
    this.props.onFetchAllProblems()
  }

  render() {
    return (
        <Content 
            title="Problemas"
            breadcrumbLinks={breadcrumbLinks}>
              
          <section className="list_problems">
            <h2 className="content_subtitle">Lista de técnicas</h2>
            
            {this.props.problems && (
              <List items={mapProblemsToItems(this.props.problems)} />
            )}
          </section>
        </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    problems: props.problems.problems
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllProblems: () => dispatch(fetchAllProblems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Problems)


import React, { Component } from 'react'
import { connect } from 'react-redux'

import Content from '../../layouts/Content'
import BreadcrumbLink from '../../types/BreadcrumbLink'
import Problem from '../../models/Problem'
import {  fetchProblemById } from '../../redux/actions/problems'
import './problem-by-id.scss'

const breadcrumbLinks = [
  new BreadcrumbLink("Problemas", "/problems"),
  new BreadcrumbLink("Detalhe", "#")
]

interface IProblemByIdProps {
  match: any
  currentProblem: Problem
  onFetchProblemById(id: number): any
}

class ProblemById extends Component<IProblemByIdProps> {

  componentDidMount = () => {
    const problemId = this.props.match.params.id
    this.props.onFetchProblemById(problemId)
  }

  render() {

    console.log('prosp', this.props);
    
    
    return (
      <Content
          title="Detalhe do Problema"
          breadcrumbLinks={breadcrumbLinks}>

        <section className="detail__problem">
          <h2 className="content_subtitle">Informações</h2>
          <div className="detail__problem__infos">
            <div className="row">
                <strong>ID # </strong> {this.props.currentProblem.id}
            </div>
            <div className="row">
              <span className="detail__problem__infos__title">
                Nome: 
              </span>
              {this.props.currentProblem.name}
            </div>
            <div className="row">

            <span className="detail__problem__infos__title">
                Descrição: 
              </span>
              {this.props.currentProblem.description}
            </div>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (props: any) => {
  return {
    currentProblem: props.problems.currentProblem
   }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchProblemById: (id:number) => dispatch(fetchProblemById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemById)

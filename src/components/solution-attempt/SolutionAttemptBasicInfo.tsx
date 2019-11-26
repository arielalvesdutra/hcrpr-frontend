import React, { Component } from 'react'
import { connect } from 'react-redux'

import './SolutionAttemptBasicInfo.scss'
import SolutionAttempt from '../../models/SolutionAttempt'
import ShowFieldErrors from '../shared/ShowFieldErrors'
import { updateSolutionAttempt } from '../../redux/actions/problemsActions'

interface ISolutionAttemptBasicInfoProps {
  solutionAttempt: SolutionAttempt
  onUpdateSolutionAttempt:any
}

interface ISolutionAttemptBasicInfoState {
  isEditing: boolean
  name: string
  description: string
  fieldErrors: any
}

class SolutionAttemptBasicInfo extends 
    Component<ISolutionAttemptBasicInfoProps, ISolutionAttemptBasicInfoState> {
  
  state = {
    isEditing: false,
    name: '',
    description: '',
    fieldErrors: {} as any
  }

  change = (event:any) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  clearErrors = () => {
    this.setState({ fieldErrors: {}})
  }
  
  componentDidMount = () => {  
    const { description, name } = this.props.solutionAttempt
    this.setState({
      name: name ? name : '',
      description: description ? description : '' 
    })
  }

  toogleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    }) 
  }

  validForm = () => {
    let fieldErrors:any = {}
    
    if (!this.state.name) {
      if (fieldErrors.name === undefined) fieldErrors.name = []
      fieldErrors.name.push('O campo nome deve ser preenchido')
    }

    if (this.state.name.length < 5) {
      if (fieldErrors.name === undefined) fieldErrors.name = []
      fieldErrors.name.push('O campo nome deve ter no mínimo 5 caracteres')
    }

    if (!this.state.description) {
      if (fieldErrors.description === undefined) fieldErrors.description = []
      fieldErrors.description.push('O campo descrição deve ser preenchido')
    }

    if (this.state.description.length < 5) {
      if (fieldErrors.description === undefined) fieldErrors.description = []
      fieldErrors.description.push('O campo descrição deve ter no mínimo 5 caracteres')
    }

    if(Object.keys(fieldErrors).length > 0) {
      
      this.setState({
        fieldErrors: fieldErrors
      })

      throw new Error('Há erros de preenchimento de campos no formulário')
    }
  }

  handleSubmit = (event:any) => { 
    event.preventDefault()

    try {
      this.clearErrors()
      this.validForm()
      const { name, description } = this.state
      const { onUpdateSolutionAttempt, solutionAttempt } = this.props

      if (solutionAttempt.problem === undefined) return

      onUpdateSolutionAttempt(
        solutionAttempt.problem.id, 
        solutionAttempt.id,
        new SolutionAttempt(name, description)
      )

      this.toogleEditing()
    } catch(error) { console.log(error) }
  }

  render() {

    const { solutionAttempt } = this.props
    const { name, description, fieldErrors, isEditing } = this.state
    const { toogleEditing, handleSubmit } = this
    const {problem} = solutionAttempt

    const ShowAttemptBasicInfo = (solutionAttempt &&
      <div className="solutionAttemptBasicInfos__show">
        <div className="row flex justifyBetween">
          <div>
            <span><strong>ID # </strong> {solutionAttempt.id}</span>
            <span> | </span>
            <span><strong>Problema:  </strong> {problem ? problem.name : '' }</span>
          </div>
          <span>
            <button onClick={this.toogleEditing}
                className="solutionAttemptBasicInfos__show__editButton">
              Editar
            </button>
          </span>
        </div>
        <div className="row">
          <span className="solutionAttemptBasicInfos__show__title">
            Nome: 
          </span>
          {solutionAttempt.name}
        </div>
        <div className="row">
          <span className="solutionAttemptBasicInfos__show__title">
            Descrição: 
          </span>
          {solutionAttempt.description}
        </div>
      </div>
    )
    
    const EditProblemBasicInfos = (
      <form onSubmit={handleSubmit}
        className="solutionAttemptBasicInfos__edit">
        <div className="row">
          <span><strong>ID # </strong> {solutionAttempt.id}</span>
          <span> | </span>
          <span>
            <strong>Problema:  </strong> {problem ? problem.name : '' }
          </span>
        </div>
        <div className="row">
          <label className="solutionAttemptBasicInfos__edit__label">Nome:</label>
          <input type="text" name="name"
              value={name}
              onChange={this.change}
              placeholder="Digite o nome da tentativa de solução"
              className="solutionAttemptBasicInfos__edit__input"/>
          {fieldErrors.name && ShowFieldErrors(fieldErrors.name)}
        </div>
        <div className="row">
          <label className="solutionAttemptBasicInfos__edit__label">Descrição:</label>
          <textarea name="description"
              value={description}
              onChange={this.change}
              maxLength={254} rows={3} 
              placeholder="Digite a descrição da tentativa de solução"
              className="solutionAttemptBasicInfos__edit__textArea"></textarea>
          {fieldErrors.description && ShowFieldErrors(fieldErrors.description)}
        </div>
        <div className="row">
          <button type="submit"
            className="solutionAttemptBasicInfos__edit__saveButton">Salvar</button>
          <button className="solutionAttemptBasicInfos__edit__cancelButton"
            onClick={toogleEditing}>Cancelar edição</button>
        </div>
      </form>
    )

    const contentToDisplay = isEditing
        ? EditProblemBasicInfos
        : ShowAttemptBasicInfo

    return (
      <section className="solutionAttemptBasicInfos">
        <h2 className="content_subtitle">Informações básicas</h2>
        
        {contentToDisplay}
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return { 
    onUpdateSolutionAttempt: (problemId:number, solutionAttemptId: number, attempt: SolutionAttempt) =>
        dispatch(updateSolutionAttempt(problemId, solutionAttemptId, attempt))
  }
}

export default connect(null, mapDispatchToProps)(SolutionAttemptBasicInfo)

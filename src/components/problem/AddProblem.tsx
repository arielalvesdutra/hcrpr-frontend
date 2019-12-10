import React, { Component } from 'react'
import { connect } from 'react-redux'

import './AddProblem.scss'
import Problem from '../../models/Problem'
import { createProblem } from '../../redux/actions/problemsActions'
import DefaultModal from '../shared/modals/DefaultModal'

interface IAddProblemProps {
  onCreateProblem(problem: Problem): any
}

interface IAddProblemState {
  name: string
  description: string
  fieldErrors: any
  isModalOpen: boolean
}
class AddProblem extends Component<IAddProblemProps> {
  state: IAddProblemState = {
    name: '',
    description: '',
    fieldErrors: {},
    isModalOpen: false
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

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen})
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
  
  onSubmit = (event: any) => {
    event.preventDefault()
    
    try {
      this.clearErrors()
      this.validForm()
      const { name, description } = this.state
      this.props.onCreateProblem(new Problem(name, description))
    } catch(error) { console.log(error) }
  }

  render() {
    const { fieldErrors, isModalOpen } = this.state
    const { toggleModal } = this

    const showFieldErrors = (errors: []) => errors.map((err:string, key:any) => 
      <div key={key} className="row errorMessage">{err}</div>
    )
    
    return (
      <section className="add__problem">
        <div>
          <span onClick={this.toggleModal}
              className="add__problem__addLink">+ Adicionar
          </span>
        </div>
        <DefaultModal isOpen={isModalOpen} closeCallback={toggleModal}>
          <h2 className="content_subtitle">Cadastrar Problema</h2>
          <form className="add__problem__form" onSubmit={this.onSubmit}>
            <div className="row">
              <label className="add__problem__label">Nome:</label>
              <input value={this.state.name} onChange={this.change}
              type="text" placeholder="Digite o nome do problema"
                name="name" className="add__problem__input" />

              {fieldErrors.name  && showFieldErrors(fieldErrors.name)}
            </div>
            <div className="row">
              <label className="add__problem__label">Descrição:</label>
              <textarea name="description" id="description" 
                value={this.state.description} onChange={this.change}
                maxLength={3000} rows={3} placeholder="Digite a descrição do problema"
                className="add__problem__textarea"></textarea>

              {fieldErrors.description && showFieldErrors(fieldErrors.description)}
            </div>
            <div className="row">
              <button type="submit"
                className="add__problem__Addbutton">Cadastrar</button>
              <button onClick={toggleModal}
                className="add__problem__closeModalButton">
                Fechar
              </button>
            </div>
          </form>
        </DefaultModal>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onCreateProblem: (problem: Problem) => dispatch(createProblem(problem))
  }
}

export default connect(null, mapDispatchToProps)(AddProblem)

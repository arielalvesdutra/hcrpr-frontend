import React, { Component } from 'react'
import { connect } from 'react-redux'

import './AddConcept.scss'
import Concept from '../../models/Concept'
import { createConcept } from '../../redux/actions/conceptsActions'
import DefaultModal from '../shared/modals/DefaultModal'

interface AddConceptProps {
  onCreateConcept(concept: Concept): any
}

interface IAddConceptState {
  name: string
  description: string
  fieldErrors: any
  isModalOpen: boolean
}
class AddConcept extends Component<AddConceptProps> {
  state: IAddConceptState = {
    name: '',
    description: '',
    fieldErrors: {},
    isModalOpen: false
  }

  change = (event: any) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  clearErrors = () => {
    this.setState({ fieldErrors: {} })
  }

  validForm = () => {
    let fieldErrors: any = {}

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

    if (Object.keys(fieldErrors).length > 0) {

      this.setState({
        fieldErrors: fieldErrors
      })

      throw new Error('Há erros de preenchimento de campos no formulário')
    }
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  onSubmit = (event: any) => {
    event.preventDefault()

    try {
      this.clearErrors()
      this.validForm()
      const { name, description } = this.state
      this.props.onCreateConcept(new Concept(name, description))
    } catch (error) { console.log(error) }
  }

  render() {
    const { fieldErrors, isModalOpen } = this.state
    const { toggleModal } = this


    const showFieldErrors = (errors: []) => errors.map((err: string, key: any) =>
      <div key={key} className="row errorMessage">{err}</div>
    )

    return (
      <section className="add__concept">
        <div>
          <h2 className="content__subtitle">Cadastrar Conceito</h2>
          <button onClick={this.toggleModal}
            className="add__concept__addLinkButton">+ Adicionar
          </button>
        </div>
        <DefaultModal isOpen={isModalOpen} closeCallback={toggleModal}>
          <h2 className="content_subtitle">Cadastrar Conceito</h2>
          <form className="add__concept__form" onSubmit={this.onSubmit}>
            <div className="row">
              <label className="add__concept__label">Nome:</label>
              <input value={this.state.name} onChange={this.change}
                type="text" placeholder="Digite o nome do conceito"
                name="name" className="add__concept__input" />

              {fieldErrors.name && showFieldErrors(fieldErrors.name)}
            </div>
            <div className="row">
              <label className="add__concept__label">Descrição:</label>
              <textarea name="description" id="description"
                value={this.state.description} onChange={this.change}
                maxLength={3000} rows={3} placeholder="Digite a descrição do conceito"
                className="add__concept__textarea"></textarea>

              {fieldErrors.description && showFieldErrors(fieldErrors.description)}
            </div>
            <div className="row">
              <button type="submit"
                className="add__concept__addButton">Cadastrar</button>
              <button onClick={toggleModal}
                className="add__concept__closeModalButton">
                Fechar
              </button>
            </div>
          </form>
        </DefaultModal>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCreateConcept: (concept: Concept) => dispatch(createConcept(concept))
  }
}

export default connect(null, mapDispatchToProps)(AddConcept)

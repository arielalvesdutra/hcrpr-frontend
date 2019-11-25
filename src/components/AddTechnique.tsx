import React, { Component } from 'react'
import { connect } from 'react-redux'

import './AddTechnique.scss'
import Technique from '../models/Technique'
import { createTechnique } from '../redux/actions/techniques'

interface IAddTechniqueProps {
  onCreateTechnique(technique: Technique): any
}

interface IAddTechniqueState {
  name: string
  description: string
  fieldErrors: any
}

class AddTechnique extends Component<IAddTechniqueProps> {
  state: IAddTechniqueState = {
    name: '',
    description: '',
    fieldErrors: {}
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
      this.props.onCreateTechnique(new Technique(name, description))
    } catch(error) { console.log(error) }
  }

  render() {
    const { fieldErrors } = this.state

    const showFieldErrors = (errors: []) => errors.map((err:string, key:any) => 
      <div key={key} className="row errorMessage">{err}</div>
    )
    
    return (
      <section className="add__technique">
        <h2 className="content_subtitle">Cadastrar Técnica</h2>
        <form className="add__technique__form" onSubmit={this.onSubmit}>
          <div className="row">
            <label className="add__technique__label">Nome:</label>
            <input value={this.state.name} onChange={this.change}
             type="text" placeholder="Digite o nome da técnica"
              name="name" className="add__technique__input" />

            {fieldErrors.name  && showFieldErrors(fieldErrors.name)}
          </div>
          <div className="row">
            <label className="add__technique__label">Descrição:</label>
            <textarea name="description" id="description" 
              value={this.state.description} onChange={this.change}
              maxLength={254} rows={3} placeholder="Digite a descrição da técnica"
              className="add__technique__textarea"></textarea>

            {fieldErrors.description && showFieldErrors(fieldErrors.description)}
          </div>
          <div className="row">
            <button type="submit"
              className="add__technique__button">Cadastrar</button>
          </div>
        </form>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onCreateTechnique: (technique: Technique) => dispatch(createTechnique(technique))
  }
}

export default connect(null, mapDispatchToProps)(AddTechnique)

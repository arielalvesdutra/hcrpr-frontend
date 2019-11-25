import React, { Component } from 'react'
import { connect } from 'react-redux'

import Technique from '../../models/Technique'
import './TechniqueBasicInfos.scss'
import { updateTechnique } from '../../redux/actions/techniquesActions'

interface ITechniqueBasicInfosProps {
  technique: Technique,
  onUpdateTechnique: any
}

interface ITechniqueBasicInfosState {
  isEditing: boolean
  name: string
  description: string
  fieldErrors: any
}

class TechniqueBasicInfos extends Component<ITechniqueBasicInfosProps, ITechniqueBasicInfosState> {

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
    const { description, name } = this.props.technique
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

  onSubmit = (event:any) => {
    event.preventDefault()

    try {
      this.clearErrors()
      this.validForm()
      const { name, description } = this.state
      const { onUpdateTechnique, technique } = this.props
      onUpdateTechnique(technique.id, new Technique(name, description))
      this.toogleEditing()
    } catch(error) { console.log(error) }
  }

  render() {
    const { technique }  = this.props
    const { isEditing, name, description, fieldErrors } = this.state
    const { toogleEditing, onSubmit: handleSubmit } = this    

    const showFieldErrors = (errors: []) => errors.map((err:string, key:any) => 
      <div key={key} className="row errorMessage">{err}</div>
    )

    const ShowTechniqueBasicInfos = (
      <div className="techniqueBasicInfos__show">
        <div className="row flex justifyBetween">
          <span>
            <strong>ID # </strong> {technique.id}
          </span>
          <span>
            <button onClick={toogleEditing}
              className="techniqueBasicInfos__show__editButton">Editar</button>
          </span>
        </div>
        <div className="row">
          <span className="techniqueBasicInfos__show__title">
            Nome: 
          </span>
          {technique.name}
        </div>
        <div className="row">
          <span className="techniqueBasicInfos__show__title">
            Descrição: 
          </span>
          {technique.description}
        </div>
      </div>
    )

    const EditTechniqueBasicInfos = (
      <form onSubmit={handleSubmit}
        className="techniqueBasicInfos__edit">
        <div className="row">
          <span>
            <strong>ID # </strong> {technique.id}
          </span>
        </div>
        <div className="row">
          <label className="techniqueBasicInfos__edit__label">Nome:</label>
          <input type="text" name="name"
              value={name}
              onChange={this.change}
              placeholder="Digite o nome da técnica"
              className="techniqueBasicInfos__edit__input"/>
          {fieldErrors.name && showFieldErrors(fieldErrors.name)}

        </div>
        <div className="row">
          <label className="techniqueBasicInfos__edit__label">Descrição:</label>
          <textarea name="description"
              value={description}
              onChange={this.change}
              maxLength={254} rows={3} placeholder="Digite a descrição da técnica"
              className="techniqueBasicInfos__edit__textArea"></textarea>
          {fieldErrors.description && showFieldErrors(fieldErrors.description)}

        </div>
        <div className="row">
          <button type="submit"
            className="techniqueBasicInfos__edit__saveButton">Salvar</button>
          <button className="techniqueBasicInfos__edit__cancelButton"
            onClick={toogleEditing}>Cancelar edição</button>
        </div>
      </form>
    )

    const contentToDisplay = isEditing
        ? EditTechniqueBasicInfos
        : ShowTechniqueBasicInfos

    return (
      <section className="techniqueBasicInfos">
          <h2 className="content_subtitle">Informações básicas</h2>

          {contentToDisplay}
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onUpdateTechnique: (id:number, technique: Technique) => dispatch(updateTechnique(id, technique))
  }
}

export default connect(null, mapDispatchToProps)(TechniqueBasicInfos)

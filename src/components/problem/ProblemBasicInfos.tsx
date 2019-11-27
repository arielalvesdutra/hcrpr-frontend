import React, { Component } from 'react'
import { connect } from 'react-redux'

import Problem from '../../models/Problem'
import './ProblemBasicInfos.scss'
import { updateProblem } from '../../redux/actions/problemsActions'

interface IProblemBasicInfosProps {
  problem: Problem,
  onUpdateProblem: any
}

interface IProblemBasicInfosState {
  isEditing: boolean
  name: string
  description: string
  fieldErrors: any
}

class ProblemBasicInfos extends Component<IProblemBasicInfosProps, IProblemBasicInfosState> {

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
    const { description, name } = this.props.problem
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
      const { onUpdateProblem, problem } = this.props
      onUpdateProblem(problem.id, new Problem(name, description))
      this.toogleEditing()
    } catch(error) { console.log(error) }
  }

  render() {
    const { problem }  = this.props
    const { isEditing, name, description, fieldErrors } = this.state
    const { toogleEditing, onSubmit: handleSubmit } = this    

    const showFieldErrors = (errors: []) => errors.map((err:string, key:any) => 
      <div key={key} className="row errorMessage">{err}</div>
    )

    const ShowProblemBasicInfos = (
      <div className="problemBasicInfos__show">
        <div className="row flex justifyBetween">
          <span>
            <strong>ID # </strong> {problem.id}
          </span>
          <span>
            <button onClick={toogleEditing}
              className="problemBasicInfos__show__editButton">Editar</button>
          </span>
        </div>
        <div className="row">
          <span className="problemBasicInfos__show__title">
            Nome: 
          </span>
          {problem.name}
        </div>
        <div className="row">
          <span className="problemBasicInfos__show__title">
            Descrição: 
          </span>
          <span className="problemBasicInfos__show__description">
            {problem.description}
          </span>
        </div>
      </div>
    )

    const EditProblemBasicInfos = (
      <form onSubmit={handleSubmit}
        className="problemBasicInfos__edit">
        <div className="row">
          <span>
            <strong>ID # </strong> {problem.id}
          </span>
        </div>
        <div className="row">
          <label className="problemBasicInfos__edit__label">Nome:</label>
          <input type="text" name="name"
              value={name}
              onChange={this.change}
              placeholder="Digite o nome do problema"
              className="problemBasicInfos__edit__input"/>
          {fieldErrors.name && showFieldErrors(fieldErrors.name)}

        </div>
        <div className="row">
          <label className="problemBasicInfos__edit__label">Descrição:</label>
          <textarea name="description"
              value={description}
              onChange={this.change}
              maxLength={3000} rows={5} placeholder="Digite a descrição do problema"
              className="problemBasicInfos__edit__textArea"></textarea>
          {fieldErrors.description && showFieldErrors(fieldErrors.description)}

        </div>
        <div className="row">
          <button type="submit"
            className="problemBasicInfos__edit__saveButton">Salvar</button>
          <button className="problemBasicInfos__edit__cancelButton"
            onClick={toogleEditing}>Cancelar edição</button>
        </div>
      </form>
    )

    const contentToDisplay = isEditing
        ? EditProblemBasicInfos
        : ShowProblemBasicInfos

    return (
      <section className="problemBasicInfos">
          <h2 className="content_subtitle">Informações básicas</h2>

          {contentToDisplay}
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onUpdateProblem: (id:number, problem: Problem) => dispatch(updateProblem(id, problem))
  }
}

export default connect(null, mapDispatchToProps)(ProblemBasicInfos)

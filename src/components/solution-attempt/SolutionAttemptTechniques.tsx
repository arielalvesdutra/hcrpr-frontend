import React, { Component } from "react";
import { connect } from 'react-redux'
import Select from 'react-select'

import SolutionAttempt from "../../models/SolutionAttempt";
import Technique from "../../models/Technique";
import { updateSolutionAttemptTechniques } from "../../redux/actions/solutionAttemptsActions";
import './SolutionAttemptTechniques.scss'
import List from '../shared/List'
import { mapTechniquesToItems } from "../technique/ListTechniques";
import Option from '../../types/Option'


const selectTheme = (theme:any) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary: '#aa4339',
    primary25: '#ffb2aa',
  },
}) 

const techniquesToOptions = (techniques: Technique[]):Option[] => techniques.map(technique => {
  return {
    value: technique.id,
    label: technique.name
  }
})

interface ISolutionAttemptTechniquesProps {
  onUpdateSolutionAttemptTechniques: any
  solutionAttempt: SolutionAttempt,
  techniques: Technique[]
}

interface ISolutionAttemptTechniquesState {
  isEditing: boolean
  attemptTechniquesOptions: Option[]
}

class SolutionAttemptTechniques 
    extends Component<ISolutionAttemptTechniquesProps, ISolutionAttemptTechniquesState> {
  
  state = {
    isEditing: false,
    attemptTechniquesOptions: [] as Option[]
  }

  componentDidMount = () => {
    const { solutionAttempt } = this.props
    const currentAttemptTechniques = techniquesToOptions(solutionAttempt.techniques || [])
    this.setState({attemptTechniquesOptions: currentAttemptTechniques})
  }

  onChangeSolutionAttemptTechniquesSelect = (options:any) => {
    this.setState({ attemptTechniquesOptions: options })
  }

  onVinculateSolutionAttemptTechniquesSubmit = (event:any) => {
    event.preventDefault()

    const {  attemptTechniquesOptions } = this.state
    const { onUpdateSolutionAttemptTechniques, solutionAttempt } = this.props
    const { toggleEditing } = this
    const { problem } = solutionAttempt
    const techniquesIds = (attemptTechniquesOptions && 
                          attemptTechniquesOptions.map(option => option.value)) || []

    if (problem === undefined) throw Error('Não existe problema')
    if (problem !== undefined) {
        onUpdateSolutionAttemptTechniques(problem.id, solutionAttempt.id, techniquesIds)
        toggleEditing()
    }
  }

  toggleEditing = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {

    const { onVinculateSolutionAttemptTechniquesSubmit,
      onChangeSolutionAttemptTechniquesSelect, toggleEditing } = this
    const { isEditing, attemptTechniquesOptions } = this.state
    const { techniques, solutionAttempt } = this.props    
    const { techniques: attemptTechniques } = solutionAttempt
   

    const VinculateAttemptTechniques = (
      <form onSubmit={onVinculateSolutionAttemptTechniquesSubmit}
         className="solutionAttemptTechniques__vinculateTechniques">
        <h3 className="content__subtitle__h3">Vincular técnicas à tentativa</h3>
        <div className="row">
          <Select            
              options={techniquesToOptions(techniques)}
              name="attemptTechniques"
              theme={selectTheme}
              onChange={onChangeSolutionAttemptTechniquesSelect}
              value={attemptTechniquesOptions}
              placeholder="Selecione as técnicas utilizadas na tentativa"
              isMulti />
        </div>
        <div className="row">
          <button type="submit"
              className="solutionAttemptTechniques__vinculateTechniques__saveButton">
                Salvar técnicas utilizadas na tentativa
          </button> 
          <button onClick={toggleEditing}
              className="solutionAttemptTechniques__vinculateTechniques__cancelButton">
            Cancelar</button>
        </div>
      </form>
    )

    const ListAttemptTechniques = (
      <div className="solutionAttemptTechniques__list_area">
        <div className="flex">
          <h3 className="content__subtitle__h3 flex1">Lista de técnicas da tentativa</h3>
          <span>
            <button onClick={toggleEditing}
                className="solutionAttemptTechniques__list__editButton">Editar</button>
          </span>
        </div>
        {attemptTechniques && attemptTechniques.length > 0 && ( 
          <List items={mapTechniquesToItems(attemptTechniques)} />
        )}
        {attemptTechniques && attemptTechniques.length <= 0 && (
          <div className="row">
            <strong>
              Não há técnicas relacionadas com esta tentativa.
            </strong>
          </div>
        )}
      </div>
    )

    const contentToDiplay = isEditing
        ? VinculateAttemptTechniques : ListAttemptTechniques

    return (
      <section className="solutionAttemptTechniques">
        <h2 className="content_subtitle">Técnicas utilizadas na tentativa</h2>
        <div className="solutionAttemptTechniques__container">
          {contentToDiplay}
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onUpdateSolutionAttemptTechniques: (problemId:number, attemptId:number, conceptsIds:number[]) => 
          dispatch(updateSolutionAttemptTechniques(problemId, attemptId, conceptsIds))
  }
}


export default connect(null, mapDispatchToProps)(SolutionAttemptTechniques)

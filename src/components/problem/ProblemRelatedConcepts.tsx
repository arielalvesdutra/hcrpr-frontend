import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import './ProblemRelatedConcepts.scss'
import Problem from '../../models/Problem'
import Concept from '../../models/Concept'
import { updateProblemRelatedConcepts } from '../../redux/actions/problemsActions'
import { mapConceptsToItems } from '../concept/ListConcepts'
import List from '../shared/List'

const conceptsToOptions = (concepts: Concept[]):Option[] => concepts.map(concept => {
  return {
    value: concept.id,
    label: concept.name
  }
})

type Option = {
  value?: number
  label?: string
}

interface IProblemRelatedConceptProps {
  problem: Problem
  concepts: Concept[]
  onUpdateProblemRelatedConcepts: any
}

interface IProblemRelatedConceptState {
  related: Option[]
  isEditing: boolean
}

class ProblemRelatedConcepts extends  Component<IProblemRelatedConceptProps, IProblemRelatedConceptState> {
  state = {
    related:[] as Option[],
    isEditing: false
  }

  componentDidMount = () => {
    const { problem } = this.props
    const currentProblemRelatedConcepts = conceptsToOptions(problem.relatedConcepts || [])
    
    if (problem.id !== undefined) 
      this.setState({related: currentProblemRelatedConcepts})
  }

  onChangeRelatedConceptsSelect = (options:any) => {
    this.setState({ related: options })
  }

  onVinculateRelatedConceptsSubmut = (event:any) => {
    event.preventDefault()
    
    const { related } = this.state
    const { onUpdateProblemRelatedConcepts, problem } = this.props
    const { toggleEditing } = this
    const conceptsIds = (related && related.map(option => option.value)) || []

    onUpdateProblemRelatedConcepts(problem.id, conceptsIds)
    toggleEditing()
  }

  toggleEditing = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    
    const { onChangeRelatedConceptsSelect, toggleEditing,
      onVinculateRelatedConceptsSubmut } = this
    const { concepts, problem } = this.props
    const { related, isEditing } = this.state 
    const { relatedConcepts } = problem

    const selectTheme = (theme:any) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary: '#aa4339',
        primary25: '#ffb2aa',
      },
    })

    const VinculateRelatedConcepts = (
      <form onSubmit={onVinculateRelatedConceptsSubmut}
         className="problemRelatedConcepts__vinculateConcepts">
        <h3 className="content__subtitle__h3">Vincular conceitos</h3>
        <div className="row">
          <Select            
              options={conceptsToOptions(concepts)}
              name="relatedConcepts"
              theme={selectTheme}
              onChange={onChangeRelatedConceptsSelect}
              value={related}
              placeholder="Selecione os conceitos relacionados com o problema"
              isMulti />
        </div>
        <div className="row">
          <button type="submit"
              className="problemRelatedConcepts__vinculateConcepts__saveButton">
                Salvar conceitos relacionados
          </button> 
          <button onClick={toggleEditing}
              className="problemRelatedConcepts__vinculateConcepts__cancelButton">
            Cancelar</button>
        </div>
      </form>
    )

    const ListRelatedConcepts = (
      <div className="problemRelatedConcepts__list_area">
        <div className="flex">
          <h3 className="content__subtitle__h3 flex1">Lista de conceitos relacionados</h3>
          <span>
            <button onClick={toggleEditing}
                className="problemRelatedConcepts__list__editButton">Editar</button>
          </span>
        </div>
        {relatedConcepts && relatedConcepts.length > 0 && ( 
          <List items={mapConceptsToItems(relatedConcepts)} />
        )}
        {relatedConcepts && relatedConcepts.length <= 0 && (
          <div className="row">
            <strong>
              Não há conceitos relacionados com este problema.
            </strong>
          </div>
        )}
      </div>
    )

    const contentToDisplay = isEditing
        ? VinculateRelatedConcepts : ListRelatedConcepts

    return (
      <section className="problemRelatedConcepts">
        <h2 className="content_subtitle">Conceitos Relacionados</h2>
        <div className="problemRelatedConcepts__container">
         {contentToDisplay}
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onUpdateProblemRelatedConcepts: (problemId:number, conceptsIds:number[]) => 
          dispatch(updateProblemRelatedConcepts(problemId,conceptsIds))
  }
}

export default connect(null, mapDispatchToProps)(ProblemRelatedConcepts)


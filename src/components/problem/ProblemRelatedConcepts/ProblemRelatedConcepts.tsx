import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Select from "react-select"

import "./ProblemRelatedConcepts.scss"
import Problem from "../../../models/Problem"
import Concept from "../../../models/Concept"
import {
  updateProblemRelatedConcepts,
  fetchAllProblemRelatedConcepts
} from "../../../redux/actions/problemsActions"
import { mapConceptsToItems } from "../../concept/ListConcepts"
import List from "../../shared/List"
import Loading from "../../shared/Loading"
import Option from "../../../types/RequiredOption"


const selectTheme = (theme: any) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary: "#aa4339",
    primary25: "#ffb2aa",
  },
})

const conceptsToOptions = (concepts: Concept[]): Option[] =>
  concepts.map((concept) => {
    const { id, name } = concept
    if (!id || !name) throw Error("Invalid concept provided to an option!")
    return { value: id, label: name }
  })

interface ProblemRelatedConceptsProps {
  problem: Problem
  concepts: Concept[]
  relatedConcepts: Concept[]
  isLoading: boolean
  onUpdateProblemRelatedConcepts(problemId: number, conceptsIds: number[]): void
}

const ProblemRelatedConcepts = (props: ProblemRelatedConceptsProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [relatedConceptsOptions, setRelatedConceptsOptions] = useState([] as Option[])
  const { concepts,  onUpdateProblemRelatedConcepts,  problem, } = props
  const { relatedConcepts, isLoading } = props
  const { id } = problem

  useEffect(() => {
    if (relatedConcepts === undefined) return

    setRelatedConceptsOptions(conceptsToOptions(relatedConcepts || []))
  }, [relatedConcepts, isLoading])

  const toggleEditing = () => setIsEditing(!isEditing)

  const onChangeRelatedConceptsSelect = (options: any) => {
    setRelatedConceptsOptions(options)
  }

  const onUpdateRelatedConceptsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id) throw Error("Problem is empty")

    const conceptsIds = relatedConceptsOptions
      ? relatedConceptsOptions.map((option: Option) => option.value)
      : []

    onUpdateProblemRelatedConcepts(id, conceptsIds)
    toggleEditing()
  }

  const UpdateRelatedConcepts = () => (
    <form
      onSubmit={onUpdateRelatedConceptsSubmit}
      className="problemRelatedConcepts__update">

        <h3 className="content__subtitle__h3">Vincular conceitos</h3>
        <div className="row">
          <Select
            options={conceptsToOptions(concepts)}
            name="relatedConcepts"
            theme={selectTheme}
            onChange={onChangeRelatedConceptsSelect}
            value={relatedConceptsOptions}
            placeholder="Selecione os conceitos relacionados com o problema"
            isMulti />
        </div>
        <div className="row">
          <button type="submit" className="problemRelatedConcepts__update__saveButton">
            Salvar conceitos relacionados
          </button>
          <button onClick={toggleEditing} className="problemRelatedConcepts__update__cancelButton">
            Cancelar
          </button>
        </div>
    </form>
  )

  const ListRelatedConcepts = () => (
    <div className="problemRelatedConcepts__list_area">
      <div className="flex">
        <h3 className="content__subtitle__h3 flex1">
          Lista de conceitos relacionados
        </h3>
        <span>
          <button
            onClick={toggleEditing}
            className="problemRelatedConcepts__list__editButton"
          >
            Editar
          </button>
        </span>
      </div>
      {relatedConcepts && relatedConcepts.length > 0 && (
        <List items={mapConceptsToItems(relatedConcepts)} />
      )}
      {relatedConcepts && relatedConcepts.length <= 0 && (
        <div className="row">
          <strong>Não há conceitos relacionados com este problema.</strong>
        </div>
      )}
    </div>
  )

  const contentToDisplay = isEditing ? <UpdateRelatedConcepts /> : <ListRelatedConcepts />

  return (
    <section className="problemRelatedConcepts">
      <h2 className="content_subtitle">Conceitos Relacionados</h2>
      <div className="problemRelatedConcepts__container">
        {isLoading ? <Loading /> :  contentToDisplay}
      </div>
    </section>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onUpdateProblemRelatedConcepts: (problemId: number, conceptsIds: number[]) => 
      dispatch(updateProblemRelatedConcepts(problemId, conceptsIds)),
    onFetchAllProblemRelatedConcepts: (problemId: number) =>
      dispatch(fetchAllProblemRelatedConcepts(problemId))
  }
}

export default connect(null, mapDispatchToProps)(ProblemRelatedConcepts)

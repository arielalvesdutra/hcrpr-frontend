import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Problem from '../../../models/Problem'
import './ProblemBasicInfos.scss'
import { updateProblem } from '../../../redux/actions/problemsActions'
import { formatAsDateTime } from '../../shared/DateHelpers'
import Loading from '../../shared/Loading'
import FieldError from '../../shared/FieldError/FieldError'


interface ShowBasicInfosProps {
  problem: Problem
}

const ShowBasicInfos = ({ problem }: ShowBasicInfosProps) => (
  <div className="problemBasicInfos__show">
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

interface EditProblemFormValues {
  name: string
  description: string
}

interface EditProblemProps {
  problem: Problem
  toggleEditing(): void
  onUpdateProblem(id: number, problem: Problem): void
}

const EditProblem = ({ problem, toggleEditing, onUpdateProblem }: EditProblemProps) => {
  const EditProblemFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'O campo nome deve ter no mínimo 5 caracteres')
      .required('O campo nome deve ser preenchido'),
    description: Yup.string()
      .min(5, 'O campo descriao deve ter no mínimo 5 caracteres')
      .required('O campo descrição deve ser preenchido')
  })

  const onHandleSubmit = (values: EditProblemFormValues) => {
    try {
      if (!problem.id) throw Error('Problem without id')             

      const { name, description } = values
      onUpdateProblem(problem.id, { name, description })
      toggleEditing()
    } catch(error) { console.log(error)}
  }

  const { errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      name: problem.name,
      description: problem.description
    },
    validationSchema: EditProblemFormSchema,
    onSubmit: onHandleSubmit
  })

  return (
    <form onSubmit={handleSubmit}
      className="problemBasicInfos__edit">
      <div className="row">
        <label className="problemBasicInfos__edit__label">Nome:</label>
        <input type="text" name="name"
          defaultValue={problem.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Digite o nome do problema"
          className="problemBasicInfos__edit__input" />
        {touched.name && errors.name && <FieldError>{errors.name}</FieldError>}
      </div>
      <div className="row">
        <label className="problemBasicInfos__edit__label">Descrição:</label>
        <textarea name="description"
          defaultValue={problem.description}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={3000} rows={5} placeholder="Digite a descrição do problema"
          className="problemBasicInfos__edit__textArea"></textarea>
        {touched.description && errors.description && <FieldError>{errors.description}</FieldError>}

      </div>
      <div className="row">
        <button type="submit"
          className="problemBasicInfos__edit__saveButton">Salvar</button>
        <button className="problemBasicInfos__edit__cancelButton"
          onClick={toggleEditing}>Cancelar</button>
      </div>
    </form>
  )
}

interface ProblemBasicInfosProps {
  problem: Problem
  onUpdateProblem: any
  isLoading: boolean
}

const ProblemBasicInfos = (props: ProblemBasicInfosProps) => {
  const [isEditing, setIsEdting] = useState(false)
  const { problem, isLoading, onUpdateProblem } = props
  const toggleEditing = () => setIsEdting(!isEditing)

  const contentToDisplay = isEditing
    ? <EditProblem problem={problem} toggleEditing={toggleEditing} onUpdateProblem={onUpdateProblem} />
    : <ShowBasicInfos problem={problem} />
    
  return (
    <section className="problemBasicInfos">
      <h2 className="content_subtitle">Informações básicas</h2>
      <div className="row flex justifyBetween">
        <div>
          <span>
            <strong>ID # </strong> {problem.id}
          </span>
          <span> | </span>
          <span>
            <strong>Cadastrado em:</strong>  {problem.createdAt && formatAsDateTime(problem.createdAt)}
          </span>
        </div>
        <span>
          <button onClick={toggleEditing} className="problemBasicInfos__editButton">
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </span>
      </div>
      {isLoading ? <Loading /> : contentToDisplay}
    </section>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onUpdateProblem: (id: number, problem: Problem) => dispatch(updateProblem(id, problem))
  }
}

export default connect(null, mapDispatchToProps)(ProblemBasicInfos)

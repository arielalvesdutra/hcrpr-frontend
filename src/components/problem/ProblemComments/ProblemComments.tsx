import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { useFormik, FormikHelpers } from 'formik'
import {
  createProblemComment, 
  fetchAllProblemComments,
  setCurrentProblemCommentsPage,
  deleteProblemComment
} from '../../../redux/actions/problemsActions'
import { IProblemsInitialState } from '../../../redux/reducers/problemsReducer'
import './ProblemComments.scss'
import Problem from '../../../models/Problem'
import ProblemComment from '../../../models/ProblemComment'
import Pagination from '../../shared/Pagination'
import { formatAsDateTime } from '../../shared/DateHelpers'
import Loading from '../../shared/Loading'
import FieldError from '../../shared/FieldError/FieldError'


interface AddProblemCommentProps {
  problem: Problem
  onCreateProblemComment(problemId: number, problemComment: ProblemComment): void
}

interface AddProblemCommentFormValues {
  content: string
}

const AddProblemComment = ({ problem, onCreateProblemComment }: AddProblemCommentProps) => {
  const AddProblemCommentFormSchema = Yup.object().shape({
    content: Yup.string()
      .min(5, 'O campo conteúdo deve ter no mínimo 5 caracteres')
      .required('O campo conteúdo deve ser preenchido')
  })

  const onHandleSubmit = (
      {content}: AddProblemCommentFormValues, 
      {resetForm}: FormikHelpers<AddProblemCommentFormValues>) => {

    try {
      if (!problem.id) throw Error('Problem without id')
      
      onCreateProblemComment(problem.id, new ProblemComment(content))      
      resetForm()
    } catch (error) { console.log(error) }
  }

  const { values, errors, touched, handleSubmit, handleChange, handleBlur, handleReset } = useFormik({
    initialValues: {
      content: ''
    },
    validationSchema: AddProblemCommentFormSchema,
    onSubmit: onHandleSubmit,
  })  

  return (
    <form className="problemComments__addComment" onSubmit={handleSubmit}>
      <h3 className="content__subtitle__h3">Cadastrar Comentário</h3>
      <div className="row">
        <textarea name="content"        
          rows={5}
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          onReset={handleReset}
          className="problemComments__addComment__contentTextArea"
          placeholder="Digite o conteúdo do comentário"></textarea>
        {touched.content && errors.content && <FieldError>{errors.content}</FieldError>}
      </div>
      <div className="row">
        <button type="submit" className="problemComments__addComment__addButton">
          Adicionar comentário</button>
        <button type="reset" onClick={handleReset}
          className="problemComments__addComment__clearButton">
          Limpar</button>
      </div>
    </form>
  )
}

interface ListCommentsProps {
  problem: Problem
  comments: ProblemComment[]
  onDeleteProblemCommentWithConfirmation(problem: Problem, comment: ProblemComment): void
}

const ListComments = ({ problem, comments, onDeleteProblemCommentWithConfirmation }: ListCommentsProps) => (
  <ul className="problemComments__list">
    {comments && comments.length > 0 && comments.map((comment, key) => (
      <li className="problemComments__listComments__item" key={key}>
        <div className="flex1">
          <span className="problemComments__listComments__itemDateTime">
            {comment.createdAt && formatAsDateTime(comment.createdAt)}
          </span>
          <span className="problemComments__listComments__itemContent">
            {comment.content}
          </span>
        </div>
        <div className="problemComments__listComments__actionButtonArea">
          <button onClick={() => onDeleteProblemCommentWithConfirmation(problem, comment)}
            className="problemComments__listComments__itemDeleteButton">
            Deletar
            </button>
        </div>
      </li>
    ))}
  </ul>
)

interface ListCommentsWithPagination {
  problem: Problem
  comments: ProblemComment[]
  isLoadingComments: boolean
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
  onFetchAllProblemComments(problemId: number, filters: Object): void
  onSetProblemCommentsCurrentPage(page: number): void
  onDeleteProblemComment(problemId: number, commentId: number): void 
}

const ListProblemCommentsWithPagination = (props: ListCommentsWithPagination) => {
  const { comments, problem, isLoadingComments} = props
  const { currentPage, itemsPerPage, totalItems, totalPages } = props  
  const { onSetProblemCommentsCurrentPage, onFetchAllProblemComments } = props
  const { onDeleteProblemComment } = props

  const fetchAllCommentsForPagination = (filters = {}) => {
    if (problem.id)
      onFetchAllProblemComments(problem.id, filters)
  }

  const onDeleteProblemCommentWithConfirmation = (problem: Problem, comment: ProblemComment) => {
    if (!problem.id) throw Error('Problem without id')
    if (!comment.id) throw Error('Comment without id')

    if (window.confirm("Você tem certeza?"))
      onDeleteProblemComment(problem.id, comment.id)
  }

  return (
    <div className="problemComments__list__area">
      <h3 className="content__subtitle__h3">Lista de comentários</h3>
      {isLoadingComments && <Loading />}
      {comments && (
        <>
          <ListComments problem={problem} comments={comments} onDeleteProblemCommentWithConfirmation={onDeleteProblemCommentWithConfirmation} />
          <Pagination
            currentPage={currentPage}
            items={comments}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            totalPages={totalPages}
            setItemsCurrentPage={onSetProblemCommentsCurrentPage}
            searchItemsCallback={fetchAllCommentsForPagination} />
        </>
      )}
      {!isLoadingComments && comments && comments.length <= 0 && (
        <div className="row">
          <strong>
            Não há comentários cadastrados.
          </strong>
        </div>
      )}
    </div>
  )
}

interface ProblemCommentsProps {
  problem: Problem
  comments: ProblemComment[]
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
  isLoadingComments: boolean
  onCreateProblemComment(problemId: number, problemComment: ProblemComment): void
  onFetchAllProblemComments(problemId: number, filters: Object): void
  onSetProblemCommentsCurrentPage(page: number): void
  onDeleteProblemComment(problemId: number, commentId: number): void
}

const ProblemComments = (props: ProblemCommentsProps) => {
  const { problem, comments, isLoadingComments } = props
  const { totalItems, itemsPerPage, currentPage, totalPages } = props
  const { onDeleteProblemComment, onFetchAllProblemComments } = props
  const { onSetProblemCommentsCurrentPage, onCreateProblemComment } = props
  const { id } = problem

  useEffect(() => {
        
    if (id !== undefined)
      onFetchAllProblemComments(id, { sort: 'createdAt,desc' })
  }, [id, onFetchAllProblemComments])


  return (
    <section className="problemComments">
      <h2 className="content_subtitle">Comentários</h2>
      <div className="problemComments__container">
        <AddProblemComment problem={problem} onCreateProblemComment={onCreateProblemComment} />
        <ListProblemCommentsWithPagination 
          comments={comments}
          problem={problem}
          currentPage={currentPage}
          isLoadingComments={isLoadingComments}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          totalPages={totalPages}
          onDeleteProblemComment={onDeleteProblemComment}
          onFetchAllProblemComments={onFetchAllProblemComments}
          onSetProblemCommentsCurrentPage={onSetProblemCommentsCurrentPage} />
      </div>
    </section>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCreateProblemComment: (id: number, comment: ProblemComment) =>
      dispatch(createProblemComment(id, comment)),
    onFetchAllProblemComments: (problemId: number, filters = {}) =>
      dispatch(fetchAllProblemComments(problemId, filters)),
    onSetProblemCommentsCurrentPage: (page: number) =>
      dispatch(setCurrentProblemCommentsPage(page)),
    onDeleteProblemComment: (problemId: number, commentId: number) =>
      dispatch(deleteProblemComment(problemId, commentId))
  }
}

const mapStateToProps = (props: any) => {
  const { currentProblemComments,
    currentProblemCommentsTotalItems,
    currentProblemCommentsTotalPages,
    currentProblemCommentsItemsPerPage,
    currentProblemCommentsPage,
    isLoadingComments }: IProblemsInitialState = props.problems

  return {
    comments: currentProblemComments,
    currentPage: currentProblemCommentsPage,
    itemsPerPage: currentProblemCommentsItemsPerPage,
    totalItems: currentProblemCommentsTotalItems,
    totalPages: currentProblemCommentsTotalPages,
    isLoadingComments
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemComments)

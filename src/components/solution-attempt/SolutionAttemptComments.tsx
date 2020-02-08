import React, { Component } from 'react'
import { connect } from 'react-redux'

import Pagination from '../shared/Pagination'
import ShowFieldErrors from '../shared/ShowFieldErrors'
import SolutionAttempt from '../../models/SolutionAttempt'
import { fetchAllSolutionAttemptComments, createSolutionAttemptComment, deleteSolutionAttemptComment, setCurrentSolutionAttemptCommentsPage } from '../../redux/actions/solutionAttemptsActions'
import SolutionAttemptComment from '../../models/SolutionAttemptComment'
import './SolutionAttemptComments.scss'
import { formatAsDateTime } from '../shared/DateHelpers'
import Problem from '../../models/Problem'
import Loading from '../shared/Loading'

interface IProblemCommentsProps {
  solutionAttempt: SolutionAttempt
  onFetchAllSolutionAttemptComments: any
  onCreateSolutionAttemptComment: any
  onDeleteSolutionAttemptComment: any
  onSetSolutionAttemptCommentsCurrentPage: any
  comments: SolutionAttemptComment[]
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
  isLoadingComments: boolean
}

interface IProblemCommentsState {
  content: string
  fieldErrors: any
}

class SolutionAttemptComments extends Component<IProblemCommentsProps, IProblemCommentsState> {

  state = {
    content: '',
    fieldErrors: {} as any
  }

  componentDidMount = () => {
    const { onFetchAllSolutionAttemptComments, solutionAttempt } = this.props
    const { problem } = solutionAttempt

    if (problem !== undefined && solutionAttempt.id !== undefined )

      onFetchAllSolutionAttemptComments(problem.id, solutionAttempt.id)
  }

  change = (event:any) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  clearComment = () => {
    this.setState({ content: ""})
  }

  clearErrors = () => {
    this.setState({ fieldErrors: {}})
  }

  validForm = () => {
    let fieldErrors:any = {}
    
    if (!this.state.content) {
      if (fieldErrors.content === undefined) fieldErrors.content = []
      fieldErrors.content.push('O campo conteúdo deve ser preenchido')
    }

    if (this.state.content.length < 5) {
      if (fieldErrors.content === undefined) fieldErrors.content = []
      fieldErrors.content.push('O campo conteúdo deve ter no mínimo 5 caracteres')
    }

    if(Object.keys(fieldErrors).length > 0) {
      
      this.setState({ fieldErrors })
      throw new Error('Há erros de preenchimento de campos no formulário')
    }
  }

  onCreateCommentFormSubmit = (event:any) => {
    event.preventDefault()

    try {
      this.clearErrors()
      this.validForm()
      const { content } = this.state
      const { onCreateSolutionAttemptComment, solutionAttempt } = this.props
      const { problem } = solutionAttempt

      if (problem === undefined) throw Error('O problema está vazio')

      onCreateSolutionAttemptComment(problem.id, solutionAttempt.id, { content })
    } catch(error) { console.log(error) }
  }

  render() {
    
    const { content, fieldErrors } = this.state
    const { comments, onDeleteSolutionAttemptComment, solutionAttempt,
     onFetchAllSolutionAttemptComments, currentPage, itemsPerPage, 
     totalItems, totalPages, isLoadingComments,
     onSetSolutionAttemptCommentsCurrentPage } = this.props
    const { change, clearComment } = this
    const { problem } = solutionAttempt

    const fetchAllCommentsForPagination = (filters ={}) => {
      if (problem) 
        onFetchAllSolutionAttemptComments(problem.id, solutionAttempt.id, filters )
    }

    const AddSolutionAttemptComment = (
      <form className="solutionAttemptComments__addComment"
        onSubmit={this.onCreateCommentFormSubmit}>
        <h3 className="content__subtitle__h3">Cadastrar Comentário</h3>
        <div className="row">
          <textarea name="content"
              value={content}
              onChange={change}
              className="solutionAttemptComments__addComment__contentTextArea"
              placeholder="Digite o conteúdo do comentário"></textarea>
          {fieldErrors.content && (ShowFieldErrors(fieldErrors.content))}
        </div>
        <div className="row">
          <button type="submit" className="solutionAttemptComments__addComment__addButton">
            Adicionar comentário</button>
          <button type="reset" onClick={clearComment}
              className="solutionAttemptComments__addComment__clearButton">
            Limpar comentário</button>
        </div>
      </form>
    )

    const onDeleteSolutionAttemptCommentWithConfirmation = (
        problem: Problem, 
        solutionAttempt:SolutionAttempt, 
        comment: SolutionAttemptComment) => {

      if (window.confirm("Você tem certeza?")) 
      onDeleteSolutionAttemptComment(problem.id, solutionAttempt.id, comment.id)
    }

    const ListComments = (comments:SolutionAttemptComment[]) => (
      <ul className="solutionAttemptComments__list">
        {comments && problem && comments.length > 0 && comments.map((comment, key) => (
          <li className="solutionAttemptComments__listComments__item" key={key}>
            <div className="flex1">
              <span className="solutionAttemptComments__listComments__itemDateTime">
                {comment.createdAt && formatAsDateTime(comment.createdAt)}
              </span>
              <span className="solutionAttemptComments__listComments__itemContent">
                {comment.content} 
              </span>    
            </div>
            <div className="solutionAttemptComments__listComments__actionButtonArea">
              <button 
                    onClick={() => 
                      onDeleteSolutionAttemptCommentWithConfirmation(problem, solutionAttempt, comment)}
                    className="solutionAttemptComments__listComments__itemDeleteButton">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    )

    const ListSolutionAttemptCommentsWithPagination = (
      <div className="solutionAttemptComments__list__area">
        <h3 className="content__subtitle__h3">Lista de comentários</h3>
        {isLoadingComments && <Loading />}
        {comments && (
          <>
            {ListComments(comments)}
            <Pagination
              currentPage={currentPage}
              items={comments}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              totalPages={totalPages}
              setItemsCurrentPage={onSetSolutionAttemptCommentsCurrentPage}
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

    return (
      <section className="solutionAttemptComments">
          <h2 className="content_subtitle">Comentários</h2>
          <div className="solutionAttemptComments__container">
            {AddSolutionAttemptComment}
            {ListSolutionAttemptCommentsWithPagination}
          </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onFetchAllSolutionAttemptComments: (problemId: number, attemptId: number, filters = {}) =>
          dispatch(fetchAllSolutionAttemptComments(problemId, attemptId, filters)),
    onCreateSolutionAttemptComment: (problemId: number, attemptId: number, comment: SolutionAttemptComment) =>
          dispatch(createSolutionAttemptComment(problemId, attemptId, comment)),
    onDeleteSolutionAttemptComment: (problemId: number, attemptId: number, commentId:number) =>
          dispatch(deleteSolutionAttemptComment(problemId, attemptId, commentId)),
    onSetSolutionAttemptCommentsCurrentPage: (page:number) => 
          dispatch(setCurrentSolutionAttemptCommentsPage(page))
  }
}

const mapStateToProps = (props: any)  => {
  const { currentSolutionAttemptComments,
    currentSolutionAttemptCommentsPage,
    currentSolutionAttemptCommentsTotalItems,
    currentSolutionAttemptCommentsTotalPages,
    currentSolutionAttemptCommentsItemsPerPage,
    isLoadingComments } = props.solutionAttempts
  return {
    comments: currentSolutionAttemptComments,
    currentPage: currentSolutionAttemptCommentsPage,
    itemsPerPage:   currentSolutionAttemptCommentsItemsPerPage,
    totalItems: currentSolutionAttemptCommentsTotalItems,
    totalPages: currentSolutionAttemptCommentsTotalPages,
    isLoadingComments
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionAttemptComments)

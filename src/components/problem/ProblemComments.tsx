import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createProblemComment, fetchAllProblemComments, 
  setCurrentProblemCommentsPage, 
  deleteProblemComment} from '../../redux/actions/problemsActions'

import './ProblemComments.scss'
import Problem from '../../models/Problem'
import ProblemComment from '../../models/ProblemComment'
import Pagination from '../shared/Pagination'

interface IProblemCommentsProps {
  problem: Problem  
  comments: ProblemComment[]
  onCreateProblemComment:any
  onFetchAllProblemComments:any
  onSetProblemCommentsCurrentPage: any
  onDeleteProblemComment: any
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

interface IProblemCommentsState {
  content: string
  fieldErrors: any
}

class ProblemComments extends Component<IProblemCommentsProps, IProblemCommentsState> {

  state = {
    content: '',
    fieldErrors: {} as any
  }

  componentDidMount = () => {
    const { onFetchAllProblemComments, problem } = this.props

    if (problem.id !== undefined) 
      onFetchAllProblemComments(problem.id, { sort: 'createdAt,desc' })
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
      const { onCreateProblemComment, problem } = this.props
      onCreateProblemComment(problem.id, new ProblemComment(content))
    } catch(error) { console.log(error) }
  }

  render() {
    
    const { content, fieldErrors } = this.state
    const { change } = this
    const { problem, onFetchAllProblemComments, totalItems, itemsPerPage,
      onSetProblemCommentsCurrentPage, currentPage, comments,
      totalPages, onDeleteProblemComment } = this.props

  
    const fetchAllCommentsForPagination = (filters ={}) => {
      onFetchAllProblemComments(problem.id, filters )
    }

    const ListComments = (comments:ProblemComment[]) => (
      <ul className="problemComments__listComments">
        {comments && comments.length > 0 && comments.map((comment, key) => (
          <li className="problemComments__listComments__item" key={key}>
            <div className="flex1">
              <span className="problemComments__listComments__itemContent">
                {comment.content} 
              </span>
              <span className="problemComments__listComments__itemDateTime">
                {comment.createdAt}
              </span>
            </div>
            <div className="problemComments__listComments__actionButtonArea">
              <button onClick={() => onDeleteProblemComment(problem.id, comment.id)}
                  className="problemComments__listComments__itemDeleteButton">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    )

    const showFieldErrors = (errors: []) => errors.map((err:string, key:any) => 
      <div key={key} className="row errorMessage">{err}</div>
    )

    return (
      <section className="problemComments">
          <h2 className="content_subtitle">Comentários</h2>
          <div className="problemComments__container">
            <form className="problemComments__addComent"
              onSubmit={this.onCreateCommentFormSubmit}>
              <h3 className="content__subtitle__h3">Cadastrar Comentário</h3>
              <div className="row">
                <textarea name="content"
                    value={content}
                    onChange={change}
                    className="problemComments__addComent__contentTextArea"
                    placeholder="Digite o conteúdo do comentário"></textarea>
                {fieldErrors.content && (showFieldErrors(fieldErrors.content))}
              </div>
              <div className="row">
                <button type="submit" className="problemComments__addComent__addButton">
                  Adicionar comentário</button>
              </div>
            </form>
            <div className="problemComments__listComments">
              <h3 className="content__subtitle__h3">Lista de comentários</h3>
              {comments && (
                <>
                  {ListComments(comments)}
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
              {comments && comments.length <= 0 && (
                <div className="row">
                  <strong>
                    Não há comentários cadastrados.
                  </strong>
                </div>
              )}
            </div>
          </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onCreateProblemComment: (id:number, comment: ProblemComment) =>  dispatch(createProblemComment(id, comment)),
    onFetchAllProblemComments: (problemId:number, filters = {}) => 
            dispatch(fetchAllProblemComments(problemId, filters)),
    onSetProblemCommentsCurrentPage: (page:number) => dispatch(setCurrentProblemCommentsPage(page)),
    onDeleteProblemComment: (problemId: number, commentId:number) => 
            dispatch(deleteProblemComment(problemId, commentId))
  }
}

const mapStateToProps = (props:any)  => {
  const { currentProblemComments,
    currentProblemCommentsTotalItems, 
    currentProblemCommentsTotalPages, 
    currentProblemCommentsItemsPerPage,
    currentProblemCommentsPage } = props.problems
  
  return {
    comments: currentProblemComments,
    currentPage: currentProblemCommentsPage,
    itemsPerPage: currentProblemCommentsItemsPerPage,
    totalItems: currentProblemCommentsTotalItems,
    totalPages: currentProblemCommentsTotalPages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemComments)

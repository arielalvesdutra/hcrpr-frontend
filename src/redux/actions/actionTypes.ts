export enum ProblemsActions {
  SET_PROBLEMS = "SET_PROBLEMS",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_CURRENT_PROBLEM = "SET_CURRENT_PROBLEM",
  SET_CURRENT_PROBLEM_COMMENTS = "SET_CURRENT_PROBLEM_COMMENTS",
  SET_CURRENT_PROBLEM_COMMENTS_PAGE = "SET_CURRENT_PROBLEM_COMMENTS_PAGE",
  SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS = "SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS",
  SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS_PAGE = "SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS_PAGE",
  SET_CURRENT_PROBLEM_SOLUTION_ATTEMPT = "SET_CURRENT_PROBLEM_SOLUTION_ATTEMPT",
  SET_CURRENT_PROBLEM_RELATED_CONCEPTS = "SET_CURRENT_PROBLEM_RELATED_CONCEPTS",
  SET_IS_LOADING_PROBLEMS = "SET_IS_LOADING_PROBLEMS",
  SET_IS_LOADING_CURRENT_PROBLEM = "SET_IS_LOADING_CURRENT_PROBLEM",
  SET_IS_LOADING_CURRENT_PROBLEM_COMMENTS = 'SET_IS_LOADING_CURRENT_PROBLEM_COMMENTS',
  SET_IS_LOADING_CURRENT_PROBLEM_SOLUTION_ATTEMPT = "SET_IS_LOADING_CURRENT_PROBLEM_SOLUTION_ATTEMPT"
}

export enum TechniquesActions {
  SET_TECHNIQUES = "SET_TECHNIQUES",
  SET_CURRENT_TECHNIQUE = "SET_CURRENT_TECHNIQUE",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_IS_LOADING_TECHNIQUES = "SET_IS_LOADING_TECHNIQUES",
  SET_IS_LOADING_CURRENT_TECHNIQUE = "SET_IS_LOADING_CURRENT_TECHNIQUE"
}

export enum ConceptsActions {
  SET_CONCEPTS = "SET_CONCEPTS",
  SET_CURRENT_CONCEPT = "SET_CURRENT_CONCEPT",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_IS_LOADING_CONCEPTS = "SET_IS_LOADING_CONCEPTS",
  SET_IS_LOADING_CURRENT_CONCEPT = "SET_IS_LOADING_CURRENT_CONCEPT"
}

export enum SolutionAttemptsActions {
  SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS = 'SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS',
  SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS_PAGE = 'SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS_PAGE',
  SET_IS_LOADING_CURRENT_SOLUTION_ATTEMPT_COMMENTS = 'SET_IS_LOADING_CURRENT_SOLUTION_ATTEMPT_COMMENTS'
}

export enum ErrorActions {
  CLEAR_PAGE_ERROR = "CLEAR_PAGE_ERROR",
  SET_ERROR_404 = "SET_ERROR_404",
  SET_ERROR_SERVICE_UNAVAILABLE = "SET_ERROR_SERVICE_UNAVAILABLE",
  SET_ERROR_400 = "SET_ERROR_400"
}

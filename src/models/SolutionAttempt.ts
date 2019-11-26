import ProblemComment from "./ProblemComment";
import Problem from "./Problem";

class SolutionAttempt {
  constructor(
    public name: string,
    public description: string,
    public id?: number,
    public problem?: Problem,
    public comments?: ProblemComment[]
    ) {}
}

export default SolutionAttempt

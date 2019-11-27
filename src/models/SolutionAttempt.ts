import ProblemComment from "./ProblemComment";
import Problem from "./Problem";
import Technique from "./Technique";

class SolutionAttempt {
  constructor(
    public name: string,
    public description: string,
    public id?: number,
    public problem?: Problem,
    public comments?: ProblemComment[],
    public techniques?: Technique[]
    ) {}
}

export default SolutionAttempt

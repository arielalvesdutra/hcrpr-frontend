import ProblemComment from "./ProblemComment";
import Concept from "./Concept";

class Problem {
  constructor(
    public name: string,
    public description: string,
    public id?: number,
    public comments?: ProblemComment[],
    public relatedConcepts?: Concept[]
    ) {}
}

export default Problem

import ProblemComment from "./ProblemComment";
import Concept from "./Concept";

class Problem {
  constructor(
    public name: string,
    public description: string,
    public id?: number,
    public comments?: ProblemComment[],
    public relatedConcepts?: Concept[],
    public createdAt?: Date
    ) {}
}

export default Problem

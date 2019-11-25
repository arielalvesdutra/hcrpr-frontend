import ProblemComment from "./ProblemComment";

class Problem {
  constructor(
    public name: string,
    public description: string,
    public id?: number,
    public comments?: ProblemComment[]
    ) {}
}

export default Problem

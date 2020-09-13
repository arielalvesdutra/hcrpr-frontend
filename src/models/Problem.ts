import ProblemComment from "./ProblemComment";
import Concept from "./Concept";

export default interface Problem {  
  id?: number
  name: string
  description: string
  createdAt?: Date    
  comments?: ProblemComment[]
  relatedConcepts?: Concept[]
}

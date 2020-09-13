import React from "react"
import { renderWithRedux } from '../../../test-helpers/test-utils'
import "@testing-library/jest-dom/extend-expect"
import ProblemRelatedConcepts from "./ProblemRelatedConcepts"
import Problem from "../../../models/Problem"

describe("Components: ProblemRelatedConcepts", () => {

  test("should render with empty values", () => {
    const { getByText } = renderWithRedux(
      <ProblemRelatedConcepts
        concepts={[]}
        isLoading={true}
        problem={{} as Problem}
        relatedConcepts={[]}
      />
    )

    expect(getByText('Conceitos Relacionados')).toBeInTheDocument()
  })

})

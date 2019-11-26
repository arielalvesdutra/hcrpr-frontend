import React from 'react'

const ShowFieldErrors = (errors: []) => errors.map((err:string, key:any) => 
  <div key={key} className="row errorMessage">{err}</div>
)

export default ShowFieldErrors

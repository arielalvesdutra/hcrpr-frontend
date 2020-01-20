
import React from 'react'
import { ClipLoader } from 'react-spinners'

const loadingStyle = {
  alignItems:'center', 
  display: 'flex', 
  justifyContent: 'center', 
  padding: '20px 10px'
}

const Loading = () => (
  <div className="loading" style={loadingStyle}>
    <ClipLoader />
  </div>
)

export default Loading

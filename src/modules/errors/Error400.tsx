import React from 'react'
import Content from '../../layouts/Content'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import { connect } from 'react-redux'

const Error400 = () => {  
  const pageError = "Requisição Inválida"
  usePageTitle(pageError)
  
  return (
    <Content title={pageError} breadcrumbLinks={[]}>
        <section>
          <p>A requisição que vocẽ realizou é inválida.</p>
        </section>
    </Content>
  )
}

export default connect(null)(Error400)

import React from 'react'
import Content from '../../layouts/Content'
import { usePageTitle } from '../../components/shared/UsePageTitle'
import { connect } from 'react-redux'

const Error404 = () => {  
  
  const pageError = "Página não encontrada"
  usePageTitle(pageError)
  
  return (
    <Content title={pageError} breadcrumbLinks={[]}>
        <section>
          <p>Ops, a página que você está procurando não existe.</p>
        </section>
    </Content>
  )
}

export default connect(null)(Error404)

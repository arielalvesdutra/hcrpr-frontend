import React from 'react'
import Content from '../../layouts/Content'
import { usePageTitle } from '../../components/shared/UsePageTitle'

const ServiceUnavailable = () => {
  const pageError = "Serviço indisponível"
  usePageTitle(pageError)

  return (
    <Content title={pageError} breadcrumbLinks={[]}>
        <section>
          <p>O serviço que você requisitou está indisponível. Por favor, aguarde alguns mínutos ou entre em contato o responsável pelo serviço.</p>
        </section>
    </Content>
  )
}

export default ServiceUnavailable

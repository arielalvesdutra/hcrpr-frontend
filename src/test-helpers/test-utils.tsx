import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import  storeParam from '../redux/store'

function renderWithRedux(ui: any, { initialState = {}, store = storeParam, ...renderOptions} = {}) {
  function Wrapper({ children }: any) {
    return (
      <Provider store={store()}>
        {children}
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { renderWithRedux }

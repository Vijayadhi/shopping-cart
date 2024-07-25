import React from 'react'
import TobBarComponent from './component/TobBarComponent'
import ProductComponent from './component/ProductComponent'
import {ProductContextComponent} from './context/ProductContext'

function App() {
  return (
    <>
      <ProductContextComponent>
        <TobBarComponent />
        <ProductComponent />
      </ProductContextComponent>
    </>
  )
}

export default App
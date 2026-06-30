import React from 'react'
import {AppWrapper, Header} from "../../components"
import {Categories} from "./categories"
import { Products } from './Products'
const Home = () => {
  return (
    <>
       <Header/>
       <AppWrapper>
        <Categories/>
        <Products/>
      </AppWrapper>
    </>
  )
}

export  {Home}
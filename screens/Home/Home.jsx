import React from 'react'
import { AppWrapper, Header } from "../../components"
import { Categories } from "./categories"
import { Products } from './Products'
const Home = ({ navigation }) => {
  return (
    <>
      <Header onCartPress={() => navigation.navigate("Cart")} onFavouritePress={() => navigation.navigate("Favourites")} />
      <AppWrapper>
        <Categories />
        <Products />
      </AppWrapper>
    </>
  )
}

export { Home }
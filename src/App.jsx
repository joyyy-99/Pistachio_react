import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage"
import MenuPageStarters from "./Pages/MenuPageStarters"
import MenuPageMains from "./Pages/MenuPageMains"
import MenuPageDesserts from "./Pages/MenuPageDesserts"
import MenuPageSides from "./Pages/MenuPageSides"
import Layout from "./Layout"

export default function App(){
  return (
    <Router>
      <Routes>
        <Route element = {<Layout />}>
          <Route path = "/" element = {<HomePage />}/>
          <Route path = "/MenuPageStarters" element = {<MenuPageStarters />}/>
          <Route path = "/MenuPageMains" element = {<MenuPageMains  />}/>
          <Route path = "/MenuPageDesserts" element = {<MenuPageDesserts />}/>
          <Route path = "/MenuPageSides" element = {<MenuPageSides/>}/>
        </Route>
      </Routes>
    </Router>
  )
}
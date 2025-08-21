import React from "react"
import Header from "./Header/Header"
import Hero from "./Hero/Hero"
import Crousal from "./Crousal/Crousal"
import Footer from "./Footer/Footer"
import Feature from "./Feature/Feature"
import "./App.css";
import Sidebar from "./Admin/Sidebar"
import Dashboard from "./Admin/Dashboard/Dashboard"
function App() {
  const isLogin = false;
  return (
    <>
      <Header />
      <Hero />
      <Crousal />
      <Feature />
      <Footer />
    </>
  )
}

export default App

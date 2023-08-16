import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Header from "./Component/header/Header";
import Login from "./Component/Login/Login";
import Registrar from "./Component/Registrar/Registrar";
import Consulta from "./Component/Consulta/Consulta";
import Soporte from "./Component/Soporte/Soporte";
import Pago from "./Component/Pago/Pago";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/Login">
          <Login />
          <Header />
        </Route>
        <Route exact path="/Registrar">
          <Registrar />
          <Header />
        </Route>
        <Route exact path="/Consulta/:email">
          <Consulta />
          <Header />
        </Route>
        <Route exact path="/Soporte/:email">
          <Soporte />
          <Header />
        </Route>
        <Route exact path="/Pago/:Plan1">
          <Pago />
          <Header />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

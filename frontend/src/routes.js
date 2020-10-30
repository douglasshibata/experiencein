import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Perfis from "./pages/Perfis";
import { isAuthenticated } from "./services/auth";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path='/cadastro' component={Cadastro} />
      <PrivateRoute path='/perfis' component={Perfis}/>
      <PrivateRoute path='/perfil' component={Perfil}/>
      <Route path="*" component={() => <h1>Página não encontrada ou não existe</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

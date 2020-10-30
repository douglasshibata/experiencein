import React, {  useState } from "react";
import { Link, withRouter,useHistory } from "react-router-dom";

import Logo from "../../assets/Logo.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

function Login(){
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const history = useHistory()
    const handleSignIn = async e => {
      e.preventDefault();
      const data  = {username,password}
      if (!data) {
        alert('Preencha o username e senha para continuar')
      } else {
        try {
          const response = await api.post("login/", data);
        console.log(response);
          login(response.data.token);
          history.push('/perfis')
        } catch (err) {
            setError('Erro ao logar')
          console.log(err.data);
        }
      }
    };
    localStorage.setItem('nome',username)
    return (
      <Container>
        <Form onSubmit={handleSignIn}>
            <img src={Logo} alt="logo" />
          {error && <p>{error}</p>}
          <input
            type="text"
            placeholder="Nome"
            onChange={e =>setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/cadastro">Criar conta grátis</Link>
        </Form>
      </Container>
    );
}

export default withRouter(Login);
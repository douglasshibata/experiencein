import React, { useState } from "react";
import { Link, withRouter,useHistory } from "react-router-dom";

import api from "../../services/api";
import Logo from "../../assets/Logo.png";

import { Form, Container } from "./styles";
function Cadastro(){
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [nome_empresa,setNomeEmpresa] = useState('');
    const [error,setError] = useState('');
    const history = useHistory()
    const  handleSignUp = async e => {
    e.preventDefault();
    const data = {nome,email,nome_empresa,senha}
    if (!data) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        const response = await api.post("perfis/",data);
        console.log(response);
        history.push("/");
      } catch (err) {
        console.log(err.data);
        setError("Ocorreu um erro ao registrar sua conta.");
      }
    }
  };

    return (
      <Container>
        <Form onSubmit={handleSignUp}>
        <img src={Logo} alt="logo" />
          {error && <p>{error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => setSenha(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome da empresa"
            onChange={e => setNomeEmpresa(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
}

export default withRouter(Cadastro);
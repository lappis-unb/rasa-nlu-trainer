import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Logo from '../../assets/logo.png'
import api from '../../services/api'
import { login } from '../../services/auth'

import { Form, Container } from './styles'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleSignIn = async e => {
    e.preventDefault()
    const { email, password } = this.state
    const { history } = this.props
    if (!email || !password) {
      this.setState({ error: 'Preencha e-mail e senha para continuar!' })
    } else {
      try {
        const response = await api.post('/login', { email, password })
        login(response.data.token)
        history.push('/app')
      } catch (err) {
        console.log(err)
        this.setState({
          error: 'Houve um problema com o login, verifique suas credenciais. T.T'
        })
      }
    }
  };

  render () {
    const { error } = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Lappis logo" />
          {error && <p>{error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
        </Form>
      </Container>
    )
  }
}

export default withRouter(SignIn)

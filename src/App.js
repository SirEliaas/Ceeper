import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo'

import axios from 'axios'

export default class App extends Component {

  state = {
    result: {},
    ip: ""
  }

  async componentDidMount() {
    await axios.get('https://freegeoip.app/json/').then((response) => {
      this.setState({
        ip: response.data.ip
      })
    })
  }

  handleInputChange = async (e) => {
    var value = e.target.value
    if(value.length === 8) {
      await axios.get(`https://viacep.com.br/ws/${ e.target.value }/json/`).then((response) => {
        this.setState({
          result: response.data
        })
      })
    }

    this.setState({
      result: ''
    })
  }

  render() {
    const { result } = this.state
    return (
      <div className="App">
        <div className="card">
          <Logo />
          <div className="input-container">
            <label htmlFor="cep">Digite o cep: </label>
            <input type="text" placeholder="Ex. 01001000" name="cep" onChange={ e => this.handleInputChange(e) }/>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}> Seu IP: { this.state.ip }</p>
        <br/>
        <div className="infos">
          <p className="item">CEP: <br/><span className="text">{ result.cep }</span></p>
          <p className="item">LOGRADOURO: <br/><span className="text">{ result.logradouro }</span></p>
          <p className="item">BAIRRO: <br/><span className="text">{ result.bairro }</span></p>
          <p className="item">LOCALIDADE: <br/><span className="text">{ result.localidade }</span></p>
          <p className="item">UF: <br/><span className="text">{ result.uf }</span></p>
        </div>
    </div>
  );
  }
}
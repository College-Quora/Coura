import React, { useState, useEffect } from 'react'
import Quora from './components/Quora';
import Login from './components/Login';
import Register from './components/Register';
import EmailVerified from './components/EmailVerified';
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";


function App() {  
    const token = window.localStorage.getItem("token");
    return (
      <div className='App'>

      <Routes>
        <Route path="/*" exact element={<Quora />} />
        { !token && <Route path="/signup" exact element={<Register />} />}
        { !token && <Route path="/login" exact element={<Login />} />}
        <Route path="/auth/:id/verify/:token" element={<EmailVerified />} />
      </Routes>
      
    </div>
    )
}



/*
class App extends Component {

  state = {};

  componentDidMount() {
    this.all()
  }

  hello = () => {
      fetch('demo/hello')
          .then(response => response.text())
          .then(message => {
              this.setState({message: message});
          });
  };

  all = () => {
      fetch('demo/all')
          .then(response => response.text())
          .then(message => {
              this.setState({message: message});
          });
  };

  render() {
    return (
    <div className="App">
      <h1> {this.state.message}</h1>
    </div>

  );
  }
  
}
*/
export default App;

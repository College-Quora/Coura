//import {Component} from 'react';

import React from 'react'
import Quora from './components/Quora';
//import Feed from './components/Feed'
//import Blog from './components/Blog'
//import QuoraHeaderFeed from './components/QuoraHeaderFeed';
//import QuoraHeaderBlog from './components/QuoraHeaderBlog';

import './App.css';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const component = queryParams.get("component");

  switch (component) {
    case "blog":
      return (
        <Quora/>
      )
    default:
      return (
        <Quora/>
      )
  }
}

/*
const queryParams = new URLSearchParams(window.location.search);
  const component = queryParams.get("component");

  switch (component) {
    case "blog":
      return (
        <Quora>
          <Blog />
        </Quora>
      )
    default:
      return (
        <Quora >
          <Feed />
        </Quora>
      )
  }
*/

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

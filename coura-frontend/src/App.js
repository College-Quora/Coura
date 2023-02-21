import {Component} from 'react';
import './App.css';

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

export default App;

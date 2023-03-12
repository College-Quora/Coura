import React, { useState, useEffect } from 'react'
import Quora from './components/Quora';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';


function App() {

  const [currentPage, setCurrentPage] = useState('home');

  const togglePage = (pageName) => {
    setCurrentPage(pageName);
  }

  
    return (
      <div className='App'>

        {(() => {
        switch (currentPage) {
          case 'login':
            return <Login onPageSwitch={togglePage} />;
          case 'register':
            return <Register onPageSwitch={togglePage} />;
          default:
            return <Quora onPageSwitch={togglePage}/>
        }
      })()}
      
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

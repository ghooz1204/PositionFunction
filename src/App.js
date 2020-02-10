import React from 'react';
import logo from './logo.svg'
import './App.css';
import Content from './Content';
import { hot } from 'react-hot-loader'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img className="App-logo-img" src={logo} alt="logo" />
//         <span className="App-logo-text">A Positioning</span>
//       </header>
//       <Content />
//     </div>
//   );
// }

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo-img" src={logo} alt="logo" />
          <span className="App-logo-text">A Positioning</span>
        </header>
        <Content />
      </div>
    );
  }
}

export default hot(module)(App);
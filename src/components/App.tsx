import * as React from 'react';
import '../styles/App.css';
import SnakeGame from './SnakeGame';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SnakeGame />
      </div>
    );
  }
}

export default App;

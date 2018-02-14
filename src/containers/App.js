import React, {Component} from 'react';
import CommandContainer from "./CommandContainer";
import ControlContainer from "./ControlContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ControlContainer/>
        <CommandContainer/>
      </div>
    );
  }
}

export default App;

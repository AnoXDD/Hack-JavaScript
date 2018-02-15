import React, {Component} from 'react';
import CommandContainer from "./CommandContainer";
import ControlContainer from "./ControlContainer";
import OutputContainer from "./OutputContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <OutputContainer/>
        <ControlContainer/>
        <CommandContainer/>
      </div>
    );
  }
}

export default App;

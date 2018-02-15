import React, {Component} from 'react';
import CommandContainer from "./CommandContainer";
import ControlContainer from "./ControlContainer";
import OutputContainer from "./OutputContainer";
import {Scrollbars} from "react-custom-scrollbars";

class App extends Component {
  constructor() {
    super();

    this.handleOutputContainerUpdate = this.handleOutputContainerUpdate.bind(
      this);
  }

  handleOutputContainerUpdate() {
    let {scrollbars} = this.refs;
    scrollbars.scrollToBottom();
  }

  render() {
    return (
      <div className="App">
        <div style={{height: "100%"}}>
          <Scrollbars
            autoHide
            autoHeightMax="100%"
            ref="scrollbars"
            style={{maxHeight: "100%"}}
          >
            <ControlContainer/>
            <OutputContainer
              onUpdate={this.handleOutputContainerUpdate}/>
            <CommandContainer/>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default App;

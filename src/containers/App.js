import React, {Component} from 'react';
import CommandContainer from "./CommandContainer";
import ControlContainer from "./ControlContainer";
import OutputContainer from "./OutputContainer";
import {Scrollbars} from "react-custom-scrollbars";
import CallbackContainer from "./CallbackContainer";

class App extends Component {
  constructor() {
    super();

    this.handleOutputContainerUpdate = this.handleOutputContainerUpdate.bind(
      this);
  }

  componentDidMount() {
    // Calculate the width for better format

    if (!this.refs || !this.refs.widthbox || !this.refs.app) {
      window.charLimit = 8;
    }

    let appWidth = this.refs.app.clientWidth;
    let charWidth = this.refs.widthbox.clientWidth;
    window.charLimit = Math.floor(appWidth / charWidth) || 8;
  }

  handleOutputContainerUpdate() {
    this.scrollbars.scrollToBottom();
  }

  render() {
    return (
      <div className="App" ref="app">
        <div className="hidden width-box" ref="widthbox">.</div>
        <CallbackContainer/>
        <div style={{height: "100%"}}>
          <Scrollbars
            autoHide
            autoHeightMax="100%"
            ref={ref=>{
              this.scrollbars = ref;
              this.handleOutputContainerUpdate();
            }}
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

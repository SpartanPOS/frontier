//import logo from './logo.svg';
import './App.css';
import './BlocklyComponent.css'
import Blockly, { Block, Generator } from 'blockly';
import React, {Component, createRef} from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.gen = new Generator("pos");
    this.blocklyDiv = React.createRef();
    this.toolbox = createRef()
  }

  componentDidMount() {
    Blockly.Blocks["no_blocks"] = {
      init: function() {
        this.appendDummyInput()
        .appendField('No Blocks Imported')
      }
    }
    
    let initialXml  = `
      <xml xmlns="http://www.w3.org/1999/xhtml">
      </xml>
    `

    this.workspace = Blockly.inject(
      this.blocklyDiv.current,
      {
          toolbox: this.toolbox.current
      },
    );
  
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.workspace)
    this.workspace.updateToolbox(`<xml xmlns="https://developers.google.com/blockly/xml" is="blockly">
      <Block type="no_blocks" id="noblock-err" />
    </xml>`)

  }

  setTools = (tools) => {

    let jsn = []
    let gen = []
    let names = []

    tools.map((tool, index) => {
      jsn.push(tool.xml)
      names.push(tool.Name)
    } )

    let newBox = names.map((name, index) => {
      return `<Block type="${name}" id="${index}" />`
    })

    Blockly.defineBlocksWithJsonArray(jsn)

    let xml = 
    `<xml xmlns="https://developers.google.com/blockly/xml" is="blockly">
        ${newBox}
      </xml>`
    
    this.workspace.updateToolbox(xml)

  }


  ImportBlocks = () => {
    let tools = JSON.parse(localStorage.getItem('tools'))

    if (!tools) {
      console.log("No tools found")
      return;
    }

    this.setTools(tools);
  }

  render() {

    return (
      <div className="App">
        <header  className="App-header">

          <button onClick={this.test}>test</button>
          <button onClick={this.ImportBlocks}>Set Tools</button>
        </header>

        <div ref={this.blocklyDiv} id="blocklyDiv" >
          <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
          </xml>
        </div>

      </div>
    );

  }
}
export default App;

import "./css/master.css";
import Board from "./components/board.js";
import Head from "./components/head.js";
import FloatingBox from "./components/floatingBox.js";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Head />
        <Board user={this.user} />
        <FloatingBox />
      </div>
    );
  }
}

export default App;

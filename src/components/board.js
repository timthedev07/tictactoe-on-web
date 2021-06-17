import { Component, createRef } from "react";
import { Control, PA } from "./control.js";
import {
  initial_state,
  player,
  result,
  terminal,
  winner,
  X,
  O,
  minimax,
  EMPTY,
} from "./ttt/logic.js";

class GridItem extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }

  render() {
    if (window.localStorage.getItem("user") === null) {
      return (
        <div className="tttButtonsContainer">
          <button
            ref={this.myRef}
            disabled
            className="tttButtons btn btn-secondary"
            id={this.props.id}
            onClick={() => this.handleClick(this.props.id)}
          >
            {/* this is used plugging variables into the component.
                        For example:
                        if you render the component with:
                        <Grid name="foo" />
                        then the variable below in the curly braces is going to be `foo`
    
                        but if there is not value provided for 
                        this property then we are going to accept some 
                        default value after `||`
                        */}
            {this.props.name || ""}
          </button>
        </div>
      );
    }
    return (
      <div className="tttButtonsContainer">
        <button
          ref={this.myRef}
          className="tttButtons btn btn-warning"
          id={this.props.id}
          onClick={() => this.handleClick(this.props.id)}
        >
          {this.props.name || ""}
        </button>
      </div>
    );
  }

  /* here we define handle click and set it to be
    a function that handles the event when element inside of 
    this component gets clicked */
  handleClick = (id) => {
    // construct an array representing the action taken by the user
    let action = [parseInt(id.charAt(0)), parseInt(id.charAt(1))];
    this.props.handler(action);
    this.updateInnerHTML(window.localStorage.getItem("player"), true);
  };

  updateInnerHTML = async (content, disabled) => {
    let node = this.myRef.current;
    node.innerHTML = content;
    node.setAttribute("disabled", "true");
  };

  disable = () => {
    let node = this.myRef.current;
    if (node.innerHTML !== X && node.innerHTML !== O) {
      this.myRef.current.className = "tttButtons btn btn-secondary";
      this.myRef.current.innerHTML = "";
      this.myRef.current.disabled = true;
    }
  };

  /**
   * Sets disabled to false and innerhtml to empty string
   */
  enable() {
    let node = this.myRef.current;
    node.innerHTML = "";
    node.disabled = false;
    node.className = "tttButtons btn btn-warning";
  }
}

class Board extends Component {
  /**
   * Initializing a complete implementation of a tic tac toe board
   * @param {*} props
   */
  constructor(props) {
    // inheriting from the original React's constructor
    super(props);

    // some variables we are going to keep track of
    this.state = {
      winner: null,
    };
    this.references = {};
    this.controlRef = createRef();

    window.localStorage.clear();

    // store the variables in the local storage
    window.localStorage.setItem("board", JSON.stringify(initial_state()));
    window.localStorage.setItem("terminal", "false");
    window.localStorage.setItem("player", player(initial_state()));
    window.localStorage.setItem("steps", "0");
    window.localStorage.setItem("message", "");
  }

  setUser = (user) => {
    window.localStorage.setItem("board", JSON.stringify(initial_state()));
    window.localStorage.setItem("user", user);
    window.localStorage.setItem("terminal", "false");
    window.localStorage.setItem("message", "");
    this.setState(this.state);
    if (user === O) {
      this.updateBoardAI();
    }
  };

  getOrCreateRef(id) {
    if (!this.references.hasOwnProperty(id)) {
      this.references[id] = createRef();
    }
    return this.references[id];
  }

  getBoard = () => {
    return JSON.parse(window.localStorage.getItem("board"));
  };

  /**
   * Updates the existing board with the given action
   * returns the current player
   * @param {*} action
   */
  updateBoard = (action) => {
    // retrieve current board from local storage
    let current_board = this.getBoard();

    // get resulting board based user move
    let resulting_board = result(current_board, action);

    // get current player
    let curr_player = player(current_board);
    window.localStorage.setItem("prevPlayer", curr_player);

    // update
    window.localStorage.setItem("player", player(resulting_board));
    window.localStorage.setItem("board", JSON.stringify(resulting_board));

    // increment steps
    window.localStorage.setItem(
      "steps",
      `${parseInt(window.localStorage.getItem("steps")) + 1}`
    );

    if (terminal(resulting_board)) {
      let current_winner = winner(resulting_board);
      this.controlRef.current.updateMode(PA);
      window.localStorage.setItem("terminal", "true");
      if (current_winner !== null) {
        this.updateMessage(`Game over, ${current_winner} wins`);
      } else {
        this.updateMessage(`Game over, tie`);
      }
    } else {
      this.updateBoardAI();
      this.setState(this.state);
    }
  };

  /**
   * Updates the existing board with the given action
   * returns the current player
   *
   */
  updateBoardAI = async () => {
    // retrieve current board from local storage
    let current_board = this.getBoard();

    let action = minimax(current_board);

    // get resulting board
    let resulting_board = result(current_board, action);

    // get current player
    let curr_player = player(current_board);
    window.localStorage.setItem("prevPlayer", curr_player);

    // update
    window.localStorage.setItem("player", player(resulting_board));
    window.localStorage.setItem("board", JSON.stringify(resulting_board));

    // increment steps
    window.localStorage.setItem(
      "steps",
      `${parseInt(window.localStorage.getItem("steps")) + 1}`
    );

    // show new message
    this.updateMessage(`Play as ${window.localStorage.getItem("user")}`);

    // disable the button
    let child = this.getOrCreateRef(`${action[0]}${action[1]}`);
    console.log(`processing action ${action[0]}${action[1]}`);
    console.log("processing grid:");
    console.log(child.current);
    child.current.updateInnerHTML(curr_player, true);
    this.setState(this.state);
    console.log(this.getBoard());

    if (terminal(resulting_board)) {
      let current_winner = winner(resulting_board);
      window.localStorage.setItem("terminal", "true");
      this.controlRef.current.updateMode(PA);
      if (current_winner !== null) {
        this.updateMessage(`Game over, ${current_winner} wins`);
      } else {
        this.updateMessage(`Game over, tie`);
      }
    }
  };

  disableBoard(board) {
    // get empty grids
    let empty_ids = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === EMPTY) {
          empty_ids.push(`${i}${j}`);
        }
      }
    }
    for (var i = 0; i < empty_ids.length; i++) {
      let child = this.getOrCreateRef(empty_ids[i]);
      child.current.disable();
    }
  }

  enableBoard(board) {
    // get empty grids
    let empty_ids = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === EMPTY) {
          empty_ids.push(`${i}${j}`);
        }
      }
    }
    for (var i = 0; i < empty_ids.length; i++) {
      let child = this.getOrCreateRef(empty_ids[i]);
      child.current.enable();
    }
  }

  /**
   * Updates the message displayed on top of the board
   * @param {String} message
   */
  updateMessage = (message) => {
    window.localStorage.setItem("message", message);
    this.setState(this.state);
  };

  renderGrids = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let child = this.references[`${i}${j}`];
        if (board[i][j] === EMPTY) {
          child.current.enable();
        } else {
          child.current.updateInnerHTML(board[i][j], true);
          setTimeout(() => {}, 3000);
        }
      }
    }
    if (window.localStorage.getItem("terminal") === "true") {
      this.disableBoard(board);
    }
  };

  aiFirstMove = () => {
    let steps = parseInt(window.localStorage.getItem("steps"));
    let user = window.localStorage.getItem("user");
    if (steps === 0 && user === O) {
      let action = minimax(initial_state());
      let resulting_board = result(initial_state(), action);
      this.renderGrids(resulting_board);
    }
  };

  render() {
    if (parseInt(window.localStorage.getItem("steps")) > 0) {
      this.renderGrids(this.getBoard());
    }

    const gridItems = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gridItems.push(
          <GridItem
            ref={this.getOrCreateRef(`${i}${j}`)}
            id={`${i}${j}`}
            handler={this.updateBoard}
            getter={this.getBoard}
          />
        );
      }
    }

    return (
      <div id="tictactoe">
        <div id="tttmessage-wrapper">
          <h3 id="tttmessage">
            {window.localStorage.getItem("message") || ""}
          </h3>
        </div>
        <div id="panel-wrapper">
          <div id="choose-container">
            <Control
              ref={this.controlRef}
              handler={this.setUser}
              mode="choose"
            />
          </div>
          <div id="board" key="unique">
            {gridItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;

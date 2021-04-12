import logo from '../logo.svg';
import '../css/master.css';
import Board from './board.js';
import Head from './head.js';
import FloatingBox from './floatingBox.js';

function App() {
  return (
    <div className="App">
      <Head />
      <Board />
      <FloatingBox />
    </div>
  );
}

export default App;

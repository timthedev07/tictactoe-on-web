import '../css/master.css';
import Board from './board.js';
import Head from './head.js';
import FloatingBox from './floatingBox.js';
import { Component } from 'react';


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

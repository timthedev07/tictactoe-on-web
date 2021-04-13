import {Component} from 'react';
import { O, X } from './ttt/logic';

export const PA = 'playAgain';

export class Control extends Component {
    /**
     * Available modes are `choose` and `gameEnds`
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            hidden: false
        }
    }

    updateMode = (mode) => {
        this.setState({
            mode: mode
        })
    }


    render() {
        if (this.state.mode === 'choose') {
            if (this.state.hidden) {
                return (
                    <div id="hidden-chooseContainer">
                        <h1 id="chooseSubHeading"></h1>
                        <div id="buttonWrapper">
                            <button className="choose-btn btn btn-info" onClick={() => this.handleClick(X)}>Play as X</button>
                            <button className="choose-btn btn btn-success" onClick={() => this.handleClick(O)}>Play as O</button>
                        </div>
                    </div>
                )
            }
            return(
                <div id="chooseContainer">
                    <h1 id="chooseSubHeading">Choose Player:</h1>
                    <div id="buttonWrapper">
                        <button className="choose-btn btn btn-info" onClick={() => this.handleClick(X)}>Play as X</button>
                        <button className="choose-btn btn btn-success" onClick={() => this.handleClick(O)}>Play as O</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="chooseContainer">
                    <h1 id="chooseSubHeading">Next:</h1>
                    <div id="buttonWrapper">
                        <button className="choose-btn btn btn-success" onClick={() => this.handleClick()}>Play again</button>
                    </div>
                </div>
            )
        }

    }  
    handleClick = (c=null) => {
        // hide the panel
        this.setState({
            hidden: true
        })
        if ([X, O].includes(c)) {
            this.props.handler(c);
        } else {
            console.log('replay')
            this.setState({
                mode: 'choose',
                hidden: false
            })
        }
    }
}

export default Control;
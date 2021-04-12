import {Component} from 'react';
class Head extends Component {

    // every component must have a render method that decides
    // how the component should be displayed
    render() {
        // surrounding the html elements in parentheses 
        // to let the html elements span multiple lines
        return (
            <h1 id="heading">Tic Tac Toe</h1>
        )
    } 
}
export default Head;
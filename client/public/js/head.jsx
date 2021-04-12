class Head extends React.Component {

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
module.exports.Head = Head;

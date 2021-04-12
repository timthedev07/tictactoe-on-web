class Grid extends React.Component {
    render() {
        return (
            
            <div className="tttButtonsContainer" >
                    
                <button className="tttButtons btn btn-warning">
                    {/* this is used plugging variables into the component.
                    For example:
                    if you render the component with:

                    <Grid name="foo" />

                    then the variable below in the curly braces is going to be `foo`
                    */}
                    {this.props.name}
                </button>
            </div>
        )
    }
}

class Board extends React.Component {
    render() {
        return (
            <div id="board">
                <Grid name="empty" />
                <Grid name="empty" />
                <Grid name="empty" />

                <Grid name="empty" />
                <Grid name="empty" />
                <Grid name="empty" />

                <Grid name="empty" />
                <Grid name="empty" />
                <Grid name="empty" />
            </div>
        )
    }
}
module.exports.Board = Board;

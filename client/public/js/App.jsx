class App extends React.Component {
    render() {
        return (
            <div id="app-wrapper">
                <Head />
                <Board />
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#app'));
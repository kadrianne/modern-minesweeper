import React from 'react'

export default class Cell extends React.Component {
    state = {
        revealed: false,
        classNames: 'cell'
    }

    clickedCell = () => {
        return this.setState({
            revealed: true, 
            classNames: 'cell revealed'
        })
    }

    render(){
        return <div className={this.state.classNames} onClick={this.clickedCell}>{this.props.mine}</div>
    }
}
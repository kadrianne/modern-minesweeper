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

    pressedCell = () => {
        return this.setState({
            classNames: 'cell revealed'
        })
    }

    resetCell = () => {
        return this.setState({
            classNames: 'cell'
        })
    }

    render(){
        return (
            <div className={this.state.classNames} 
                onMouseDown={this.pressedCell} 
                onMouseOut={this.state.revealed === true 
                    ? null 
                    : this.resetCell} 
                onMouseUpCapture={this.clickedCell}>
                    {this.props.x},{this.props.y}
            </div>
        )
    }
}
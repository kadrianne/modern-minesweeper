import React from 'react'

export default class Cell extends React.Component {
    state = {
        revealed: false,
        classNames: 'cell'
    }

    clickedCell = () => {
        this.setState({
            revealed: true, 
            classNames: 'cell revealed'
        })
    }

    showValue = () => {
        return (this.state.revealed == true) ? this.props.value : null
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
                    {this.showValue()}
            </div>
        )
    }
}
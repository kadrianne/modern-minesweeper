import React from 'react'

export default class Cell extends React.Component {
    state = {
        revealed: false,
        flagged: false,
        classNames: 'cell'
    }

    clickedCell = (event) => {
        event.preventDefault()
        
        if (event.nativeEvent.which == 1){
            this.setState({
                revealed: true, 
                flagged: false,
                classNames: 'cell revealed'
            })
        } else if (event.nativeEvent.which == 3){
            this.flag()
        }
    }

    flag = () => {
        this.setState(previousState => ({
            flagged: !previousState.flagged
        }))
    }

    showValue = () => {
        return (this.state.revealed === true) ? this.props.value : null
    }

    pressedCell = (event) => {
        if (event.nativeEvent.which == 1){
            return this.setState({
                classNames: 'cell revealed'
            })
        }
    }

    resetCell = () => {
        return this.setState({
            classNames: 'cell'
        })
    }

    render(){
        return (
            <div className={this.state.classNames}
                id={`${this.props.x}-${this.props.y}`}
                onMouseDown={this.state.flagged === true ? null : this.pressedCell} 
                onMouseOut={this.state.revealed === true ? null : this.resetCell} 
                onClick={this.state.flagged === true ? null : this.clickedCell}
                onContextMenu={this.state.revealed === true ? null : this.clickedCell}
            >
                {this.state.flagged == true ? '❗️' : null}
                {this.showValue()}
            </div>
        )
    }
}
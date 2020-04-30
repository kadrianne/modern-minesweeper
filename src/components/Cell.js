import React from 'react'

export default class Cell extends React.Component {
    state = {
        // revealed: this.props.revealed,
        flagged: false
        // classNames: `cell`
    }

    // componentWillReceiveProps({revealed}){
    //     this.setState({revealed})
    // }

    checkValue = () => {
        const {x,y,value,checkAdjacentCells,lostGame} = this.props
        if (value == '0'){
            checkAdjacentCells(x,y)
        } else if (value == '💣'){
            lostGame()
        }
    }

    clickedCell = (event) => {
        event.preventDefault()
        const {x,y,updateCellStates} = this.props
        
        if (event.nativeEvent.which === 1){
            this.setState({
                // revealed: true, 
                flagged: false,
                // classNames: 'cell revealed'
            })

            this.props.updateCellStates(x,y)

            this.checkValue()
        } else if (event.nativeEvent.which === 3){
            this.flag()
        }
    }

    flag = () => {
        this.setState(previousState => ({
            flagged: !previousState.flagged
        }))
    }

    showValue = () => {
        return (
            (this.props.revealed === true)
            ? <span class={this.props.iconClass}>{this.props.value}</span> 
            : null
        )
    }

    // pressedCell = (event) => {
    //     if (event.nativeEvent.which === 1){
    //         return this.setState({
    //             classNames: 'cell revealed'
    //         })
    //     }
    // }

    resetCell = () => {
        return this.setState({
            classNames: 'cell'
        })
    }

    render(){
        return (
            <div className={`cell ${this.props.revealed === true ? `revealed` : null}`}
                id={`${this.props.x}-${this.props.y}`}
                // onMouseDown={this.state.flagged === true ? null : this.pressedCell} 
                onMouseOut={this.props.revealed === true ? null : this.resetCell} 
                onClick={this.state.flagged === true ? null : this.clickedCell}
                onContextMenu={this.props.revealed === true ? null : this.clickedCell}
            >
                {this.state.flagged === true ? '❗️' : null}
                {this.showValue()}
            </div>
        )
    }
}
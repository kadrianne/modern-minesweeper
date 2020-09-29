import React from 'react'
import flag from '../assets/flag.svg'

export default class Cell extends React.Component {
    state = {
        flagged: false,
        bombClicked: false
    }

    checkValue = (event) => {
        const { x,y,value,checkAdjacentCells,lostGame } = this.props
        if (value === 0){
            checkAdjacentCells(x,y)
        } else if (value === '💣'){
            lostGame()
            this.setState({bombClicked: true})
        }
    }

    clickedCell = (event) => {
        event.preventDefault()
        const {x,y,updateCellStates,updateFlagsBoard,flagged} = this.props
        
        if (event.nativeEvent.which === 1){
            updateCellStates(x,y)
            this.checkValue()
        } else if (event.nativeEvent.which === 3){
            updateFlagsBoard(x,y,!flagged)
        }
    }

    showValue = () => {
        return (
            (this.props.revealed === true)
            ? <span className={this.props.iconClass}>{this.props.value === '💣' ? <img className='bomb' src='../bomb.png' alt='bomb-emoji'/> : this.props.value}</span> 
            : null
        )
    }

    componentDidUpdate(){
        if (this.props.revealed === false && this.state.bombClicked === true) {
            this.setState({bombClicked: false})
        }
    }

    render(){
        return (
            <div className={`cell ${this.props.revealed === true ? `revealed` : ''} ${this.state.bombClicked === true ? `bomb` : ''}`}
                id={`${this.props.x}-${this.props.y}`}
                onClick={this.props.gameState === 'new' && this.props.flagged !== true && this.clickedCell}
                onContextMenu={this.props.gameState === 'new' && this.props.revealed !== true && this.clickedCell}
            >
                {this.props.flagged === true && <input type='image' src={flag} />}
                {this.showValue()}
            </div>
        )
    }
}
import React from 'react';
import {emptyToken} from "./GameLoop";

const ClassForX = "x";
const ClassForO = "o";

class Square extends React.Component {

    render() {

        let squareClass = ClassForX;

        if (this.props.value === "O") {
            squareClass = ClassForO;
        }

        if(this.props.winning)
        {
            for (let i = 0; i < this.props.winning.length; i++) {
                if(this.props.winning[i] === this.props.index)
                {
                    squareClass = "winnerSquare";
                    break;
                }
            }
        }
        return (

            <button className="square" onClick={this.props.onClick}>
                <div className={squareClass}>
                    {this.props.value === emptyToken ? "" : this.props.value}
                </div>
            </button>


        );
    }
}

export default Square;
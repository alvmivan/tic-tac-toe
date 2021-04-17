import React from 'react';
import Board from './Board';
import {StatusTracker} from "./StatusTracker";

class Game extends React.Component {

    statusTracker;

    constructor(props) {
        super(props);
        this.statusTracker = new StatusTracker();

        this.state = {
            squares: Array(9).fill(null),
            turnX: true,
            status: "?",
            winning: [] // the winning combination
        }


    }

    gameStatus(squares) {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],

        ]

        for (let i = 0; i < winningLines.length; ++i) {
            const [a, b, c] = winningLines[i];

            // 3 same no null tokens in lines
            if (squares[a] !== null && squares[a] === squares[b] && squares[b] === squares[c]) {
                let state = {...this.state}
                state.winning = [a, b, c]
                this.setState(state)
                return squares[a];
            }

            if (squares.every(sq => sq !== null)) // full of no null tokens
            {
                return "T";//tie
            }
        }
        return "?"//game in progress
    }

    handleClick(i) {
        if (this.state.status !== "?" || this.state.squares[i] !== null) {
            return;
        }

        const squares = this.state.squares.slice();//copy array
        squares[i] = this.getTokenByTurn()
        const status = this.gameStatus(squares);

        let newState = {
            squares,
            status,
            turnX: !this.state.turnX,
        };

        this.statusTracker.statusChange(this.state.squares, newState.squares, this.state.turnX ? "X":"O")

        this.setState(newState);



    }


    getTokenByTurn() {
        return this.state.turnX ? "X" : "O";
    }

    render() {

        const status = this.state.status;
        let statusText;

        if (status === "?") {
            statusText = this.getTokenByTurn()
        } else if (status === "T") {
            statusText = "It's a Tie!"
        } else {
            statusText = "Winner " + status;
        }

        return (
            <div className="game">

                <div className="gameTittle">
                    {"Tic Tac Toe"}
                </div>
                <div/>
                <div className="gameInfo">
                    {statusText}
                </div>
                <div/>
                <Board
                    ends={this.state.status !== "?"}
                    squares={this.state.squares}
                    onClick={i => this.handleClick(i)}
                    winning={this.state.winning}
                />

                <button
                    className={this.state.status === "?" ? "playAgain" : "playAgainBig"}
                    onClick={() => this.setState({
                        squares: Array(9).fill(null),
                        turnX: this.state.winning.length === 0 ? !this.state.turnX : this.state.turnX,
                        // on tie flip turns (cause 9 is odd)
                        // on empty board flip turns
                        // if anyone win, begins the other (keeping turn cause is already flipped)
                        status: "?",
                        winning: []
                    })}>
                    {"Reset"}
                </button>

            </div>
        );
    }
}


export default Game;

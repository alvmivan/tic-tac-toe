import React from 'react';
import Board from './Board';
import {TikTakToeService} from "./TikTakToeService";
import {getText} from "./Local";


export const emptyToken = "-";
export const oToken = "O";
export const xToken = "X";

export const currentPlayingStatus = "?";
export const tieStatus = "T";
export const xWonStatus = "X";
export const oWonStatus = "O";

const classes = {
    playAgain: "playAgain",
    playAgainBig: "playAgainBig",
    gameTittle: "gameTittle",
    gameInfo: "gameInfo",
    game: "game"
}


const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


class Game extends React.Component {

    _tikTakToe;


    constructor(props) {

        super(props);

        this._tikTakToe = new TikTakToeService();

        this.state = {
            squares: Array(9).fill(emptyToken),
            turnX: true,
            status: currentPlayingStatus
        }
    }

    getWinningLine(token) {

        for (let i = 0; i < winningLines.length; i++){
            const line = winningLines[i];
            let [a, b, c] = line;
            let board = this.state.squares;
            if (board[a] === token && board[b] === token && board[c] === token) {
                return line;
            }
        }
        return []
    }

    handleClick(movementIndex) {

        // wait for ai
        if (this.state.waiting) return;
        // only move if playing match
        if (this.state.status !== currentPlayingStatus) return;


        let lastState = this.state;


        this.setState({waiting: true})

        this._tikTakToe.setPlayerMovement(
            this.getTokenByTurn(),
            this.state.squares,
            movementIndex,
            (boardRes, gameStatus) => {
                this.setState({
                    turnX: !this.state.turnX,
                    status: gameStatus,
                    squares: boardRes,
                    waiting: false,
                });
            },
            () => {
                lastState.waiting = false;
                this.setState({waiting: false})
            });
    }

    getTokenByTurn() {
        return this.state.turnX ? xToken : oToken;
    }

    render() {


        const status = this.state.status;
        let statusText;
        let winning = [];
        switch (status) {
            case currentPlayingStatus:
                statusText = this.getTokenByTurn()
                break;
            case tieStatus:
                statusText = getText("tie");
                break;
            default: // not tie or in progress implies someone won
                winning = this.getWinningLine(status);
                statusText = getText("winner", [status]);
                break;
        }

        return (
            <div className={classes.game}>

                <div className={classes.gameTittle}>
                    {getText("tittle")}
                </div>
                <div/>
                <div className={classes.gameInfo}>
                    {statusText}
                </div>
                <div/>
                <Board
                    ends={this.state.status !== currentPlayingStatus}
                    squares={this.state.squares}
                    onClick={i => this.handleClick(i)}
                    winning={winning}
                />

                <button
                    className={this.state.status === tieStatus ? classes.playAgain : classes.playAgainBig}
                    onClick={() => {
                        this.setState({
                            squares: Array(9).fill(emptyToken),
                            turnX: winning.length === 0 ? !this.state.turnX : this.state.turnX,
                            // on tie flip turns (cause 9 is odd)
                            // on empty board flip turns
                            // if anyone win, begins the other (keeping turn cause is already flipped)
                            status: currentPlayingStatus,
                        });
                    }}>
                    {getText("reset")}
                </button>

            </div>
        );

    }
}


export default Game;

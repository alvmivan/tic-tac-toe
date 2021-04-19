import React from 'react';
import Board from './Board';
import {getText} from "./Local";
import {
    currentPlayingStatus, debug,
    emptyToken,
    gameState,
    onPlayerClicks,
    oToken,
    resetGame,
    tieStatus,
    xToken
} from "./GameLoop";
import {SelectDifficulty} from "./SelectDifficulty";


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

    constructor(props) {
        super(props);
        this.setState({...gameState})
        gameState.onChange = () => this.setState({...gameState});
    }

    getWinningLine(token) {

        for (let i = 0; i < winningLines.length; i++) {
            const line = winningLines[i];
            let [a, b, c] = line;
            let board = gameState.squares;
            if (board[a] === token && board[b] === token && board[c] === token) {
                return line;
            }
        }
        return []
    }
    getStatusTextAndWinningArray() {
        let statusText;
        let winning = [];
        switch (gameState.status) {
            case currentPlayingStatus:
                statusText = gameState.turnX ? xToken : oToken
                break;
            case tieStatus:
                statusText = getText("tie");
                break;
            default: // not tie or in progress implies someone won
                winning = this.getWinningLine(gameState.status);
                statusText = getText("winner", [gameState.status]);
                break;
        }
        return {statusText, winning};
    }

    handleClick(movementIndex) {
        onPlayerClicks(movementIndex)
    }

    handleDifficulty(difficulty) {
        gameState.difficulty = difficulty;
        let {_, winning} = this.getStatusTextAndWinningArray();
        resetGame(winning);
    }

    render() {
        let {statusText, winning} = this.getStatusTextAndWinningArray();


        return (
            <div className={classes.game}>
                <SelectDifficulty
                    difficulty={gameState.difficulty}
                    onSelectDifficulty={(d)=>this.handleDifficulty(d)}
                />

                <div className={classes.gameTittle}>
                    {getText("tittle")}
                </div>
                <div/>
                <div className={classes.gameInfo}>
                    {statusText}
                </div>
                <div/>
                <Board
                    ends={gameState.status !== currentPlayingStatus}
                    squares={gameState.squares}
                    onClick={i => this.handleClick(i)}
                    winning={winning}
                />

                <button
                    className={gameState.status === tieStatus ? classes.playAgain : classes.playAgainBig}
                    onClick={() => resetGame(winning)}>
                    {getText("reset")}
                </button>


                <div className={classes.gameInfo}>
                    {debug ? "DEBUG STATE : " + JSON.stringify(gameState, null, 2) : ""}
                </div>

            </div>
        );

    }


}


export default Game;

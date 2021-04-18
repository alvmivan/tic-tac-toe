import {TikTakToeService} from "./TikTakToeService";

export const emptyToken = "-";
export const oToken = "O";
export const xToken = "X";

export const currentPlayingStatus = "?";
export const tieStatus = "T";

const service = new TikTakToeService();

export let debug = false

export const gameState = {
    onChange: undefined,
    difficulty: "mid",
    isPvp: false,
    playerIsX: true,
    turnX: true,
    blockInput: false,
    status: currentPlayingStatus,
    squares: Array(9).fill(emptyToken),
}

export function print(msj) {
    if(!debug) return;
    console.log(msj);
    msj = msj + ""
    gameState.lastLog = gameState.lastLog ? gameState.lastLog + "\n\n" + msj : msj
}

function change() {
    if (gameState.onChange)
        gameState.onChange();
}

function canMoveUser() {
    if (gameState.isPvp) {
        return true;
    }
    return gameState.playerIsX === gameState.turnX;
}

function moveAI() {
    gameState.blockInput = true;
    print("move ai block")
    setTimeout(() => {
        service.setAIMovement(gameState.playerIsX ? oToken : xToken, gameState.squares, gameState.difficulty,
            (boardRes, gameStatus) => {
                gameState.turnX = !gameState.turnX;
                gameState.status = gameStatus;
                gameState.squares = boardRes;
                gameState.blockInput = false;
                print("move ai unlock")
                change();
            },
            () => {
                gameState.blockInput = false;
                change();
            });
    }, 1500);

}

export function onPlayerClicks(movementIndex) {

    if (!canMoveUser()) return;
    if (gameState.status !== currentPlayingStatus) return;
    gameState.blockInput = true;

    service.setPlayerMovement(gameState.turnX ? xToken : oToken, gameState.squares, movementIndex,
        (boardRes, gameStatus) => {
            gameState.turnX = !gameState.turnX;
            gameState.status = gameStatus;
            gameState.squares = boardRes;
            if (gameState.status === currentPlayingStatus) {
                if (!gameState.isPvp) {
                    moveAI();
                }
            } else {
                gameState.blockInput = false;
            }
            change();

        }, (e) => {
            print("some error " + e)
            gameState.blockInput = false;
            change();
        }
    );
}

export function resetGame(winning) {

    let turnX = winning.length === 0 ? !gameState.turnX : gameState.turnX;

    let willMoveAI = turnX !== gameState.playerIsX && !gameState.isPvp;

    gameState.squares = Array(9).fill(emptyToken);
    gameState.turnX = turnX;
    // on tie flip turns (cause 9 is odd)
    // on empty board flip turns
    // if anyone win, begins the other (keeping turn cause is already flipped)
    gameState.status = currentPlayingStatus;
    gameState.waiting = false
    change();
    if (willMoveAI) {
        moveAI();
    }

}









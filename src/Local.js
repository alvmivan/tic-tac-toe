const es = {
    "tie-tittle": "¡Es un empate!",
    "winner-is": "El ganador es {0}",
    "game-tittle": "Ta Te Ti",
    "reset": "Nuevo Juego",
}

const en = {
    "tie-tittle": "It's a Tie!",
    "winner-is": "The winner is {0}!",
    "game-tittle": "Tic Tac Toe",
    "reset": "Reset",
}

const currentLanguage = navigator.language.slice(0, 2) === "es" ? es : en;


export function getText(key, params = []) {

    if (!params) {
        params = []
    }

    let value = currentLanguage[key];

    for (let i = 0; i < params.length; i++) {
        let param = params[i];
        value = value.replaceAll("{" + i + "}", param);
    }

    return value;

}


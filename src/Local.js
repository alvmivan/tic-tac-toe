const es = {
    "tie": "¡Es un empate!",
    "winner": "El ganador es {0}",
    "tittle": "Ta Te Ti",
    "reset": "Nuevo Juego",
    "easy" : "Fácil",
    "mid" : "Intermedio",
    "hard" : "Difícil",
}

const en = {
    "tie": "It's a Tie!",
    "winner": "The winner is {0}!",
    "tittle": "Tic Tac Toe",
    "reset": "Reset",
    "easy" : "Easy",
    "mid" : "Medium",
    "hard" : "Hard",
}

const currentLanguage = navigator.language.slice(0, 2) !== "es" ? en : es;


export function getText(key, params = []) {

    if (!params) {
        params = []
    }

    params = [params].flat();

    let value = currentLanguage[key] ?? key;

    for (let i = 0; i < params.length; i++) {
        let param = params[i];
        value = value.replaceAll("{" + i + "}", param);
    }

    return value;

}


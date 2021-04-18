import PengineClient from "./PengineClient";

export class TikTakToeService {

    pengine;

    constructor() {
        this.pengine = new PengineClient();
    }

    replaceOldElements(list, oldElements, newElem) {
        for (const oldElem of oldElements) {
            for (let i = 0; i < list.length; i++) {
                if (list[i] === oldElem) {
                    list[i] = newElem;
                }
            }
        }
    }

    setPlayerMovement(aiPiece, previousState, playerMovement, onComplete, onError) {

        this.replaceOldElements(previousState, [null, undefined, ""], "-");

        const squaresS = PengineClient.stringify(previousState);
        const aiToken = PengineClient.stringify(aiPiece);

        console.log("prev state : " + squaresS + " ai token : " + aiToken)

        const queryS = `put(${aiToken},${playerMovement},${squaresS},BoardRes),gameStatus(BoardRes, Status)`;

        this.pengine.query(queryS, (success, response) => {

            console.log("response : " + response)
            if (success) {
                let boardRes = response['BoardRes'];
                let gameStatus = response['Status'];
                onComplete(boardRes, gameStatus)
            } else {
                onError();
            }
        });
    }

}
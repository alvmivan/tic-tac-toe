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

    setAIMovement(aiTeam, previousState, difficulty,onComplete, onError) {

        this.replaceOldElements(previousState, [null, undefined, ""], "-");

        const squaresS = PengineClient.stringify(previousState);
        const aiToken = PengineClient.stringify(aiTeam);


        console.log("prev state : " + squaresS + " ai token : " + aiToken)

        //getAIMovement(Board, Team, BoardOut, Difficulty)
        const queryS = `getAIMovement(${squaresS},${aiToken},BoardRes,"${difficulty}"), gameStatus(BoardRes, Status)`;

        console.log(queryS)

        this.pengine.query(queryS, (success, response) => {

            console.log("response : " + JSON.stringify(response))
            if (success) {
                let boardRes = response['BoardRes'];
                let gameStatus = response['Status'];
                onComplete(boardRes, gameStatus)
            } else {
                onError();
            }
        });
    }

    setPlayerMovement(team, previousState, movement, onComplete, onError) {

        this.replaceOldElements(previousState, [null, undefined, ""], "-");

        const squaresS = PengineClient.stringify(previousState);
        const teamToken = PengineClient.stringify(team);

        console.log("prev state : " + squaresS + " ai token : " + teamToken)

        const queryS = `put(${teamToken},${movement},${squaresS},BoardRes),gameStatus(BoardRes, Status)`;

        this.pengine.query(queryS, (success, response) => {

            console.log("response : " + JSON.stringify(response))
            if (success) {
                let boardRes = response['BoardRes'];
                let gameStatus = response['Status'];
                onComplete(boardRes, gameStatus)
            } else {
                onError(response);
            }
        });
    }

}
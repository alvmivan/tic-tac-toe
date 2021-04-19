import ReactDOM from 'react-dom';
import {getText} from "./Local";
import React, { useRef, useLayoutEffect, useState } from "react";

const difficultyItemClass = "difficultyItem";
const difficultySelectedClass = "difficultyItemSelected";

export class SelectDifficulty extends React.Component {


    render() {

        const easyDifficultyClass = this.props.difficulty === "easy" ? difficultySelectedClass :  difficultyItemClass;
        const midDifficultyClass = this.props.difficulty === "mid" ? difficultySelectedClass :  difficultyItemClass;
        const hardDifficultyClass = this.props.difficulty === "hard" ? difficultySelectedClass :  difficultyItemClass;

        return (
            <div className="difficultyPanel">
                <button
                    id = "easy-button"
                    className={easyDifficultyClass}
                    onClick={() => this.props.onSelectDifficulty("easy")}>
                    {getText("easy")}
                </button>
                <button
                    id = "mid-button"
                    className={midDifficultyClass}
                    onClick={() => this.props.onSelectDifficulty("mid")}>
                    {getText("mid")}
                </button>
                <button
                    id = "hard-button"
                    className={hardDifficultyClass}
                    onClick={() => this.props.onSelectDifficulty("hard")}>
                    {getText("hard")}
                </button>
            </div>
        );
    }

}
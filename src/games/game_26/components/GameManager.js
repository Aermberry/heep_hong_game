import LocalRepository from "../repository/LocalRepository";
import Phaser from 'phaser'
import { GameSceneStatus } from "./GameSceneStatus";
import GameModel from "../game_model/Model";

export default class GameManager {

    constructor() {

        this.localRepository = new LocalRepository();
        this.questionNumberList = [];
        this.eggColors = [];
        this.gameSceneStatus = GameSceneStatus.NormalStatus;

        if (!GameManager.instance) {
            GameManager.instance = this;
        }

        return GameManager.instance;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new GameManager();
        }

        return this.instance;
    }

    async initGameData() {
        localStorage.clear();
        // localStorage.setItem('gamePlayTotal', JSON.stringify(5));

        if (this.questionNumberList.length > 0) {
            console.log("data 不为空");
            this.questionNumberList = []
        }

        console.log(this.questionNumberList)

        let questions = await this.localRepository.loadData();
        this.eggColors = await this.localRepository.loadEggColors();

        for (const key in questions) {
            localStorage.setItem(key, JSON.stringify(questions[key]));
            this.questionNumberList.push(key);
        }

        localStorage.setItem('questionNumberList', JSON.stringify(Array.from(new Set(this.questionNumberList))));
    }

    updateGameQuestionNumberList(questionIndex) {

        this.questionNumberList.splice(this.questionNumberList.indexOf(questionIndex), 1);
        console.log(this.questionNumberList)

        localStorage.removeItem('questionNumberList');
        localStorage.setItem('questionNumberList', JSON.stringify(this.questionNumberList));

        if (localStorage.getItem('gameChance') != null) {

            localStorage.removeItem('gameChance');
        }

        if (localStorage.getItem('errorQuestionIndex') != null) {
            localStorage.removeItem('errorQuestionIndex')
        }

    }

    getGameSuccess(callback) {
        GameModel.questionCount--;

        callback(this._isLastQuestion());

    }

    _isLastQuestion() {
        return GameModel.questionCount == 0;
    }

    getGameFail(index, gameErrorCallback) {

        localStorage.setItem('errorQuestionIndex', JSON.stringify(index));
        GameModel.currentQuestionErrorCount++;

        let isFirstError = true;

        this.gameSceneStatus = GameSceneStatus.RetryStatus;

        if (GameModel.currentQuestionErrorCount == 2) {

            isFirstError = false;

            GameModel.questionCount--;

            this.gameSceneStatus = GameSceneStatus.NormalStatus;

            this.questionNumberList.splice(this.questionNumberList.indexOf(index), 1);

            localStorage.removeItem('questionNumberList');
            localStorage.setItem('questionNumberList', JSON.stringify(this.questionNumberList));

            localStorage.removeItem('errorQuestionIndex');

            this.restCurrentQuestionErrorCount();
        }


        gameErrorCallback(isFirstError, this._isLastQuestion() && !isFirstError);

    }

    generateGameQuestionIndex() {
        return Phaser.Math.RND.pick(this.questionNumberList);
    }


    getRandomColorEgg() {

        const egg = Phaser.Math.RND.pick(this.eggColors)
        this.eggColors.splice(this.eggColors.indexOf(egg), 1);

        return egg;
    }

    restCurrentQuestionErrorCount() {
        GameModel.currentQuestionErrorCount = 0;
    }


    getGameSceneStatus() {
        return this.gameSceneStatus;
    }
}
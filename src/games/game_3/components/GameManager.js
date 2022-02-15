
import Phaser from 'phaser'
import GameModel from "../game_mode/GameModel";
import { GameSceneStatus } from "./GameSceneStatus";
import QuestionDataLocalRepository from '../repository/QuestionDataLocalRepository';

export default class GameManager {

    constructor() {

        this.questionDataLocalRepository = new QuestionDataLocalRepository();
        this.questionNumberList = [];
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
        // localStorage.setItem('gamePlayTotal', JSON.stringify(3));
        GameModel.init();

        if (this.questionNumberList.length > 0) {
            console.log("data 不为空");
            this.questionNumberList = []
        }

        console.log(this.questionNumberList)

        let questions = await this.questionDataLocalRepository.loadData();

        for (const key in questions) {
            localStorage.setItem(key, JSON.stringify(questions[key]));
            this.questionNumberList.push(key);
        }

        localStorage.setItem('questionNumberList', JSON.stringify(Array.from(new Set(this.questionNumberList))));
    }

    _updateGameQuestionNumberList(questionIndex) {

        this.questionNumberList.splice(this.questionNumberList.indexOf(questionIndex), 1);
     
        localStorage.setItem('questionNumberList', JSON.stringify(this.questionNumberList));


        if (localStorage.getItem('errorQuestionIndex') != null) {
            localStorage.removeItem('errorQuestionIndex')
        }

    }

    getGameSuccess(questionIndex,callback) {
        GameModel.questionCount--;
        
        this._updateGameQuestionNumberList(questionIndex)
        this.restCurrentQuestionErrorCount();

        callback(this._isLastQuestion());

    }

    _isLastQuestion() {
        return GameModel.questionCount == 0;
    }

    getGameFail(questionIndex, callback) {

        localStorage.setItem('errorQuestionIndex', JSON.stringify(questionIndex));
        GameModel.currentQuestionErrorCount++;

        let isFirstError = true;

        this.gameSceneStatus = GameSceneStatus.RetryStatus;

        if (GameModel.currentQuestionErrorCount == GameModel.eachQuestionChance) {

            isFirstError = false;

            GameModel.questionCount--;

            this.gameSceneStatus = GameSceneStatus.NormalStatus;

            this._updateGameQuestionNumberList(questionIndex)

            this.restCurrentQuestionErrorCount();
        }


        callback(isFirstError, this._isLastQuestion() && !isFirstError);

    }

    generateGameQuestionIndex() {
        return Phaser.Math.RND.pick(this.questionNumberList);
    }


    restCurrentQuestionErrorCount() {
        GameModel.currentQuestionErrorCount = 0;
    }


    getGameSceneStatus() {
        return this.gameSceneStatus;
    }


}
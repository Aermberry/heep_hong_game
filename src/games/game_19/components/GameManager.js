import LocalRepository from "../repository/LocalRepository";
import Phaser from 'phaser'

export default class GameManager {

    constructor() {

        this.localRepository = new LocalRepository();
        this.questionNumberList = [];
        this.isLastQuestion = false;

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
        localStorage.setItem('gamePlayTotal', JSON.stringify(5));

        if (this.questionNumberList.length > 0) {
         
            this.questionNumberList = []
        }

        let questions = await this.localRepository.loadData();

        for (const key in questions) {
            localStorage.setItem(key, JSON.stringify(questions[key]));
            this.questionNumberList.push(key);
        }

        localStorage.setItem('questionNumberList', JSON.stringify(Array.from(new Set(this.questionNumberList))));
    }

    updateGameQuestionNumberList(questionIndex) {
        this.questionNumberList.splice(this.questionNumberList.indexOf(questionIndex), 1);

        localStorage.removeItem('questionNumberList');
        localStorage.setItem('questionNumberList', JSON.stringify(this.questionNumberList));

        if (localStorage.getItem('gameChance') != null) {

            localStorage.removeItem('gameChance');
        }

        if (localStorage.getItem('errorQuestionIndex') != null) {
            localStorage.removeItem('errorQuestionIndex')
        }

    }

    updateGamePlayTotal(callback) {

        let gamePlayTotal = JSON.parse(localStorage.getItem('gamePlayTotal'));
        let isLastQuestion = this.isLastQuestion = gamePlayTotal != 1;

        if (isLastQuestion) {
            localStorage.setItem('gamePlayTotal', JSON.stringify(gamePlayTotal - 1));
        }

        if (callback != null) {
            callback(isLastQuestion);
        }

    }

    setGameQuestionError(index, gameErrorCallback) {

        localStorage.setItem('errorQuestionIndex', JSON.stringify(index));
        let gameChance = JSON.parse(localStorage.getItem('gameChance'));
        let gamePlayTotal = JSON.parse(localStorage.getItem('gamePlayTotal'));
        let isFirstError = true;
        let isLastQuestion = gamePlayTotal == 1;


        if (gameChance == null) {
            localStorage.setItem('gameChance', JSON.stringify(true))
        } else {
            isFirstError = false;
            localStorage.removeItem('gameChance');

            if (!isLastQuestion) {
                localStorage.setItem('gamePlayTotal', JSON.stringify(gamePlayTotal - 1));
            }

            this.questionNumberList.splice(this.questionNumberList.indexOf(index), 1);

            localStorage.removeItem('questionNumberList');
            localStorage.setItem('questionNumberList', JSON.stringify(this.questionNumberList));

            localStorage.removeItem('errorQuestionIndex');
        }

        gameErrorCallback(isFirstError, isLastQuestion && !isFirstError);

    }

    generateGameQuestionIndex() {
        return Phaser.Math.RND.pick(this.questionNumberList);
    }




}
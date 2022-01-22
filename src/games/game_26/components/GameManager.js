import QuestionDataLocalRepository from "../repository/QuestionDataLocalRepository";
import Phaser from 'phaser'
import EggColorLocalRepository from "../repository/EggColorLocalRepository";

export default class GameManager {

    constructor() {

        this.questionDataLocalRepository = new QuestionDataLocalRepository();
        this.eggColorDataLocalRepository = new EggColorLocalRepository();
        this.questionNumberList = [];
        this.eggColors = [];

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
            console.log("data 不为空");
            this.questionNumberList = []
        }

        console.log(this.questionNumberList)

        let questions = await this.questionDataLocalRepository.loadData();
        this.eggColors = Array.from(await this.eggColorDataLocalRepository.loadData());

        console.log("eggColors:%o", this.eggColors);

        for (const key in questions) {
            localStorage.setItem(key, JSON.stringify(questions[key]));
            this.questionNumberList.push(key);
        }

        localStorage.setItem('questionNumberList', JSON.stringify(Array.from(new Set(this.questionNumberList))));
    }

    updateGameQuestionNumberList(questionIndex) {
        console.log({
            questionIndex
        })
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

    updateGamePlayTotal(callback) {

        let gamePlayTotal = JSON.parse(localStorage.getItem('gamePlayTotal'));
        let isLastQuestion = gamePlayTotal != 1;

        if (isLastQuestion) {
            localStorage.setItem('gamePlayTotal', JSON.stringify(gamePlayTotal - 1));
        }

        callback(isLastQuestion);

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


    getRandomColorEgg() {

        const egg = Phaser.Math.RND.pick(this.eggColors)
        this.eggColors.splice(this.eggColors.indexOf(egg), 1);

        return egg;
    }




}
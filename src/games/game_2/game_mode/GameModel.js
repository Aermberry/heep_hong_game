export default class GameModel {

    static questionCount;
    static eachQuestionChance;
    static currentQuestionErrorCount;

    static init() {
        this.currentQuestionErrorCount = 0;
        this.questionCount = 3
        this.eachQuestionChance = 2;
    }
}
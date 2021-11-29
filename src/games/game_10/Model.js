export default class Model {

    constructor() {
        this._gameData = require('./assets/json/game_data.json');

    }

    gameData(level) {
        return this._gameData[`level${level}`];
    }

}
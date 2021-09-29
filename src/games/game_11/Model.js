export default class Model {

    constructor() {
        this._gameStage = null;
        this._gameIndex = 0;
        this._gameData = require('./assets/json/game_data.json')

    }

    get gameStage() {
        if(typeof this._gameStage === 'undefined' || this._gameStage == null) return this._gameData[0].gameStage;
        return this._gameStage;
    }

    set gameStage(stage) {

        this._gameStage = stage;
        // this._gameData.some((gameData, ind)=> {
        //     if(gameData.gameStage == stage) return this._gameIndex = ind;

        // });

    }


}
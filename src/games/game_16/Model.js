export default class Model {

    constructor() {
        this._gameStage = null;
        this._gameIndex = 0;
        this._gameData = JSON.parse(require('./assets/json/game_data.json'))

    }

    get gameStage() {
        return this._gameStage;
    }



    set gameStage(stage) {
        
        this._gameStage = stage;
        this._gameData.some((gameData, ind)=> {
            if(gameData.gameStage == stage) return this._gameIndex = ind;

        });


    }

    get gameAnswers() {

        if(this._gameStage == null) {

            console.log('Game Stage void, set to default stage.')
            
            return [...this._gameData[0].answers];

        }

        return [...this._gameData[this._gameIndex].answers];

    }

    get gameItems() {

        if(this._gameStage == null) {

            console.log('Game Stage void, set to default stage.')
            
            return [...this._gameData[0].gameData];

        }

        return [...this._gameData[this._gameIndex].gameData];

    }

}
export default class Model {

    constructor() {
        this._routeId = null;
        this._gameData = require('./assets/json/game_data.json')
    }

    set gameId(routeId) {
        this._routeId = routeId;
        return this._gameData['gameData' + this._routeId];
    }

    get gameData() {
        return this._gameData['gameData' + this._routeId];
    }

    get game() {
        return this._routeId;
    }

}
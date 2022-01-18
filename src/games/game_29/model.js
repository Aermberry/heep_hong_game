export default class Model {

    constructor() {
        this._routeId = null;
        this._gameData = null;

    }

    set gameId(routeId) {
        this._routeId = routeId;
        this._gameData = require(`./assets/json/game_data${routeId}.json`)
    }

    get gameData() {
        return this._gameData;
    }

    get game() {
        return this._routeId
    }

}
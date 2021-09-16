export default class Model {

  constructor() {
      this._gameStage = null;
      this._gameIndex = 0;
      this._gameData = require('./assets/json/game_data.json');
  }

  get gameStage() {
      return this._gameStage;
  }

  set gameStage(stage) {

      this._gameStage = stage;
      console.log(this._gameData)
      this._gameData.some((gameData, ind)=> {
          if(gameData.gameStage == stage) return this._gameIndex = ind;

      });


  }

  get gameAnswers() {

      if(this._gameStage == null) {

          console.log('Game Stage void, set to default stage.')
          
          return [...this._gameData.items];

      }

      return [...this._gameData.items];

  }

  // get gameItems() {

  //     if(this._gameStage == null) {

  //         console.log('Game Stage void, set to default stage.')
          
  //         return [...this._gameData[0].items];

  //     }

  //     return [...this._gameData[this._gameIndex].items];

  // }

}
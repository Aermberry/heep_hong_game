export default class Model {
  constructor() {
    this._world = {}
  }

  set world(value){
    this._world = value
  }

  get world(){
    return this._world
  }

}

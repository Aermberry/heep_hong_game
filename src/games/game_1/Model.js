export default class Model {
  constructor() {
    this._character = {};
    this._level = 1;
  }

  set character(value){
    this._character = value;
  }

  get character(){
    return this._character;
  }

  set level(value){
    this._level =  parseInt(value);
  }

  get level(){
    return this._level;
  }

}

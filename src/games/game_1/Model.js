export default class Model {
  constructor() {
    this._character = {};
    this._level = 1;
    this._selectLimit = 3;
  }

  set character(value){
    this._character = value;
  }

  get character(){
    return this._character;
  }

  set level(value){
    this._level =  parseInt(value);
    if(value > 1){
      this._selectLimit = 4
    }else{
      this._selectLimit = 3
    }
  }

  get level(){
    return this._level;
  }

  get selectLimit(){
    return this._selectLimit;
  }

}

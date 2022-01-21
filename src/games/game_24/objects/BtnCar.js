import BasicCarBtn  from './BasicCarBtn';

export default class BtnCar extends BasicCarBtn {
  constructor(scene,x,y,completeAnswerAnimation){
    super(scene, x, y);

    let sprite =  scene.add.sprite(0, 0, 'btn_car')
    sprite.setDisplaySize(320,140)
    this.create(sprite,this.onClick.bind(this,completeAnswerAnimation))
  }

  onClick(completeAnswerAnimation){
    completeAnswerAnimation()
  }
}
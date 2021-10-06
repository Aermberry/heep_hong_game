import BasicBtn  from './BasicBtn'

export default class ToLeftBtn extends BasicBtn {
  constructor(scene,x,y,onClickHandler){
    super(scene, x, y)

    this.onClickHandler = onClickHandler

    let sprite =  scene.add.sprite(0, 0, 'btn_lt')
    this.create(sprite,this.onClick.bind(this))

  }

  onClick(){
    this.onClickHandler()
  }
}
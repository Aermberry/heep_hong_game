import BasicBtn  from './BasicBtn';

export default class SpeakerBtn extends BasicBtn {
  constructor(scene,x,y,musicPause){
    super(scene, x, y)
    this.scene = scene;
    this.musicPause = musicPause;
    let sprite =  scene.add.sprite(0, 0, 'speakerBtnOff')
    sprite.setScale(0.8)
    this.create(sprite,this.onClick.bind(this))
  }

  onClick(){
    this.musicPause()
  }
}
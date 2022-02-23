import BasicBtn  from './BasicBtn';

export default class SpeakerBtnOff extends BasicBtn {
  constructor(scene,x,y,musicPause){
    super(scene, x, y)
    this.scene = scene;
    this.musicPause = musicPause;
    let sprite =  scene.add.sprite(0, 0, 'speakerBtn')
    sprite.setScale(0.8)
    this.create(sprite,this.onClick.bind(this))
  }

  onClick(){
    this.musicPause()
  }
}
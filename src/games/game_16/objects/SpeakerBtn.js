import BasicBtn  from './BasicBtn';

export default class SpeakerBtn extends BasicBtn {
  constructor(scene,x,y,musicPause){
    super(scene, x, y)
    this.scene = scene;
    this.flag = true;
    this.musicPause = musicPause;
    this.sprite =  scene.add.sprite(0, 0, 'speakerBtn')
    this.create(this.sprite,this.onClick.bind(this))
  }

  onClick(){
    this.flag = !this.flag;
    this.sprite.setTexture(this.flag == true ? 'speakerBtn' : 'offSpeakerBtn');
    this.musicPause()
  }
}

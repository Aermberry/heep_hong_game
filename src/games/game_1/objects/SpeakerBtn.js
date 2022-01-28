import BasicBtn from './BasicBtn';

export default class SpeakerBtn extends BasicBtn {
  constructor(scene,x,y, musicPause){
    super(scene, x, y);

    this.scene = scene;
    this.musicPause = musicPause;

    this.sprite =  scene.add.sprite(0, 0, this.scene.model.bgMusicPlaying ? 'speakerBtn' : 'offSpeakerBtn')
    this.create(this.sprite,this.onClick.bind(this))


  }

  onClick(){
    this.sprite.setTexture(this.scene.model.bgMusicPlaying ? 'offSpeakerBtn' : 'speakerBtn');
    this.musicPause()
  }
}

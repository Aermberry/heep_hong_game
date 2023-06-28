import BasicBtn from './BasicBtn';

export default class SpeakerBtn extends BasicBtn {
  constructor(scene, x, y, musicPause) {
    super(scene, x, y)
    this.scene = scene;
    this.musicPause = musicPause;
    this.sprite = scene.add.sprite(0, 0, this.scene.stopAll ? 'offSpeakerBtn' : 'speakerBtn')
    this.sprite.setScale(0.8)
    this.create(this.sprite, this.onClick.bind(this))
  }

  onClick() {
    this.sprite.setTexture(this.scene.stopAll ? 'speakerBtn' : 'offSpeakerBtn');
    this.musicPause()
  }
}

import BasicBtn from './BasicBtn';

export default class StartBtn extends BasicBtn {
  constructor(scene, x, y, children) {
    super(scene, x, y, children)

    let sprite = scene.add.sprite(0, 0, 'strBtn')
    this.create(sprite, this.onClick.bind(this))
    this.goFullscreenOnClick()
  }

  onClick() {
    if (typeof this.scene.game.canvas.requestFullscreen === 'function') {
      this.scene.game.canvas.requestFullscreen()
    }
    this.scene.scene.start('Game', {
      level: 1,
      pastProblems: []
    })

  }
}
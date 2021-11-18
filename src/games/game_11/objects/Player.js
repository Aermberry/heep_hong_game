import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, x, y, playerSprite) {
        super(scene, x, y, [])
        this.playerSprite = playerSprite
    }

    changeLeft(x, y = null) {
        this.playerSprite.toLeft()
    }

    changeRight(x, y = null) {
        this.playerSprite.toRight()
    }

    

}
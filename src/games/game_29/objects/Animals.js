import Phaser from "phaser";
export default class Animals extends Phaser.GameObjects.Sprite {
    constructor(scene, { x, y, textureName }, type) {
        super(scene, x, y, textureName)
        this.type = type;
        this.setInteractive();
        this.setScale(0.8);
        this.input.dropZone = true;
    }

    toggleZoneFrame(num) {
        this.setFrame(num)
    }

    showError(pointer) {
       let showError = this.scene.add.sprite(pointer.x + 100, pointer.y - 100, 'an_n');
       setTimeout(() => {
          showError.destroy(); 
       }, 500);
    }

    highlight() {
        this.setFrame(2)
    }

}
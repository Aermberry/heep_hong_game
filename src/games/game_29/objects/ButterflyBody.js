import Phaser from "phaser";
export default class ButterflyBody {
    constructor(scene, zoneSprite = { x: 0, y: 0, textureName: "" }, bodySprite = { x: 0, y: 0, textureName: '' }, type) {
        this.scene = scene;
        this.bodySprite = this.scene.add.sprite(bodySprite.x, bodySprite.y, bodySprite.textureName).setOrigin(0);
        this.zoneSprite = new ButterflyZone(scene, zoneSprite, type)
    }

    get children() {
        return [this.bodySprite, this.zoneSprite]
    }

    highlight() {
        this.zoneSprite.destroy()
        this.bodySprite.setFrame(1)
    }

}

class ButterflyZone extends Phaser.GameObjects.Sprite {
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

}
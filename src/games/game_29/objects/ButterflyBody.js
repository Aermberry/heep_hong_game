import Phaser from "phaser";
export default class ButterflyBody {
    constructor(scene, zoneSprite = { x: 0, y: 0, textureName: "" }, bodySprite = { x: 0, y: 0, textureName: '' }, type) {
        this.scene = scene;
        this.highlightFlag = false;
        // this.bodySprite = this.scene.add.sprite(bodySprite.x, bodySprite.y, bodySprite.textureName).setOrigin(0);
        this.bodySprite = new ButterflyZone(scene, bodySprite, type, this.toggleFrame.bind(this)).setOrigin(0).setScale(1);
        this.zoneSprite = new ButterflyZone(scene, zoneSprite, type, this.toggleFrame.bind(this))
    }

    get children() {
        return [this.bodySprite, this.zoneSprite]
    }

    highlight() {
        this.highlightFlag = true;
        this.zoneSprite.destroy()
        this.bodySprite.setFrame(1)
    }

    toggleFrame(num) {
        if(!this.highlightFlag){
            this.zoneSprite.setFrame(num)
            this.bodySprite.setFrame(num)
        }
    }

}

class ButterflyZone extends Phaser.GameObjects.Sprite {
    constructor(scene, { x, y, textureName }, type, toggleFrame) {
        super(scene, x, y, textureName)
        this.type = type;
        this.toggleFrame = toggleFrame;
        this.setInteractive();
        this.setScale(0.8);
        this.input.dropZone = true;
    }

    // toggleZoneFrame(num) {
    //     this.setFrame(num)
    // }

    toggleZoneFrame(num) {
        this.toggleFrame(num);
    }

    showError(pointer) {
        let showError = this.scene.add.sprite(pointer.x + 100, pointer.y - 100, 'an_n');
        setTimeout(() => {
            showError.destroy();
        }, 500);
    }

}
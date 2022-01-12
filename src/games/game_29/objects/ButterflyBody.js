export default class ButterflyBody {
    constructor(scene, zoneSprite = { x: 0, y: 0, textureName: "" }, bodySprite = { x: 0, y: 0, textureName: '' }, type) {
        this.scene = scene;
        this.bodySprite = this.scene.add.sprite(bodySprite.x, bodySprite.y, bodySprite.textureName).setOrigin(0);
        this.zoneSprite = this.scene.add.sprite(zoneSprite.x, zoneSprite.y , zoneSprite.textureName);
        this.zone = this.scene.add.zone(this.zoneSprite.x, this.zoneSprite.y, this.zoneSprite.width, this.zoneSprite.height)
            .setRectangleDropZone(this.zoneSprite.width, this.zoneSprite.height);
        this.zone.type = type;
    }

    get children() {
        return [this.bodySprite, this.zoneSprite, this.zone]
    }

    highlight() {
        this.bodySprite.setFrame(1)
    }


} 
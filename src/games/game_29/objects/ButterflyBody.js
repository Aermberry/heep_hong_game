export default class ButterflyBody {
    constructor(scene, zoneSprite = { x: 0, y: 0, textureName: "" }, bodySprite = { x: 0, y: 0, textureName: '' }, type) {
        this.scene = scene;
        this.bodySprite = this.scene.add.sprite(bodySprite.x, bodySprite.y, bodySprite.textureName).setOrigin(0);
        this.zoneSprite = this.scene.add.sprite(zoneSprite.x, zoneSprite.y, zoneSprite.textureName).setOrigin(0);
        this.zone = this.scene.add.zone(this.zoneSprite.x, this.zoneSprite.y, this.zoneSprite.width, this.zoneSprite.height)
            .setRectangleDropZone(this.zoneSprite.width, this.zoneSprite.height);
        this.zone.type = type;
        this.listen()
        return [this.bodySprite, this.zoneSprite]
    }

    listen() {
        let self = this;
        let text = '测试';
        let sprite = self.scene.add.text(0, 0, text, {
            fontSize: '40px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        })
        self.scene.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone == self.zone) {
                text = self.zone.type;
                sprite.setText(text)
            }
        })
    }


} 
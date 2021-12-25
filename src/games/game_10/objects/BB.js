
export default class Bb {

    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
    }

    destroy() {
        if (this.bb && this.pack_market) {
            this.bb.destroy();
            this.pack_market.destroy();
        }
    }

    play() {
        let self = this;
        this.bb = this.scene.add.sprite(this.x, this.y, 'bb').setDepth(1000);
        this.music = this.scene.sound.add('bubble_hints');
        this.music.play();
        this.bb.play('bb')
        this.bb.on('animationcomplete', () => {
            self.addMarket();
        });
    }

    addMarket() {
        this.pack_market = this.scene.add.sprite(this.x - 100, this.y - 100, this.scene.currentLevel == 1 ?
            'bsk' : this.scene.currentLevel == 2 ? 'bag' : 'bkp').setDepth(1001);
    }

}
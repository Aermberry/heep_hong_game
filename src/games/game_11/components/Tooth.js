import Phaser from 'phaser'

export default class Tooth extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y);

        scene.add.existing(this);

        this.add(
            [scene.make.text({
                x: 0,
                y: 0,
                text: 'dsds',
                style: {
                    color: 'red',
                    fontSize: '64px'
                }
            }).setDepth(8)]
        )
    }
}
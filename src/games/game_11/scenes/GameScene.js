import BasicScene from "./BasicScene"

export default class GameScene extends BasicScene {


    constructor () {
        super('Game');

        // this.dataModal = this.sys.game.globals.model;

    }

    init() {

        this.dataModel = this.sys.game.globals.model;

        this.anims.create({
            key: 'road',
            repeat: -1,
            frames: this.anims.generateFrameNames('road', { prefix: 'road_move', start: 0, end: 5, zeroPad: 4 }),
        });

    }

    preload() {

        const imageFiles = {
            'scene1_1': require('../assets/images/stage1/scene1_1.png'),
            'scene1_2': require('../assets/images/stage1/scene1_2.png'),
            'scene1_box': require('../assets/images/stage1/scene1_box.png')
        }

        this.preloadFromArr({
            img: imageFiles
        })

    }

    create() {

        super.create()
// console.log('getColWidth', this.getColWidth(1), this.widthBlock, this.heightBlock)
//         this.add.image(0, 0, 'scene1_1')
//         this.add.image(0, 0, 'scene1_2')
        // this.add.image(0, 0, 'scene1_box')

        let backGround = this.add.image(this.getColWidth(6), this.getRowHeight(3), 'scene1_1')
        let foreGround = this.add.image(this.getColWidth(0), this.getRowHeight(4), 'scene1_2')
        let road = this.add.sprite(this.getColWidth(6), this.getRowHeight(9.4), 'road')


        // this.add.image(this.getColWidth(6), this.getRowHeight(6), 'scene1_box')

        foreGround.setOrigin(0)
        backGround.setOrigin(0.5)
        road.setOrigin(0.5)

        road.play('road')

        // let gameStage = this.dataModal.gameStage
        // console.log('gameStage', gameStage)

    }

}
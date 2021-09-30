import BasicScene from "./BasicScene"
import Truck from "../objects/players/Truck"

export default class GameScene extends BasicScene {


    constructor () {
        super('Game');

        // this.dataModal = this.sys.game.globals.model;
        this.cursorKeys = null
        this.playerOnLeft = true

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

        const atlasFiles = {
            'truck': { img: require('../assets/anims/stage1/truck.png'), data: require('../assets/anims/stage1/truck.json')}
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
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

        this.truck = new Truck(this, this.getColWidth(4.5), this.getRowHeight(9.5))

        this.add.existing(this.truck)




        this.cursorKeys = this.input.keyboard.createCursorKeys()

        


        // let gameStage = this.dataModal.gameStage
        // console.log('gameStage', gameStage)

    }


    update() {

        if(this.cursorKeys.left.isDown && !this.playerOnLeft) {
            console.log('left')
            this.playerOnLeft = true
            this.truck.toLeft(this.truck.x - 500)

        }

        if(this.cursorKeys.right.isDown && this.playerOnLeft) {
            console.log('right')
            this.playerOnLeft = false
            this.truck.toRight(this.truck.x + 500)

        }

    }

}
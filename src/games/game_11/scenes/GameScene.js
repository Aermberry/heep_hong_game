import BasicScene from "./BasicScene"
import Truck from "../objects/players/Truck"
import Scene1Block from "../objects/targets/Scene1Block"

export default class GameScene extends BasicScene {


    constructor() {
        super('Game');

        // this.dataModal = this.sys.game.globals.model;
        this.cursorKeys = null
        this.playerOnLeft = true
        this.totalSocre = 0

    }

    init() {

        this.roadBlock = null

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
            'scene1_box': require('../assets/images/stage1/scene1_box.png'),
        }

        const atlasFiles = {
            'truck': { img: require('../assets/anims/stage1/truck.png'), data: require('../assets/anims/stage1/truck.json') },
            'scene1_correct': { img: require('../assets/anims/stage1/right.png'), data: require('../assets/anims/stage1/right.json') },
            'scene1_wrong': { img: require('../assets/anims/stage1/wrong.png'), data: require('../assets/anims/stage1/wrong.json') }
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        })
        

    }

    create() {

        super.create()


        let backGround = this.add.image(this.getColWidth(6), this.getRowHeight(3), 'scene1_1')
        let foreGround = this.add.image(this.getColWidth(0), this.getRowHeight(4), 'scene1_2')
        let road = this.add.sprite(this.getColWidth(6), this.getRowHeight(9.4), 'road')

        backGround.setDepth(0)
        foreGround.setDepth(2)
        road.setDepth(3)


        // this.add.image(this.getColWidth(6), this.getRowHeight(6), 'scene1_box')

        foreGround.setOrigin(0)
        backGround.setOrigin(0.5)
        road.setOrigin(0.5)

        road.play('road')

        this.player = new Truck(this, this.getColWidth(4.5), this.getRowHeight(9.5))

        this.player.setDepth(5)

        this.add.existing(this.player)


        this.cursorKeys = this.input.keyboard.createCursorKeys()


        this.recurringAnswerBlock([
            {answers:['A', 'B'], correctAnswer: 'A'},
            {answers:['A', 'B'], correctAnswer: 'A'},
            {answers:['A', 'B'], correctAnswer: 'B'},
            {answers:['A', 'B'], correctAnswer: 'A'},
            {answers:['A', 'B'], correctAnswer: 'B'}
        ])

    }


    update() {

        if (this.cursorKeys.left.isDown && !this.playerOnLeft) {
            this.player.toLeft(this.player.x - 500).then(()=> this.playerOnLeft = true)
        }

        if (this.cursorKeys.right.isDown && this.playerOnLeft) {
            this.player.toRight(this.player.x + 500).then(()=> this.playerOnLeft = false)

        }

    }

    recurringAnswerBlock(gameDataArr= []) {

        gameDataArr.reduce((lastPromise, nextAnswer)=> {

            return lastPromise.then(()=> {

                if(this.roadBlock != null && typeof this.roadBlock.destroy == 'function') this.roadBlock.destroy()

                this.roadBlock = new Scene1Block(
                    this, 
                    this.getColWidth(5.95), 
                    this.getRowHeight(5), 
                    ()=> {
                        let attempedItem = this.roadBlock.getItem(this.playerOnLeft ? 'left' : 'right')

                        let currentResult = attempedItem.getAnswerValue() === nextAnswer.correctAnswer

                        if(currentResult) {
                            attempedItem.playCorrect()
                            this.totalSocre++;
                        }else{
                            attempedItem.playWrong()
                        }
                    },
                    nextAnswer
                )

                this.add.existing(this.roadBlock)
                
                return this.roadBlock.getEndPromise()

            })

        }, Promise.resolve())

    }

}
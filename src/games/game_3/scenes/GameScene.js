import BasicScene from "./BasicScene"
import CatBack from "../objects/CatBack"
import ItemBam from '../objects/ItemBam'
import CatHand from "../objects/CatHand"
import WinCat from '../objects/Cat'
import Leaf from '../objects/Leaf'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

    }

    init() {

        this.dataModal = this.sys.game.globals.model;

        const items = this.dataModal.gameItems

        let itemInd = Math.floor(Math.random() * items.length)

        this.item = items[itemInd]

        this.answers = [];

        this.allAnswers = this.dataModal.gameAnswers

        this.allAnswers.some((answer, ind)=> {

            if(answer.index === this.item.answer) {

                this.answers.push(this.allAnswers.splice(ind, 1)[0])

                return true;

            }

        })

        this.answers.push(this.allAnswers[Math.floor(this.allAnswers.length * Math.random())])

    }

    preload() {

        this.buildBg('bg_tutor')


        const imageFiles = {
            'itemBam': require('../assets/images/item_bam.png'),
            'an1': require('../assets/images/an1.png'),
            'an2': require('../assets/images/an2.png'),
            'slash': require('../assets/images/slash.png'),
            'leafLeft': require('../assets/images/swipe_leaf1.png'),
            'leafRight': require('../assets/images/swipe_leaf2.png')
        };

        const atlasFiles = {
            'headband': { img: require('../assets/anims/headband.png'), data: require('../assets/anims/headband.json') },
            'cat_back': { img: require('../assets/anims/cat_back.png'), data: require('../assets/anims/cat_back.json') },
            'cat': { img: require('../assets/anims/cat.png'), data: require('../assets/anims/cat.json')},
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });

        this.createProgressBar();

    }

    create() {

        super.create();

        this.buildBg('bg_base');

console.log(
    this.answers,
    this.item
)


        this.catBack = new CatBack(this, this.getColWidth(10), this.getRowHeight(9))

        this.catHandWhite = new CatHand(this, this.getColWidth(1.5), this.getRowHeight(7), 'white', this.answerSelected.bind(this), this.answers.splice(Math.floor(Math.random() * this.answers.length), 1)[0])
        this.catHandBlack = new CatHand(this, this.getColWidth(1.5), this.getRowHeight(9.5), 'black', this.answerSelected.bind(this), this.answers.splice(Math.floor(Math.random() * this.answers.length), 1)[0])

        this.bam = new ItemBam(this, this.getColWidth(5), this.getRowHeight(6), this.item)


        // this.physics.world.enable([this.bam, this.catHandWhite, this.catHandBlack])
        // this.physics.add.overlap(this.bam, this.catHandWhite)
        // this.physics.add.overlap(this.bam, this.catHandBlack)

        this.leaf = new Leaf(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.existing(this.leaf)
        this.add.existing(this.catHandWhite)
        this.add.existing(this.catHandBlack)
        this.add.existing(this.bam)
        this.add.existing(this.catBack)


        this.bam.moveIn().on('complete', () => { 
            this.catHandWhite.moveIn().then((itemSelf) => itemSelf.setDepth(1)); 
            this.catHandBlack.moveIn().then((itemSelf) => itemSelf.setDepth(1)); 
        });
        this.catBack.moveIn();


    }

    answerSelected(catHand, pointer) {

        //Need to make sure the catHand is collide with text broad

        console.log('cat answer',catHand.getAnswer(), this.bam.isInside({x: pointer.upX, y: pointer.upY}))

        
        this.leafLeft = this.add.image(this.getColWidth(-9), this.getRowHeight(6), 'leafLeft')
        this.leafRight = this.add.image(this.getColWidth(21), this.getRowHeight(6), 'leafRight')

        this.leafLeft.setDepth(1)
        this.leafRight.setDepth(1)

        //Cat anime, strike anime, remove hand anime.
        this.catBack.strike().on('animationcomplete', ()=> {

            this.bam.getStrike();

            let moreLeafA = new Leaf(this, this.getColWidth(4), this.getRowHeight(8))
            let moreLeafB = new Leaf(this, this.getColWidth(6), this.getRowHeight(4))

            this.add.existing(moreLeafA)
            this.add.existing(moreLeafB)

            this.catHandBlack.moveOut();
            this.catHandWhite.moveOut();

            setTimeout(()=> {

                this.add.tween({
                    targets: this.leafLeft,
                    x: this.getColWidth(21),
                    y: this.getRowHeight(6),
                    duration: 1000,
                    ease: 'Power2'
                });
                            
                this.add.tween({
                    targets: this.leafRight,
                    x: this.getColWidth(-9),
                    y: this.getRowHeight(6),
                    duration: 1000,
                    ease: 'Power2'
                }).on('complete', ()=> {
    
                    this.catBack.moveTo(this.getColWidth(3), this.getRowHeight(7.5), 1400).then(()=> {
                        this.catBack.moveTo(this.getColWidth(-5), this.getRowHeight(7.5), 600).then(()=> {
                            let cat  = new WinCat(this, this.getColWidth(10), this.getRowHeight(8));
                            this.add.existing(cat);
                            cat.moveIn().then(()=> {
                                //Game win or lose anime
                                this.bam.breakUp()
                                cat.gameWin()

                            })

                            
                        })
                    })
        
                })

            }, 800)
            

        });

    }

    onSuccess() {

    }

    onFail() {
        
    }



}
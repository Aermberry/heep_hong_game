import BasicScene from "./BasicScene"
import CatBack from "../objects/CatBack"
import ItemBam from '../objects/ItemBam'
// import CatHandBlack from "../objects/CatHand"
import CatHand from "../objects/CatHand"
import WinCat from '../objects/Cat'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {

        this.buildBg('bg_tutor')

        const imageFiles = {
            'itemBam': require('../assets/item_bam.png'),
            'an1': require('../assets/an1.png'),
            'an2': require('../assets/an2.png'),
            'slash': require('../assets/slash.png'),
            'leafLeft': require('../assets/swipe_leaf1.png'),
            'leafRight': require('../assets/swipe_leaf2.png'),
        };

        const atlasFiles = {
            'headband': { img: require('../assets/headband.png'), data: require('../assets/headband.json') },
            'cat_back': { img: require('../assets/cat_back.png'), data: require('../assets/cat_back.json') },
            'cat': { img: require('../assets/cat.png'), data: require('../assets/cat.json')}
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });

        this.createProgressBar();

    }

    create() {

        super.create();


        this.buildBg('bg_base')

        this.catBack = new CatBack(this, this.getColWidth(10), this.getRowHeight(9))

        this.catHandWhite = new CatHand(this, this.getColWidth(1.5), this.getRowHeight(7), 'white', this.answerSelected.bind(this))
        this.catHandBlack = new CatHand(this, this.getColWidth(1.5), this.getRowHeight(9.5), 'black', this.answerSelected.bind(this))

        this.bam = new ItemBam(this, this.getColWidth(5), this.getRowHeight(6))

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

    answerSelected() {

        
        this.leafLeft = this.add.image(this.getColWidth(-9), this.getRowHeight(6), 'leafLeft')
        this.leafRight = this.add.image(this.getColWidth(21), this.getRowHeight(6), 'leafRight')

        this.leafLeft.setDepth(1)
        this.leafRight.setDepth(1)

        //Cat anime, strike anime, remove hand anime.
        this.catBack.strike().on('animationcomplete', ()=> {
            //Broad break anime
            this.bam.breakUp()

            this.catHandBlack.moveOut();
            this.catHandWhite.moveOut();
            
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
            });

            this.catBack.moveTo(this.getColWidth(3), this.getRowHeight(7.5), 1400).then(()=> {
                this.catBack.moveTo(this.getColWidth(-5), this.getRowHeight(7.5), 600).then(()=> {
                    let cat  = new WinCat(this, this.getColWidth(9), this.getRowHeight(8));
                    this.add.existing(cat);
                    
                })
            })

        });
        

        //Cat moveout, broad moveout


    }

}
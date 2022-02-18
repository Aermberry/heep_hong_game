import BasicScene from './BasicScene'
import Phaser from 'phaser'
export default class SectionBasicScene extends BasicScene {

    constructor(key) {
        super(key)
    }

    init() {
        this.initPromise = null
        this.isPreloadResolved = false
    }

    buildPreloadBg(imageName, anchor = {x: 0.5, y: 0.5}) {

        this.buildBg(imageName)
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(this.cameras.main.width/2, this.cameras.main.height/2)

        this.tweens.add({
            targets: this.bg,
            duration: 900,
            alpha: 0.2
        }).on('complete', ()=> {
            this.isPreloadResolved = true
        })

        const loadingCam = this.cameras.add(0, 0, this.cameras.main.width, this.cameras.main.height)
        loadingCam.ignore(this.bg)

        this.cameras.main.pan(this.cameras.main.width * anchor.x, this.cameras.main.height * anchor.y, 1500, 'Linear')
        this.initPromise = new Promise((resolve)=> {
            this.cameras.main.zoomTo(2.5, 1500, 'Linear', false, (camera, progress)=>  {
                
                if(progress === 1) {
                    resolve()
                    this.bg.destroy()
                    camera.setZoom(1)
                    camera.centerOn(this.cameras.main.width/2, this.cameras.main.height/2)
                    this.sys.game.globals.model.isZoom = false
                } else {
                    this.sys.game.globals.model.isZoom = true
                }
            })
        })

    }

    create() {
        super.create();


    }

    initSection(bgKey) {

        this.sbg = new Phaser.GameObjects.Image(this, this.getColWidth(6), this.getRowHeight(6), bgKey)
        this.sbg.setDisplaySize(this.game.scale.width, this.game.scale.height);
        this.sbg.setOrigin(0.5,0.5)
        // this.buildBg(bgKey)
        // this.bg.setOrigin(0.5,0.5)
        this.sbg.setAlpha(0)
        this.sbg.setScale(2)
        this.add.existing(this.sbg)

        if(this.isPreloadResolved) {

            setTimeout(
                ()=> {

                    this.tweens.add({
                        targets: this.sbg,
                        duration: 1000,
                        scale: 1,
                        alpha: 1
                    }).on('complete', ()=> {
                        this.populateSection()
                    })

                },
                1800
            )


        }else {
            this.initPromise.then(()=> {

                this.tweens.add({
                    targets: this.sbg,
                    duration: 1000,
                    scale: 1,
                    alpha: 1
                }).on('complete', ()=> {
                    this.populateSection()
                })

            })
        }

    }

    populateSection() {

    }
}

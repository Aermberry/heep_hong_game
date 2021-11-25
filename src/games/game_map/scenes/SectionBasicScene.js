import BasicScene from './BasicScene'

export default class SectionBasicScene extends BasicScene {

    constructor(key) {
        super(key)
    }

    init() {
        this.initPromise = null
        this.isPreloadResolved = false
    }

    buildPreloadBg(imageName) {
        this.buildBg(imageName)

        this.initPromise = new Promise((resolve)=> {
            this.tweens.add({
                targets: this.bg,
                duration: 1000,
                scale: 2,
                alpha: 0
            }).on('complete', function() {
                this.isPreloadResolved = true
                resolve()
            })
        })

    }

    create() {
        super.create();


    }

    initSection(bgKey) {

        if(this.isPreloadResolved) {

            this.buildBg(bgKey)
            this.bg.setAlpha(0)
            this.bg.setScale(2)
    
            this.tweens.add({
                targets: this.bg,
                duration: 1000,
                scale: 1,
                alpha: 1
            }).on('complete', ()=> {
                this.populateSection()
            })

        }else {
            this.initPromise.then(()=> {

                this.buildBg(bgKey)
                this.bg.setAlpha(0)
                this.bg.setScale(2)
        
                this.tweens.add({
                    targets: this.bg,
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

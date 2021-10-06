import Phaser from 'phaser'

export default class BasicTargetBlock extends Phaser.GameObjects.Container {

    constructor(scene,x ,y) {
        super(scene, x, y)

        this.setDepth(0)
    }

    /**
     * Provide an array for preloadFromArr function
     * @return      {img, atlas, sound}
     */
     static getAssetArray() {

        return {
            img: {

            },
            atlas: {

            },
            sound: {
                
            }
        }

    }
    
}
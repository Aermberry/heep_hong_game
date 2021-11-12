export default class Shelf {
    constructor(scene, x, y) {
        this.shelfSprite = scene.currentLevel == 1 ? 's1_shelf' :scene.currentLevel == 2 ? 's2_shelf' : 's3_shelf'
        this.shelf = scene.add.sprite(x, y,  this.shelfSprite)
        this.shelfZone = scene.add.zone(this.shelf.x, this.shelf.y, this.shelf.width, this.shelf.height);
        this.shelfZone.setRectangleDropZone(this.shelf.width, this.shelf.height);
    }



}
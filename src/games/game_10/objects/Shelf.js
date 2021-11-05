export default class Shelf {
    constructor(scene, x, y) {
        this.shelf = scene.add.sprite(x, y, 's1_shelf')
        this.shelfZone = scene.add.zone(this.shelf.x, this.shelf.y, this.shelf.width, this.shelf.height);
        this.shelfZone.setRectangleDropZone(this.shelf.width, this.shelf.height);
    }



}
export default class BlankRoad {
    constructor(scene, x, y) {
        this.blankRoadImg = scene.add.image(x, y, 'blankRoad2')
        // this.blankRoadImg.setOrigin(x,y)
        this.blankRoadImg.setInteractive();
        this.blankRoad = scene.add.zone(x, y, this.blankRoadImg.width, this.blankRoadImg.height);
        this.blankRoad.setRectangleDropZone(this.blankRoadImg.width, this.blankRoadImg.height);
        scene.hoverArea.push(scene.add.rectangle(x, y , this.blankRoadImg.width, this.blankRoadImg.height, 0x87cefa , 1));
        scene.hoverArea.forEach(element => {
           element.setAlpha(0); 
        });
    }


}
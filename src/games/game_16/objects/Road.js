import DraggableContainer from './DraggableContainer'

export default class Road extends DraggableContainer {

    constructor(scene, x, y, item) {
        super(scene, x + scene.getColWidth(1.5), y);

        this.inPosition = {
            x,
            y
        }

        this.setAlpha(0);
        // this.setScale(0.9);
        let roadImg = scene.add.sprite(x, y, 'road');
        this.create({ draggableHeight: roadImg.height, draggableWidth: roadImg.width })

        let roadText = scene.add.text(x - 110, y - 20, item, {
            fontSize: '30px',
            color: '#ffffff',
            fontFamily: "Custom-Han-Serif"
        });
        let children = [roadImg, roadText];
        this.add(children)


    }


}
import Phaser from "phaser";
import SelectCar from "./SelectCar";
export default class SubjectItem extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children)
        scene.add.existing(this);
    }
    add(gameObject) {
        if (!this.list.includes(gameObject)) {
            super.add(gameObject);
            if (gameObject instanceof SelectCar) {
                let item = gameObject;
                if (item.index.length > 0) {
                    this.list.splice(this.list.indexOf(item), 1);
                    this.list.splice(item.index[0], 0, item);
                }
            }
        } else {
            let item = gameObject;
            this.list.splice(this.list.indexOf(item), 1);
            if (item.index.length > 0) {
                this.list.splice(item.index[0], 0, item);
            } else {
                this.list.push(item)
            }
        }
        this.reRender();
    }
    remove(gameObject) {
        if (this.list.includes(gameObject)) {
            super.remove(gameObject);
        }
        this.reRender();
    }

    reRender() {
        this.list.forEach((item, i) => {
            if (item instanceof SelectCar) {
                if (this.list[i - 1] instanceof SelectCar) {
                    item.x = i == 0 ? 0 : this.list[i - 1].x + this.list[i - 1].width - 20
                } else {
                    item.x = i == 0 ? 160 : this.list[i - 1].x + this.list[i - 1].width - 20 + 160
                }
                item.y = 230;
            } else {
                if (this.list[i - 1] instanceof SelectCar) {
                    item.x = i == 0 ? 0 : this.list[i - 1].x + this.list[i - 1].width - 20 - 160
                } else {
                    item.x = i == 0 ? 0 : this.list[i - 1].x + this.list[i - 1].width - 20
                }
                item.y = 0;
            }
            item.origin = {
                x: item.x,
                y: item.y
            }
        })
    }
}


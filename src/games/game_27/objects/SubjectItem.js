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

    ignoreRebder(gameObject) {
        if (this.list.includes(gameObject)) {
            this.ignoreReRender(gameObject)
        }
    }

    ignoreReRender(gameObject) {
        let i = 0;
        while (i < this.list.length) {
            if (this.list[i] != gameObject) {
            if (this.list[i - 1] == gameObject) {
                this.ignoreItemRender(this.list[i], i)
            } else {
                this.itemRender(this.list[i], i)
            }
            this.list[i].origin = {
                x: this.list[i].x,
                y: this.list[i].y
            }}
            i++;
        }
    }

    ignoreItemRender(item, i) {
        if (item instanceof SelectCar) {
            if (this.list[i - 2]) {
                if (this.list[i - 2] instanceof SelectCar) {
                    item.x = this.list[i - 2].x + this.list[i - 2].width - 20
                } else {
                    item.x = this.list[i - 2].x + this.list[i - 2].width - 20 + 160
                }
            } else {
                item.x = 0;
            }
            item.y = 230;
        } else {
            if (this.list[i - 2]) {
                if (this.list[i - 2] instanceof SelectCar) {
                    item.x = this.list[i - 2].x + this.list[i - 2].width - 20 - 160
                } else {
                    item.x = this.list[i - 2].x + this.list[i - 2].width - 20
                }
            } else {
                item.x = 0;
            }
            item.y = 0;
        }
    }

    itemRender(item, i) {
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
    }

    reRender() {
        let self = this;
        self.list.forEach((item, i) => {
            self.itemRender(item, i)
            item.origin = {
                x: item.x,
                y: item.y
            }
        })
    }

    sortBySeed() {
        this.list.sort(this.compare('seed'))
        this.reRender();
    }

    compare(p){ //这是比较函数
        return function(m,n){
            var a = m[p];
            var b = n[p];
            return a - b; //升序
        }
    }
}


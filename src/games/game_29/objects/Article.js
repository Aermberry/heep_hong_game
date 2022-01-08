import DragText from "./DragText";

export default class Article {
    constructor(scene, x, y) {
        this.scene = scene;
        this.oring = {
            x: x,
            y: y
        }
        this.sprite = this.scene.add.sprite(x, y, 'text_bg').setOrigin(0).setScale(0.5)
        this.sprite.width = this.sprite.displayWidth
        this.sprite.height = this.sprite.displayHeight

    }

    createArticle(data) {
        let title = this.scene.add.text(this.oring.x + this.sprite.displayWidth / 2, this.oring.y + 45, data.title, {
            fontSize: '40px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        }).setOrigin(0)
        title.x -= title.width / 2
        this.firstRender(data.item);
    }

    firstRender(data) {
        let originX = this.oring.x + 40
        let originY = this.oring.y + 40
        let row = 0;
        let secondeArr = [];
        let lastArr = [];
        data.forEach((word, i) => {
            if (i % 30 == 0) {
                row++
            }
            this.scene.add.text(originX + i % 30 * 55, originY + row * 75, word.text, {
                fontSize: '55px', //30px
                color: word['z-index'][0] == 0 ? '#000000' : "#949494",
                fontWeight: 'bold',
                fontFamily: "system-ui"
            }).setOrigin(0).setDepth(1)
            if (word['z-index'][0] != 0) {
                word['z-index'].forEach((v) => {
                    if (v == 1) {
                        secondeArr.push({
                            row: row,
                            index: i,
                            data: word
                        })
                    } else {
                        lastArr.push({
                            row: row,
                            index: i,
                            data: word
                        })
                    }
                });
            }
        });
        this.secondeRender(secondeArr);
        this.lastRender(lastArr);
    }

    secondeRender(data) {
        let originX = this.oring.x + 40
        let originY = this.oring.y + 40

        let arr = [];
        data.forEach((item, i) => {
            if (i != 0) {
                if (i - 1 && item.index - data[i - 1].index > 1) {
                    arr.push([item])
                } else {
                    arr[arr.length - 1].push(item);
                }
            } else {
                arr.push([item])
            }
        })
        // 可拖拽的段落 由于一个段落可能有多行，所以将多行分割生成多个可拖拽text，成为一组拖拽时一起移动！
        arr.forEach((item) => {
            let type = item.map((item) => item.data.type).getMost();
            let arr = [];
            item.forEach((v, i) => {
                if (i != 0) {
                    if (i - 1 && v.row != item[i - 1].row) {
                        arr.push([v])
                    } else {
                        arr[arr.length - 1].push(v);
                    }
                } else {
                    arr.push([v])
                }
            })
            //将每一行的文字生成
            let group = arr.map((item) => {
                return {
                    index: item[0].index,
                    row: item[0].row,
                    text: item.map((item) => item.data.text).join('')
                }
            })

            group.forEach((item) => {
                new DragText(this.scene, originX + item.index % 30 * 55, originY + item.row * 75, item.text, {
                    fontSize: '55px',
                    color: "#000000",
                    backgroundColor: '#E07590',
                    fontWeight: 'bold',
                    fontFamily: "system-ui"
                }, type, 2, group.map((item) => item.text).join(''))
            })

        })
    }

    lastRender(data) {
        let originX = this.oring.x + 40
        let originY = this.oring.y + 40

        let arr = [];
        data.forEach((item, i) => {
            if (i != 0) {
                if (i - 1 && item.index - data[i - 1].index > 1) {
                    arr.push([item])
                } else {
                    arr[arr.length - 1].push(item);
                }
            } else {
                arr.push([item])
            }
        })
        // 可拖拽的段落 由于一个段落可能有多行，所以将多行分割生成多个可拖拽text，成为一组拖拽时一起移动！
        arr.forEach((item) => {
            let type = item.map((item) => item.data.type).getMost();
            let arr = [];
            item.forEach((v, i) => {
                if (i != 0) {
                    if (i - 1 && v.row != item[i - 1].row) {
                        arr.push([v])
                    } else {
                        arr[arr.length - 1].push(v);
                    }
                } else {
                    arr.push([v])
                }
            })
            //将每一行的文字生成
            let group = arr.map((item) => {
                return {
                    index: item[0].index,
                    row: item[0].row,
                    text: item.map((item) => item.data.text).join('')
                }
            })

            group.forEach((item) => {
                new DragText(this.scene, originX + item.index % 30 * 55, originY + item.row * 75, item.text, {
                    fontSize: '55px',
                    color: "#000000",
                    backgroundColor: '#2887DE',
                    fontWeight: 'bold',
                    fontFamily: "system-ui"
                }, type, 3, group.map((item) => item.text).join(''))
            })

        })
    }
}

Array.prototype.getMost = function () {
    var obj = this.reduce((p, n) => (p[n]++ || (p[n] = 1), (p.max = p.max >= p[n] ? p.max : p[n]), (p.key = p.max > p[n] ? p.key : n), p), {});
    return obj.key
}
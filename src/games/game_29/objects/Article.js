import DragText from "./DragText";

export default class Article {
    constructor(scene, x, y, level) {
        this.scene = scene;
        this.oring = {
            x: x,
            y: y
        }
        this.level = level;
        //text_bg scale 0.5 一行容纳30字 竖直 一行容纳15字
        this.sprite = this.scene.add.sprite(x, y, 'new_text_bg').setOrigin(0).setScale(0.525)
        this.sprite.width = this.sprite.displayWidth
        this.sprite.height = this.sprite.displayHeight
        this.highlight;
        this.title;
        let colorArr = ['#83A9E5', '#E882A4', '#6fb26f', '#f9c543'];
        this.shuffColorArr = colorArr.sort(function () {
            return .5 - Math.random();
        });

    }

    createArticle(data) {
        this.title = data.title;
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
        let originX = this.oring.x + 35
        let originY = this.oring.y + 40
        let row = 0;
        let secondeArr = [];
        let lastArr = [];
        let rowMaxChat = 14;  //横着30字 竖直文本框15字
        let fourthArr = [];
        this.group = this.scene.add.group();
        data.forEach((word, i) => {
            if (i % rowMaxChat == 0) {
                row++
            }
            let characters = this.scene.add.text(originX + i % rowMaxChat * 60, originY + row * 75, word.text.trim(), {
                fontSize: '55px', //30px
                color: word['z-index'][0] == 0 ? '#000000' : "#949494",
                padding: {
                    x: 5, y: 5
                },
                // strokeThickness: this.level == 1 ? 0 : 5,
                fontWeight: 'bold',
                fontFamily: "system-ui"
            }).setOrigin(0).setDepth(1)
            characters.type = '';
            this.group.add(characters);
            if (word['z-index'][0] != 0) {
                word['z-index'].forEach((v) => {
                    if (v == 1) {
                        secondeArr.push({
                            row: row,
                            index: i,
                            data: word
                        })
                    } else if(v==2) {
                        lastArr.push({
                            row: row,
                            index: i,
                            data: word
                        })
                    } else {
                        fourthArr.push({
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
        if(this.title == '弟弟的生日會') {
            this.fourthRenderer(fourthArr);
        }
    }

    secondeRender(data) {
        let originX = this.oring.x + 35
        let originY = this.oring.y + 40
        let rowMaxChat = 14;  //横着30字 竖直文本框15字

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
            let type = item.map((item) => item.data.type).filter((item) => item != "").getMost();
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
                this.group.getChildren()[v.index].type += type;
            })

            arr.forEach((value) => {
                value.forEach((item) => {
                    new DragText(this.scene, originX + item.index % rowMaxChat * 60, originY + item.row * 75, item.data.text, {
                        fontSize: '55px',
                        color: "#000000",
                        backgroundColor: ['p', 't', 'l'].includes(type) ? this.shuffColorArr[0] : type == 'a' ? this.shuffColorArr[1] : type == 'b' ? this.shuffColorArr[2] : this.shuffColorArr[3],
                        padding: {
                            x: 5, y: 5
                        },
                        fontWeight: 'bold',
                        fontFamily: "system-ui"
                    }, type, 2, arr.map((value) => value.map((item) => item.data.text).join('')).join(''), this.level != 1)
                })

            })

        })
    }

    lastRender(data) {
        let originX = this.oring.x + 40
        let originY = this.oring.y + 45
        let rowMaxChat = 14;
        let arr = [];
        data.forEach((item, i) => {
            if (i != 0) {
                if (item.index - data[i - 1].index > 1) {
                    arr.push([item])
                } else {
                    if (item.data.isSpace) {
                        arr.push([item])
                    } else {
                        arr[arr.length - 1].push(item);
                    }
                }
            } else {
                arr.push([item])
            }
        })

        console.log(arr);

        // 可拖拽的段落 由于一个段落可能有多行，所以将多行分割生成多个可拖拽text，成为一组拖拽时一起移动！
        arr.forEach((item) => {
            let type = item.map((item) => item.data.type).filter((item) => item != "").getMost();
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
                this.group.getChildren()[v.index].type += type;
            })
            //将每一行的文字生成
            // let group = arr.map((item) => {
            //     return {
            //         index: item[0].index,
            //         row: item[0].row,
            //         text: item.map((item) => item.data.text).join('')
            //     }
            // })

            // group.forEach((item) => {
            //     new DragText(this.scene, originX + item.index % rowMaxChat * 55, originY + item.row * 75, item.text, {
            //         fontSize: '55px',
            //         color: "#000000",
            //         backgroundColor: '#83A9E5',
            //         fontWeight: 'bold',
            //         padding: {

            //         },
            //         fontFamily: "system-ui"
            //     }, type, 3, group.map((item) => item.text).join(''), this.level != 1)

            // })
            arr.forEach((value) => {
                value.forEach((item) => {
                    new DragText(this.scene, originX + item.index % rowMaxChat * 60, originY + item.row * 75, item.data.text, {
                        fontSize: '55px',
                        color: "#000000",
                        backgroundColor: type.includes(['p', 't', 'l']) ? this.shuffColorArr[0] : type == 'a' ? this.shuffColorArr[1] : type == 'b' ? this.shuffColorArr[2] : this.shuffColorArr[3],
                        fontWeight: 'bold',
                        padding: {
                            x: this.level != 1 ? 0 : 5
                        },
                        fontFamily: "system-ui"
                    }, type, 2, arr.map((value) => value.map((item) => item.data.text).join('')).join(''), this.level != 1)
                })

            })

        })
    }

    fourthRenderer(data) {
        let originX = this.oring.x + 40
        let originY = this.oring.y + 45
        let rowMaxChat = 14;
        let arr = [];
        data.forEach((item, i) => {
            if (i != 0) {
                if (item.index - data[i - 1].index > 1) {
                    arr.push([item])
                } else {
                    if (item.data.isSpace) {
                        arr.push([item])
                    } else {
                        arr[arr.length - 1].push(item);
                    }
                }
            } else {
                arr.push([item])
            }
        })

        arr.forEach((item) => {
            let type = item.map((item) => item.data.type).filter((item) => item != "").getMost();
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
                this.group.getChildren()[v.index].type += type;
            })
            arr.forEach((value) => {
                value.forEach((item) => {
                    new DragText(this.scene, originX + item.index % rowMaxChat * 60, originY + item.row * 75, item.data.text, {
                        fontSize: '55px',
                        color: "#000000",
                        backgroundColor: type.includes(['p', 't', 'l']) ? this.shuffColorArr[0] : type == 'a' ? this.shuffColorArr[1] : type == 'b' ? this.shuffColorArr[2] : this.shuffColorArr[3],
                        fontWeight: 'bold',
                        padding: {
                            x: this.level != 1 ? 0 : 5
                        },
                        fontFamily: "system-ui"
                    }, type, 2, arr.map((value) => value.map((item) => item.data.text).join('')).join(''), this.level != 1)
                })

            })

        })
    }

    highlightCharacters(type) {
        this.group.getChildren().forEach((item) => {
            if (item.type == '') {
                item.setColor('#000000')
            } else {
                if (item.type.split('').includes(type)) {
                    item.setColor('#E882A4')
                } else {
                    item.setColor('#949494')
                }
            }
        })
    }

    onComplete() {
        this.group.getChildren().forEach((item) => {
            item.setDepth(5)
            item.setInteractive({
                useHandCursor: true
            })
        })
    }
}

Array.prototype.getMost = function () {
    var obj = this.reduce((p, n) => (p[n]++ || (p[n] = 1), (p.max = p.max >= p[n] ? p.max : p[n]), (p.key = p.max > p[n] ? p.key : n), p), {});
    return obj.key
}
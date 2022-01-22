import Game29 from '../game_29/index'


function launch(urlParams) {
    let game = new Game29(urlParams)
    return game
}

export { launch }
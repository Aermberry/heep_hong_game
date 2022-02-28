import Game29 from '../game_29/index'


function launch(urlParams,gtag) {
    let game = new Game29(urlParams, gtag)
    return game
}

export { launch }
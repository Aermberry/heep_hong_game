import Game27 from '../game_27/index'


function launch(urlParams, gtag) {
    let game = new Game27(urlParams, gtag)
    return game
}

export { launch }
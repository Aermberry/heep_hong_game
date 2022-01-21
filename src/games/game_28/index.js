import Game27 from '../game_27/index'


function launch(urlParams) {
    let game = new Game27(urlParams)
    return game
}

export { launch }
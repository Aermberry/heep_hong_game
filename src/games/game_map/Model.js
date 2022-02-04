export default class Model {

    constructor(uriParams, vueRouter) {
        this._vueRouter = vueRouter;
        this._uriParams = uriParams
        this._isFirstLoad = true
        console.log('uriParams', this._uriParams)
    }

    get vueRouter() {
        return this._vueRouter
    }

    get sectionId() {
        return typeof this._uriParams.sid === 'undefined' ? null : this._uriParams.sid
    }

    get isFirstLoad() {
        return this._isFirstLoad
    }

    set isFirstLoad(status) {
        this._isFirstLoad = status
    }

    set bgMusicPlaying(value) {
        this._bgMusicPlaying = value;
    }

    get bgMusicPlaying() {
        return this._bgMusicPlaying;
    }

}
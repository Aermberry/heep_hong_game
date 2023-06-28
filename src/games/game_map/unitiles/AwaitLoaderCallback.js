import AwaitFile from './AwaitFile.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

const loaderCallback = function (key, config) {
    if ((key && typeof key === 'function')) {
        var callback = key;
        var scope = config;
        config = {
            config: {
                callback: callback,
                scope: scope,
            }
        };
    } else if (IsPlainObject(key)) {
        config = key;
        if (!config.hasOwnProperty('config')) {
            config = {
                config: config
            };
        }
    } else {
        config = {
            key: key,
            config: config
        };
    }
    this.addFile(new AwaitFile(this, config));

    return this;
}

export default loaderCallback;
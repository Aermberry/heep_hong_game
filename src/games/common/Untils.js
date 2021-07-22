

export default {
  test: () =>{
    console.log()
  },
  fadeOutIn: (passedCallback, context) => {
    context.cameras.main.fadeOut(250);
    context.time.addEvent({
        delay: 250,
        callback: function() {
            context.cameras.main.fadeIn(250);
            passedCallback(context);
        },
        callbackScope: context
    });
   },
   fadeOutScene: (sceneName, context) => {
    context.cameras.main.fadeOut(250);
    context.time.addEvent({
        delay: 250,
        callback: function() {
            context.scene.start(sceneName);
        },
        callbackScope: context
    });
   }
}
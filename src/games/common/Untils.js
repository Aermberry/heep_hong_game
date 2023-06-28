

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
   },
   shuffle: (array)=> {
    let m = array.length, t, i;
  
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }
}
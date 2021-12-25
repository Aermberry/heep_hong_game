<template>
    <Game />
</template>

<script>
// @ is an alias to /src
import Game from '@/components/GameStage.vue'

export default {
  name: 'About',
  components: {
    Game
  },
  data() {
    return {
      setCookieTimer: null
    }
  },
  mounted: function() {
    this.$gtag.event('view_item', { 'event_category': 'Games', 'event_label': 'Gamestart', 'value': Date.now() })

    if(this.setCookieTimer != null) clearInterval(this.setCookieTimer)

    let now = new Date()

    let existingStartTimestamp = localStorage.getItem('game_begin_timestamp')
    let existingLastUpdateTimestamp = localStorage.getItem('game_last_update_timestamp')

    if(!existingStartTimestamp || 
      (existingLastUpdateTimestamp && existingLastUpdateTimestamp > (existingStartTimestamp + 15 * 60 * 1000))) 
    {
      localStorage.setItem('game_begin_timestamp', now.getTime())
      localStorage.setItem('game_last_update_timestamp', now.getTime())
    }

    this.setCookieTimer = setInterval(()=> {
      
      let date = new Date()
      let nowTimestamp = date.getTime()

      localStorage.setItem('game_last_update_timestamp', nowTimestamp)

    }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.setCookieTimer)
  }
}
</script>
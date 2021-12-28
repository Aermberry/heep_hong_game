<template>
    <Game />
</template>

<script>
// @ is an alias to /src
import Game from '@/components/GameStage.vue'

export default {
  name: 'Game',
  components: {
    Game
  },
  mounted: function() {
    this.$gtag.event('view_item', { 'event_category': 'Games', 'event_label': 'Gamestart', 'value': Date.now() })

  },
}
</script>
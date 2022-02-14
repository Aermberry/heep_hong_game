<template>
  <game-map />
</template>

<script>
// @ is an alias to /src
import GameMap from '@/components/GameMap.vue'


export default {
  name: 'GameWorld',
  components: {
    GameMap
  }
}
</script>
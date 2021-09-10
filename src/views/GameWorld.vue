<template>
  <div class="wrapper">
    <Header />
    <main>
      <div class="container">
        <div class="content-space"></div>
        <div class="content-wrapper game-intro">
          <div class="game-intro-header">
            <img src="@/assets/images/world notext.svg" alt="">
          </div>

            <div v-if="stages[worldId]">
                <span v-for="(stageId) in stages[worldId]" v-bind:key="stageId">
                    <a v-bind:href="'/game/'+worldId+'/stage/'+stageId" class="link-entry-outline"><span class="inner">進入關卡{{stageId}}</span></a>
                </span>
            </div>


        </div>
        <div class="content-space"></div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'GameWorld',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
        stages: {
            1: [

            ],
            2: [
                
            ],
            3: [
                5,6,7,8,9,21
            ],
            4: [

            ],
            5: [

            ],
            6: [

            ]
        }
    }
  },
  computed: {
    worldId: function(){
      return this.$route.params.wid
    },
  }
}
</script>
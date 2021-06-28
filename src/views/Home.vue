<template>
  <div class="home">
    <Header />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
//import Home from '@/components/Home.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    //Home
  }
}
</script>

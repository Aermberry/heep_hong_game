<template>
<header>
  <div id="snackbar"></div>
  <nav class="navbar">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" title="協康會賽馬會 讀寫支援計劃 Heep Hong Society Jockey Club IRead & ILearn Support Programme"><img src="@/assets/images/logo.svg" class="logo" alt="協康會賽馬會 讀寫支援計劃 Heep Hong Society Jockey Club IRead & ILearn Support Programme"></router-link>
      <div class="links">
        <router-link to="/intro" class="intro">簡介</router-link>
        <router-link to="/game-intro" class="game">遊戲</router-link>
      </div>
    </div>
  </nav>
</header>
</template>


<script>
export default {
  name: 'Header'
}
</script>
<style scoped>
.logo {
  height: 70px;
}
.links {
  margin-right: 0;
}
.game{
  margin-right: 0;
}
nav{
  padding-top: 0.9375em;
  padding-bottom: 0.9375em;
}
</style>
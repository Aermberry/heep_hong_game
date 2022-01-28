<template>
<header>
  <nav class="navbar">
    <div class="container-fluid">
      <a href="/game" class="navbar-brand" title="協康會賽馬會 讀寫支援計劃 Heep Hong Society Jockey Club IRead & ILearn Support Programme"><img src="@/assets/images/logo.svg" class="logo" alt="協康會賽馬會 讀寫支援計劃 Heep Hong Society Jockey Club IRead & ILearn Support Programme"></a>
      <div class="links">
        <a href="/game/intro" class="intro">簡介</a>
        <a href="/game/world-index" class="game">遊戲</a>
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
  max-height: 3rem;
}
.links {
  margin-right: 3rem;
}
</style>
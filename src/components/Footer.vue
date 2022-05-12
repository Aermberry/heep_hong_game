<template>
  <footer>
    <nav class="navbar">
      <div class="container-fluid flex-col">

        <div class="partners">
          <div class="partner">
            <div class="title">主辦機構</div>
            <a href="https://www.heephong.org/" target="_blank" title="協康會 HEEP HONG SOCIETY">
              <img src="@/assets/images/hhs.svg" class="img-fluid logo" alt="協康會 HEEP HONG SOCIETY">
            </a>
          </div>
          <div class="partner">
            <div class="title">捐助機構</div>
            <a href="https://charities.hkjc.com/charities/chinese/charities-trust/index.aspx" target="_blank" title="香港賽馬會慈善信託基金 The Hong Kong Jockey Club Charities Trust">
              <img src="@/assets/images/hkjc.svg" class="img-fluid logo" alt="香港賽馬會慈善信託基金 The Hong Kong Jockey Club Charities Trust">
            </a>
          </div>
        </div>

        <ul class="navbar-nav">
            <li class="nav-item"><a href="https://jc-ireadilearn.heephong.org/privacy-policy">私隱政策</a></li>
            <li class="nav-item"><a href="https://jc-ireadilearn.heephong.org/important-notices">重要告示</a></li>
            <li class="nav-item">©{{currentYear}} 協康會，版權所有</li>
        </ul>

      </div>
    </nav>
  </footer>
</template>
<script>
export default {
  computed:{
    currentYear () {
      return new Date().getFullYear();
    }
  }
}
</script>
<style scoped>
.logo {
  max-height: 2.5rem;
  width: 100%;
}
</style>
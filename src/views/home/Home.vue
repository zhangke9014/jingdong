<template>
  <div class="wrapper">
    <staticPart/>
    <Nearby/>
  </div>
  <Docker :currentIndex="0"/>
</template>
<script>
import staticPart from './staticPart.vue'
import Nearby from './Nearby.vue'
import Docker from './Docker'
export default {
  name: 'Home',
  components: { staticPart, Nearby, Docker }
}
</script>
  <style lang="scss">
@import "../../style/mixins.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  //background-color: blue;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.02rem 0;
}

</style>

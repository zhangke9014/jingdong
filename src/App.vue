<template>
  <router-view></router-view>
</template>
<script>
import { getCurrentInstance } from 'vue';
export default {
  name: 'App',
  setup() {
    console.log(this);
    console.log(getCurrentInstance());
  }
}

</script>
<style lang="scss">

</style>

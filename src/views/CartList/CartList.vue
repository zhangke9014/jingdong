<template>
  <Shop/>
  <Docker :currentIndex="1"/>
</template>

<script>
import Shop from '../shop/Shop.vue'
import Content from '../shop/Content.vue'
import Docker from '../home/Docker.vue'
import Cart from '../shop/Cart.vue'
export default {
  name: "cartList",
  components: { Shop,Content,Cart,Docker },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  //bottom: 0;
  overflow-y: scroll;
  background-color: #eee;
}
</style>
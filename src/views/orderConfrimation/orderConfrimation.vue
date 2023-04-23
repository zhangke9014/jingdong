<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import TopArea from "./TopArea.vue";
import ProductList from "./ProductList.vue";
import Order from "./Order.vue";

export default {
  name: "orderConfrimation",
  components: { TopArea, ProductList, Order },
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
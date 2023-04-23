<template>
  <div class="wrapper">
    <div class="title">查看历史订单</div>
  </div>
  <div class="orders" v-for="item in list">
    <div class="order" v-for="InnerItem in item.products">
      <img class="order__img" :src="InnerItem.url" 
      v-if="InnerItem.num!=0"/>
    </div>
    <div class="orders__desc">
    <div class="orders__totalSum">共计{{ item.Num }}件</div>
      <div class="orders__totalNum">共计{{ item.totalSum }}元</div>
    </div>
  </div>
</template>

<script>

import { useStore } from "vuex";
export default {
  name: "AllOrders",
  setup() {
    const store = useStore();
    const list = store.state.allProducts;
    console.log(list);
    return { list };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  //background-color: blue;
  bottom: 0.5rem;
  right: 0;
}
.title {
  margin: 0.14rem 0;
  line-height: 0.44rem;
  background-color: #fff;
  font-size: 0.16rem;
  color: #333333;
  text-align: center;
}
.orders {
 display: flex;
  position: relative;
  top: 0.4rem;
  height: 0.5rem;
  margin: 0.15rem 0;
  .order {
    float: left;
    height: 0.4rem;
    margin:0 .05rem;
    &__img {
      float: left;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .orders__desc {
    flex:1;
    margin-right: .3rem;
    flex-direction: column;
    display: flex;
    .orders__totalSum{
        flex:1;
        font-size:.14rem;
        text-align: right;
        line-height: .25rem;
        color: #E93B3B;
    }
    .orders__totalNum {
        flex:1;
        font-size:.14rem;
        text-align: right;
        line-height: .25rem;
        color:#666666;
    }
  }
}
</style>
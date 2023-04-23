<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="item in products">
        <img :src="item.url" alt="" class="order__content__img"
        v-if="item.num!=0" />
      </div>
      <span class="order__status" v-if="totalNumber != 0"> {{ "已下单" }}</span>
    </div>
    <div class="order__content__price" v-if="totalNumber != 0">
      总价:{{ totalPrice.toFixed(2) }}
    </div>
    <div class="order__content__count" v-if="totalNumber != 0">
      共{{ totalNumber }}件
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import Docker from "../../views/home/Docker.vue";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
//处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const store = useStore();
  const products = store.state.products;
  const getNearbyList = () => {
    let totalPrice = 0;
    let totalNumber = 0;
    products.forEach((item) => {
      //console.log(item);
      totalNumber += item.num;
      totalPrice += item.num * item.price;
      //console.log(totalNumber, totalPrice);
    });
    
    return { totalPrice, totalNumber };
  };
  return { products, getNearbyList };
};
export default {
  name: "orderList",
  components: { Docker },
  setup() {
    const { products, getNearbyList } = useOrderListEffect();
    const { totalPrice, totalNumber } = getNearbyList();
    return { products, totalPrice, totalNumber };
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
  line-height: 0.44rem;
  background-color: #fff;
  font-size: 0.16rem;
  color: #333333;
  text-align: center;
}
.orders {
  height: 50px;
}
.order {
  height: 50px;
  float: left;
}
.order__content__img {
  float: left;
  width: 0.5rem;
  height: 0.5rem;
  display: block;
}
.order__content__price {
  margin-bottom: 0.04rem;
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: #e93b3b;
  text-align: right;
}
.order__content__count {
  line-height: 0.14rem;
  font-size: 0.12rem;
  color: #333;
  text-align: right;
}
.order__status {
  float: right;
  text-align: right;
  line-height: 0.5rem;
  font-size: 14px;
  color: #999999;
}
</style>
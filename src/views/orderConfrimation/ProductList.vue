<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__list">
      <div class="products__item" v-for="item in productList" :key="item._id">
        <img class="products__item__img" :src="item.imgUrl" />
        <div class="products__item__detail">
          <h4 class="products__item__title">{{ item.name }}</h4>
          <p class="products__item__price">
            <span>
              <span class="products__item__yen">&yen;</span>
              {{ item.price }}*{{ item.count }}
            </span>
            <span class="products__item__total">
              <span class="products__item__yen">&yen;</span>
              {{ (item.price * item.count).toFixed(2) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/commomCartEffect";
export default {
  name: "ProductList",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList,shopName } = useCommonCartEffect(shopId);
    //console.log(productList);

    return { productList,shopName };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.products {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background: #fff;
  &__title {
    padding: 0.16rem 0.16rem 0 0.16rem;
    font-size: 0.16rem;
    color: #333;
  }
  &__list {
    overflow-y: scroll;
    margin: 0 0.16rem;
  }
  &__item {
    position: relative;
    display: flex;
    padding-top: 0.16rem;
    &__detail {
      flex: 1;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin-top: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
    }
    &__total {
      text-align: right;
      flex: 1;
      color: #000;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
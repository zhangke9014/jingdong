<template>
  <div class="mask" 
  v-if="showCart&&total>0"
  @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart&&total>0">
      <div class="product__header">
        <div class="product__header__all"
        @click="()=>setCartItemChecked(shopId)">
          <span class="product__header__icon iconfont"
          v-html="allchecked?'&#xe600;':'&#xe66c;'"></span>
          全选</div>
        <div class="product__header__clear"
        @click="()=>cleanCartProducts(shopId)">清空购物车</div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe600;' : '&#xe66c;'"
            @click="changeCartItemChecked(shopId, item._id)"
          ></div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            {{ item.count || 0 }}
            <span
              class="product__number__plus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{ price }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{path:`/orderConfrimation/${shopId}`}">
          去结算
        </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { computed,ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/commomCartEffect";

//获取购物车信息的逻辑;
const useCartEffect = (shopId) => {
  const store = useStore();
  const {changeCartItemInfo,cartList,productList} = useCommonCartEffect(shopId);
  const total = computed(() => {
    const productList = cartList[shopId]?.productList;
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", {
      shopId,
      productId,
    });
  };

  const price = computed(() => {
    const productList = cartList[shopId]?.productList;
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.check == true) {
          count += product.count * product.price;
        }
      }
    }
    return count.toFixed(2);
  });


  const allchecked = computed(()=>{
    const productList = cartList[shopId]?.productList;
    let result = true
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.count>0&&!product.check) {
          result = false;
        }
      }
    }
    return result
  })

  const cleanCartProducts = (shopId)=>{
    store.commit('cleanCartProducts',{shopId})
  }

  const setCartItemChecked = (shopId)=>{
    store.commit('setCartItemChecked',{shopId})
  }
  return {
    total,price,productList,allchecked, changeCartItemInfo,
    changeCartItemChecked,cleanCartProducts,
    setCartItemChecked,
  };
};

//展示与隐藏购物车逻辑
const toggleCartEffect = ()=>{
  const showCart = ref(false)
    const handleCartShowChange = ()=>{
      showCart.value = !showCart.value
    }
    return {showCart,handleCartShowChange}
}
export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const {showCart,handleCartShowChange} = toggleCartEffect()
    const { total, price,productList,changeCartItemChecked,
      cleanCartProducts,changeCartItemInfo,
      allchecked,setCartItemChecked,cartList } = useCartEffect(shopId);
    return {
      price,total,shopId,productList,allchecked,cartList,
      changeCartItemInfo,changeCartItemChecked,
      cleanCartProducts,showCart,
      setCartItemChecked,handleCartShowChange
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.mask{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;

}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      right: 0.2rem;
      top: 0.04rem;
      //padding: 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      background-color: #e93b3b;
      transform: scale(0.5);
    }
  }
  &__info {
    flex: 1;
    color: #333;
    font-size: 0.12rem;
    &__price {
      line-height: 0.49rem;
      color: #e93b3b;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
    a {
      color:#fff;
      text-decoration: none;
    }
  }
}
.product {
  background: #fff;
  overflow-y: scroll;
  flex: 1;
  &__header{
    display: flex;
    height: 0.52rem;
    line-height: .52rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: .14rem;
      color:#333333;
    &__all{
      width: 0.64rem;
      margin-left: .16rem;
    }
    &__icon{
      font-size: .14rem;
      display: inline-block;
      vertical-align: top;
      color:#0091ff;
      font-size: .2rem;
    }
    &__clear{
      flex:1;
      text-align: right ;
      margin-right: .16rem;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 1px solid #f1f1f1;
    &__checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      display: inline-block;
      vertical-align: top;
      color:#0091ff;
      font-size: .2rem;
    }
    &__detail {
      overflow: hidden;
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
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #999;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      bottom: 0.12rem;
      right: 0;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;

        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid #666;
        color: #666;
        margin-right: 0.05rem;
      }
      &__plus {
        background: #0091ff;
        color: #fff;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
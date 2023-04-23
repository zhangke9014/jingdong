<template>
  <div class="order">
    <div class="order__price">实付金额￥{{ total }}</div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付,否则订单将取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { post } from "../../utlis/request";
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useCommonCartEffect } from "@/effects/commomCartEffect";

const useOrderEffect = (cartList, shopId, shopName, showToast) => {
  const store = useStore();
  const router = useRouter();
  const productList = cartList[shopId]?.productList;
  //console.log(productList);
  const total = computed(() => {
    let price = 0;
    for (let i in productList) {
      const product = productList[i];
      price = price + product.count * product.price;
    }
    return price.toFixed(2);
  });

  const totalNum = computed(() => {
    let num = 0;
    for (let i in productList) {
      const product = productList[i];
      num += product.count;
    }
    return num;
  });

  const handleConfirmOrder = async (isCancled) => {
    const productList = cartList[shopId]?.productList;
    const products = [];
    for (let i in productList) {
      const product = productList[i];
      products.push({
        id: product._id,
        num: product.count,
        price: product.price,
        url: product.imgUrl,
        
      });
    }
    // console.log(totalNum.value,parseInt(total.value));
    const Num = totalNum.value
    const totalSum = parseInt(total.value)
    console.log("qqqqq", products, "qqqqq");
    if (isCancled == true) {
      showToast("下单失败");
      router.push({ name: "CartList" });
    } else {
      store.commit("changeProducts", products);
      store.commit("allOrders", { products, shopId, Num,totalSum });
      store.commit("clearCartData", shopId);
      router.push({ name: "orderList" });
    }
  };
  return { total, handleConfirmOrder };
};

const useShowMaskChange = () => {
  const showConfirm = ref(false);
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};

export default {
  name: "Order",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { showConfirm, handleShowConfirmChange } = useShowMaskChange();
    const { cartList, shopName } = useCommonCartEffect(shopId);
    const { show, toastMessage, showToast } = useToastEffect();
    const { total, handleConfirmOrder, totalNum } = useOrderEffect(
      cartList,
      shopId,
      shopName,
      showToast
    );

    return {
      total,
      totalNum,
      handleConfirmOrder,
      show,
      toastMessage,
      showToast,
      showConfirm,
      handleShowConfirmChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: #fff;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: #333333;
  }
  &__btn {
    width: 0.98rem;
    text-align: center;
    background: #4fb0f9;
    color: #fff;
  }
}
.mask {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      margin: 0.24rem 0 0 0;
      font-size: 0.18rem;
      line-height: 0.26rem;
      color: #333;
      text-align: center;
    }
    &__desc {
      font-size: 0.14rem;
      color: #666666;
      margin: 0.08rem 0 0 0;
      text-align: center;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      text-align: center;
      &--first {
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
        margin-right: 0.24rem;
      }
      &--last {
        margin-left: 0.24rem;
        color: #fff;
        background-color: #4fb0f9;
      }
    }
  }
}
</style>
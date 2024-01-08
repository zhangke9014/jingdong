<template>
  <div class="wrapper">
    <div class="desc">个人主页</div>
    <div class="img">
      <img
        src="https://tse4-mm.cn.bing.net/th/id/OIP-C.uWVlC0owLbAZ42XAqCZfUAAAAA?pid=ImgDet&rs=1"
        alt=""
        class="img__image"
      />
    </div>
    <div class="items">
      <div class="item">
        <div class="item__desc">姓名:sponge</div>
        <div class="iconfont item__icon">&#xe775;</div>
      </div>
      <div class="item">
        <div class="item__desc">邮箱地址:12345678@qq.com</div>
        <div class="iconfont item__icon">&#xe775;</div>
      </div>
      <div class="item">
        <div class="item__desc">电话号码:123456578</div>
        <div class="iconfont item__icon">&#xe775;</div>
      </div>
      <div class="item">
        <div class="item__desc">住址:瑞士苏黎世</div>
        <div class="iconfont item__icon">&#xe775;</div>
      </div>
      <div class="item" @click="handleshowAllOrders">
        <div class="item__desc">查看历史订单</div>
        <div class="iconfont item__icon">&#xe775;</div>
      </div>
      <div class="item" @click="handleChangeInfo">
        <div class="item__desc">更新个人信息</div>
        <div class="iconfont item__icon">&#xe775;</div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script setup>
import Docker from "@/views/home/Docker.vue";
import { useRouter } from "vue-router";

const useShowOrdersEffect = (router) => {
  const handleshowAllOrders = () => {
    router.push({ name: "AllOrders" });
  };
  return { handleshowAllOrders };
};
const router = useRouter();
const { handleshowAllOrders } = useShowOrdersEffect(router);
//export default {
// name: "Person",
// components: { Docker },
// setup() {
//   const router = useRouter();
//   const { handleshowAllOrders } = useShowOrdersEffect(router);
//   return { handleshowAllOrders };
// },
//};
</script>

<style lang="scss" scoped>
.wrapper {
  .desc {
    text-align: center;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.2rem;
  }
  .img {
    margin: auto;
    //background-color: pink;
    width: 120px;
    height: 120px;
    &__image {
      display: inline-block;
      width: 120px;
      height: 120px;
      border-radius: 60px;
    }
  }
}

.items {
  overflow-y: auto;
  margin-top: 0.12rem;
  display: flex;
  flex-direction: column;
  height: 400px;
  .item {
    border: 2px solid pink;
    background-color: #4f3805;
    flex: 1;
    &__desc {
      color: skyblue;
      float: left;
      font-size: 0.16rem;
      padding: 0.3rem;
    }
    &__icon {
      color: green;
      float: right;
      font-size: 0.24rem;
      width: 0.4rem;
      height: 0.4rem;
      margin-top: 0.25rem;
    }
  }
}
</style>
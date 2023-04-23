<template>
  <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back"
        @click="handleBackClick">&#xe679;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">西安邮电大学东区安悦南楼317</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">张珂</span>
          <span class="top__receiver__info__name">17868843443</span>
        </div>
        <div class="top__receiver__enter iconfont">&#xe679;</div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name:'TopArea',
    setup (){
        const router = useRouter();
        const handleBackClick = ()=>{router.back();}
        return {handleBackClick}
    }
}
</script>

<style lang="scss" scoped>
    .top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.26rem;
    line-height: 0.24rem;
    color: #fff;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: #333;
      line-height: 0.22rem;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: #333;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        margin-right: 0.06rem;
        font-size: 0.12rem;
        color: #666;
        line-height: 0.18rem;
      }
    }
    &__enter {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: #666;
      line-height: 0.16rem;
    }
  }
}
</style>
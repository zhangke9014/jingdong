<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img" />
    <div
    :class="{'shop__content':true,'shop__content--bordered':hideborder?false:true}">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tags__tag"> 月售：{{ item.sales }} </span>
        <span class="shop__content__tags__tag">
          起送：{{ item.expressLimit }}
        </span>
        <span class="shop__content__tags__tag">
          基础运费：{{ item.expressPrice }}
        </span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name:'shopInfo',
    props: ['item', 'hideborder']
};
</script>

<style lang="scss" scoped>
.shop {
  display: flex;
  padding: 0.12rem 0;
  //border-bottom: 1px solid #f1f1f1;
  &__img {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    padding-bottom: .12rem;
    &--bordered {
      border-bottom:1px solid #f1f1f1;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      &__tag {
        margin-right: 0.16rem;
      }
    }
    &__highlight {
      color: #e93b3b;
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
    }
  }
}
</style>
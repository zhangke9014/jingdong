<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        'docker__item': true,
        'docker__item--active':index === currentIndex ,
      }"
      :key="item.icon"
    >
    <router-link :to="item.to">
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{ item.text }}</div>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props:['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe62e;', text: '首页',to:{name:'Home'} },
      { icon: '&#xe61a;', text: '购物车',to:{name:'CartList'} },
      { icon: '&#xe897;', text: '订单',to:{name:'orderList'} },
      { icon: '&#xe8a0;', text: '我的',to:{name:'Person'} }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
.docker {
  color: #333;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;

  //background-color: green;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0 0.02rem 0;
    }
    a {
      color:#333;
      text-decoration: none;
    }
    &--active {
      a{
        color:#1fa4fc;
      }
      color: #1fa4fc;
    }
  }

  &__title {
    font-size: 20px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>

<template>
  <div class="position">
    <span class="iconfont position__iconfont">&#xe7af;</span>
    长安区郭杜街道西安邮电大学安悦南楼317
    <span class="iconfont position__notice">&#xe866;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe8ef;</span>
    <input type="text" placeholder="山姆会员商店优惠商品" />
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
    />
  </div>
  <div class="icons">
    <div class="icons__item"
    v-for="item in iconslist"
    :key="item.decs">
      <img
        class="icons__item__ipg"
        :src="item.imgurl"
      />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'staticPart',
  setup () {
    const iconslist = [
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        desc: '菜市场'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        desc: '水果店'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        desc: '鲜花绿植'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        desc: '医药健康'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        desc: '家居时尚'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        desc: '烘焙蛋糕'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        desc: '签到'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        desc: '大牌免运'
      },
      {
        imgurl: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        desc: '红包套餐'
      }
    ]
    return { iconslist }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
.position {
  color: #333;
  position: relative;
  @include ellipsis;
  padding: 0.16rem 0.24rem 0.16rem 0;
  font-size: 0.16rem;
  line-height: 0.22rem;
  .position__iconfont {
    position: relative;
    font-size: 0.2rem;
    top: 0.01rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background-color: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  input {
    height: 100%;
    width: 80%;
    border-radius: 0.06rem;
  }
  .iconfont {
    position: relative;
    top: 0.04rem;
    display: inline-block;
    padding: 0 0.1rem 0 0.16rem;
    font-size: 0.2rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  //在网速慢的时候防止抖动,提前撑开图片高的区域;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__ipg {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
    }
  }
}
.gap {
  height: 0.1rem;
  background: #f1f1f1;
  margin: 0 -0.18rem;
}
</style>

<template>
  <div class="wrapper">
    <div class="search">
        <div class="search__back iconfont"
        @click="handleClickBack">&#xe679;</div>
        <div class="search__content">
            <span class="search__content__icon iconfont">&#xe8ef;</span>
            <input class="search__content__input"
            placeholder="请输入商品名称"/>
        </div>
    </div>
    <shopInfo :item="item"
    :hideborder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name"/>
    <Cart/>
  </div>
</template>

<script>
import shopInfo from "../../components/shopInfo.vue";
import Content from '../shop/Content.vue'
import Cart from '../shop/Cart.vue'
import { get } from '../../utlis/request'
import { useRouter,useRoute } from 'vue-router';
import { reactive } from "vue";
import { toRefs } from "vue";
//请求商家详情
const useShopInfoEffect = ()=>{
  const data = reactive({item:{}})
   const route = useRoute()
   // const item = {
    //   expressLimit: 0,
    //   expressPrice: 5,
    //   imgUrl: "http://www.dell-lee.com/imgs/vue3/near.png",
    //   name: "沃尔玛",
    //   sales: 10000,
    //   slogan: "VIP尊享满89元减4元运费券",
    //   _id: "1",
    // };
    const getItemData = async()=>{
      const result = await get (`/api/shop/${route.params.id}`)
      if(result?.errno==0&&result?.data){
        data.item = result.data
      }
    }
    const {item} = toRefs(data)
    return { item,getItemData }
}
//回退到上个页面逻辑
const useBackRouterEffect = ()=>{
  const router = useRouter()
  const handleClickBack = ()=>{
          router.back()
      }
      return { handleClickBack }
}

export default {
  name: "Shop",
  components: { shopInfo,Content,Cart },
  setup() {
    const { handleClickBack } = useBackRouterEffect()
    const { item,getItemData } = useShopInfoEffect()
    getItemData()
    return {item,handleClickBack };
      }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 0.18rem;
}
.search {
    display: flex;
    margin: .14rem 0 .04rem 0;
    height: .32rem;
    line-height: 0.32rem;
    &__back{
        width: 0.3rem;
        font-size:.24rem;
        color:#b6b6b6;
    }
    &__content{
        display: flex;
        flex:1;
        border-radius: .16rem;
        background-color: #f5f5f5  ;
        &__icon{
            width: 0.44rem;
            text-align: center;
            color:#b7b7b7;
        }
        &__input{
            display: block;
            width: 100%;
            padding-right: .2rem;
            border: none;
            outline: none;
            background: none;
            height: 0.32rem;
            color:#333;
            &::placeholder{
                color:#333;
            }
        }
    }
}
</style>
<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      :to="`/shop/${item._id}`"
      v-for="item in nearbylist"
      :key="item._id"
    >
    <shopInfo :item="item" />
  </router-link>
    
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utlis/request";
import shopInfo from "../../components/shopInfo.vue";
const usenearbyListEffect = () => {
  const nearbylist = ref([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno == 0 && result?.data?.length != 0) {
      //console.log(result.data);
      nearbylist.value = result.data;
    } else {
      showToast("登陆失败！");
    }
  };

  return { nearbylist, getNearbyList };
};
export default {
  name: "Nearby",
  components: { shopInfo },
  setup() {
    const { nearbylist, getNearbyList } = usenearbyListEffect();
    getNearbyList();
    return { nearbylist };
  },
};
</script>

<style lang="scss" scoped>
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: #333;
  }
  a{
    text-decoration: none;
  }
}
</style>


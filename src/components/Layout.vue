<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="/" to="/" icon="wap-home-o">商城</van-tabbar-item>
      <van-tabbar-item name="/Classification" to="/Classification" icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item name="/Shopping" to="/Shopping" icon="shopping-cart" :badge="length">购物车</van-tabbar-item>
      <van-tabbar-item name="/My" to="/My" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    
  },
  components: {},
  data() {
    return {
      active: "/",
      arr:[],
      length:0
    };
  },
  methods: {},
  mounted() {
    this.$store.commit('setNum',this.length)
     this.$api
      .getcard()
      .then((res) => {
        this.arr = res.shopList;
        this.length = this.arr.length
        console.log(this.length, "length1");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    "$route.path": {
      handler(val) {
        // console.log(val);
        this.active = val;
      },
      immediate: true
    }
  },
  computed: {
    num(){
      return  this.$store.state.num
    }
  }
};
</script>

<style scoped lang='scss'>
</style>
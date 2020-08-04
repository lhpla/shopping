<template>
  <div>
    <div style="height:40px;line-height:40px;border:1px solid skyblue;">
      <span @click="fanhui">&lt;</span>
      <span style="margin-left:150px;">最近浏览</span>
    </div>
    <div v-for="(item,index) in obj[0]" :key="index"><van-card :price="item.present_price" :title="item.name" :thumb="item.image" /></div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      obj:[],
    };
  },
  methods: {
    fanhui() {
      this.$router.push("/my");
    },
  },
  mounted() {
    //   取出浏览过的商品信息
    this.obj.push(JSON.parse(localStorage.getItem("z")));
    // console.log(this.obj, "最jin");
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>
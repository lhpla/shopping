<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">全部订单</div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div v-for="(item,index) in arr " :key="index">
          <div>订单编号：{{item.order_id}}</div>
          <div v-for="(item1,index1) in item.order_list " :key="index1">
            <van-card
              :num="item1.count"
              :price="item1.present_price"
              :title="item1.name"
              :thumb="item1.image_path"
            />
          </div>
          <div style="font-size:12px;">
            <div style="margin-left:150px;">创建时间：{{item.add_time}}</div>
            <div style="margin-left:150px;">收货地址：{{item.address}}</div>
            <div style="margin-left:150px;">共件商品合计：{{item.mallPrice}}￥</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待支付">内容 2</van-tab>
      <van-tab title="待发货">内容 3</van-tab>
      <van-tab title="待收货">内容 4</van-tab>
      <van-tab title="已完成">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      active: 0,
      arr: [],
    };
  },
  methods: {
    //返回上个页面
    back() {
      this.$router.push("/My");
    },
  },
  mounted() {
    this.$api
      .myOrder()
      .then((res) => {
        if (res.code === 200) {
          this.arr = res.list;
          console.log(this.arr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>
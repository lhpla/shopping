<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">结算订单</div>
    </div>
    <div style="width:100%;display:flex;">
      <div style="height:100px;line-height:100px;flex:1;">
        <van-icon name="location-o" style="font-size:40px;" />
      </div>
      <div style="flex:4;">
        <div style="display:flex;justify-content:space-between;">
          <div>收件人：{{obj1.name}}</div>
          <div style="margin-right:10px;">{{obj1.tel}}</div>
        </div>
        <div style="margin-top:20px;display:flex;justify-content:space-between;">
          <div style="font-size:14px;">收货地址：{{obj1.address}}</div>
          <div style="margin-right:10px;">&gt;</div>
        </div>
      </div>
    </div>
    <div>
      <img src="../../server/效果图/caitiao.jpg" alt style="width:100%;" />
    </div>
    <div v-for="(item,index) in value1" :key="index">
      <van-card
        :num="item.count"
        :price="item.present_price"
        desc="描述信息"
        :title="item.name"
        :thumb="item.image_path"
      />
    </div>
    <div>
      <van-submit-bar :price="sum*100" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      obj: {},
      obj1: {},
      value: [],
      value1: [],
      orderId: [],
      obj2: {},
      sum: 0,
      arr: {
        address: "",
        tel: "",
        totalPrice: "",
        idDirect: "",
        count: "",
      },
      arr1: [],
      sum: 0,
    };
  },
  methods: {
    back() {
      this.$router.push("/Shopping");
    },
    //提交订单
    onSubmit() {
      // console.log(this.value1,1111)
      // console.log(this.value1[0].present_price)
      // console.log(this.value1[0].count)
      // console.log(this.value1._id)
      this.$api
        .order(
          (this.arr = {
            address: this.obj1.address,
            tel: this.obj1.tel,
            orderId: this.orderId,
            totalPrice: this.sum,
            idDirect: false,
            count: this.value1[0].count,
          })
        )
        .then((res) => {
          this.obj2 = res;
          console.log(res, "res");
          this.$toast(res.msg);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.idDirect = this.$route.query.idDirect;
    this.sum = this.$route.query.sum;
    console.log(this.sum, "价格");
    console.log(this.idDirect, "%%");
    // 取出购物车页面要结算的商品
    this.value.push(JSON.parse(sessionStorage.getItem("key")));
    console.log(this.value, "结算商品");
    this.value.map((item) => {
      return (this.value1 = item);
    });
    console.log(this.value1, "pp");
    this.orderId = this.value1.map((item) => {
      return item.cid;
    });
    // console.log(this.value2, "|||");
    //获取默认地址
    this.$api
      .getDefaultAddress()
      .then((res) => {
        //判断是否有收货地址
        if (res.defaultAdd === null) {
          this.$toast("请添加收货地址");
        } else {
          this.obj1 = res.defaultAdd;
          console.log(this.obj1, "默认地址");
          console.log(res.defaultAdd, "默认地址");
          // console.log(res,'默认地址')
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(this.orderId)
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>
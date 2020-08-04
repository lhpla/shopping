<template>
  <div>
    <div v-if="arr.length>0">
      <div
        style="width:100%;height:40px;text-align:center;line-height:40px; border:1px solid skyblue;"
      >购物车</div>
      <div style="display:flex;width:100%;height:50px;border:1px solid gray;">
        <div style="width:50%;height:100%;line-height:50px;">
          <input type="checkbox" v-model="checkall" @change="changeall" />
          <span v-if="checkall===false">全选</span>
          <span v-else>取消全选</span>
        </div>
        <div>
          <div>合计：{{Totalprice}}￥</div>
          <div>确认订单</div>
        </div>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <div></div>
        <div>
          <van-button type="danger" @click="det">删除</van-button>&nbsp;&nbsp;&nbsp;
          <van-button type="danger" @click="tosettlement">去结算</van-button>
        </div>
      </div>
      <div v-if="arr.length > 0">
        <div v-for="(item,index) in arr" :key="index">
          <input type="checkbox" v-model="item.check" @change="changeitem" />
          <van-card :price="item.mallPrice" :desc="item.name" title="商品标题" :thumb="item.image_path">
            <template #footer>
              <van-stepper v-model="item.counte" theme="round" button-size="22" disable-input />
            </template>
          </van-card>
        </div>
      </div>
      <div v-else>暂无数据</div>
    </div>
    <div v-else>暂无商品，快去商城逛逛吧</div>
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "../components/Layout";
export default {
  name: "",
  props: {},
  components: {
    Layout,
  },
  data() {
    return {
      arr: [],
      checkall: false,
      id: [],
      arr1: [],
      sum: 0,
      // idDirect:false,
    };
  },
  methods: {
    //全选
    changeall() {
      this.arr.map((item) => {
        item.check = this.checkall;
        // console.log(item.check,'///')
      });
    },
    //单选
    changeitem() {
      this.checkall = this.arr.every((item) => {
        return item.check === true;
        console.log(changeitem, "++");
      });
    },
    //删除购物车商品
    det() {
      this.arr.map((item) => {
        if (item.check) {
          this.id.push(item.cid);
        }
        // console.log(this.id,'yu')
      });
      this.$api
        .deleteShopping(this.id)
        .then((res) => {
          // console.log(res,'ee')
          // console.log(this.id,'q')
        })
        .catch((err) => {
          console.log(err);
        });
      this.$api
        .getcard()
        .then((res) => {
          this.arr = res.shopList;
          // console.log(this.arr, "66");
          this.sum = 0;
        })
        .catch((err) => {
          console.log(err);
        });
      //删除后重新请求购物车数据
      this.$api
        .getcard()
        .then((res) => {
          this.arr = res.shopList;
          console.log(this.arr, "66");
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.arr.length > 1) {
        this.checkall = false;
      }
    },
    //去结算
    tosettlement() {
      this.arr.map((item) => {
        if (item.check === true) {
          let idDirect = false;
            this.arr1 = this.arr.filter((item1) => {
              if (item1.check) {
                return item1;
              }
            });
            console.log(this.arr1, "hh");
            sessionStorage.setItem("key", JSON.stringify(this.arr1));
            console.log(this.sum, "价格");
        } else {
          this.$toast("请选择要购买的商品");
        }
      });
       this.$router.push({
              path: "/Settlement",
              query: { idDirect: false, sum: this.sum },
            });
    },
  },
  mounted() {
    this.$api
      .getcard()
      .then((res) => {
        this.arr = res.shopList;
        console.log(this.arr, "66");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {},
  computed: {
    Totalprice() {
      this.arr.map((item) => {
        if (item.check) {
          this.sum += item.counte * item.mallPrice;
        }
      });
      return this.sum.toFixed(2);
    },
    num() {
      return (this.$store.state.num = this.arr.length);
    },
  },
};
</script>

<style scoped lang='scss'>
</style>
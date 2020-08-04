<template>
  <div>
    <div style="display:flex; justify-content:center;align-items:center;width:100%;height:30px;">
      <div>会员中心</div>
    </div>
    <div style="width:100%;height:200px;background:#E30C7B;display:flex;flex-direction: column;">
      <div style="color:white;margin-left:350px;margin-top:10px;">
        <van-icon name="setting" @click="setup" />
      </div>
      <div style="width:100%;display:flex;justify-content:center;">
        <div class="img">
          <img :src="userimg" alt width="60px" height="60px" style="border-radius:50%;" />
        </div>
      </div>
      <div style="width:100%; display:flex;justify-content:center;color:white;">
        <h3>欢迎您：</h3>
        <span style="line-height:60px;">{{username}}</span>
      </div>
      <div style="width:100%;text-align:center;font-size:14px;color:white;" @click="loginout">退出登录</div>
    </div>
    <div style="margin:10px 0;">
      <van-grid column-num="5">
        <van-grid-item icon="balance-pay" text="待付款" />
        <van-grid-item icon="free-postage" text="代发货" />
        <van-grid-item icon="points" text="待收货" />
        <van-grid-item icon="thumb-circle-o" text="评价" @click="evaluate" />
        <van-grid-item icon="passed" text="已完成" @click="Completed" />
      </van-grid>
    </div>
    <!-- 全部订单 -->
    <div class="my" @click="Allorders">
      <div style="font-size:14px;margin:10px 0;">
        <van-icon name="records" style="font-size:18px!important;" />&nbsp;&nbsp;&nbsp;全部订单
      </div>
      <div style="margin:10px 20px;">&gt;</div>
    </div>
    <!-- 收藏商品 -->
    <div class="my1" @click="Collectionofgoods">
      <div style="font-size:14px;margin:10px 0;">
        <van-icon name="star-o" style="font-size:18px!important;" />&nbsp;&nbsp;&nbsp;收藏商品
      </div>
      <div style="margin:10px 20px;">&gt;</div>
    </div>
    <!-- 地址管理 -->
    <div class="my1" @click="address">
      <div style="font-size:14px;margin:10px 0;">
        <van-icon name="location-o" style="font-size:18px!important;" />&nbsp;&nbsp;&nbsp;地址管理
      </div>
      <div style="margin:10px 20px;">&gt;</div>
    </div>
    <!-- 最近浏览 -->
    <div class="my1" @click="Recentbrowsing">
      <div style="font-size:14px;margin:10px 0;">
        <van-icon name="eye-o" style="font-size:18px!important;" />&nbsp;&nbsp;&nbsp;最近浏览
      </div>
      <div style="margin:10px 20px;">&gt;</div>
    </div>
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "../components/Layout";
import { Dialog } from "vant";
export default {
  name: "",
  props: {},
  components: {
    Layout,
  },
  data() {
    return {
      username: "",
      userimg: "",
    };
  },
  methods: {
    //个人资料
    setup() {
      if (localStorage.getItem("user")) {
        this.$router.push("/Setup");
      } else {
        Dialog.alert({
          title: "检测到您还没登录",
          message: "是否跳转到登录/注册页面",
        }).then(() => {
          this.$router.push("/Login");
        });
      }
    },
    // 全部订单
    Allorders() {
      if (localStorage.getItem("user")) {
        this.$router.push("/Allorders");
      } else {
        Dialog.alert({
          title: "检测到您还没登录",
          message: "是否跳转到登录/注册页面",
        }).then(() => {
          this.$router.push("/Login");
        });
      }
    },
    //地址管理
    address() {
      if (localStorage.getItem("user")) {
        this.$router.push("/Address");
      } else {
        Dialog.alert({
          title: "检测到您还没登录",
          message: "是否跳转到登录/注册页面",
        }).then(() => {
          this.$router.push("/Login");
        });
      }
    },
    // 收藏商品
    Collectionofgoods() {
      if (localStorage.getItem("user")) {
        this.$router.push("/Collectionofgoods");
      } else {
        Dialog.alert({
          title: "检测到您还没登录",
          message: "是否跳转到登录/注册页面",
        }).then(() => {
          this.$router.push("/Login");
        });
      }
    },
    // 已完成
    Completed() {
      if (localStorage.getItem("user")) {
        this.$router.push("/Completed");
      } else {
        Dialog.alert({
          title: "检测到您还没登录",
          message: "是否跳转到登录/注册页面",
        }).then(() => {
          this.$router.push("/Login");
        });
      }
    },
    //评价
    evaluate() {
      if (localStorage.getItem("user")) {
        this.$router.push("/Evaluate");
      } else {
        Dialog.alert({
          title: "检测到您还没登录",
          message: "是否跳转到登录/注册页面",
        })
          .then(() => {
            this.$router.push("/Login");
          })
      }
    },
    Recentbrowsing(){
      this.$router.push('/Recentbrowsing')
    },
    //退出登录O
    loginout() {
      this.$api
        .loginOut()
        .then((res) => {
          console.log(res, "退出登录");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.$api
      .Userinformation()
      .then((res) => {
        this.arr = res;
        this.username = res.userInfo.nickname;
        this.userimg = res.userInfo.avatar;
        // console.log(this.username)
        console.log(this.arr, "**");
        // console.log(this.userimg)
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
.img {
  border-radius: 50%;
  // background-image: url('../../server/效果图/login.jpg');
  width: 60px;
  height: 60px;
}
.my {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid skyblue;
  border-bottom: 1px solid skyblue;
  margin: 20px 0;
}
.my1 {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid skyblue;
}
</style>
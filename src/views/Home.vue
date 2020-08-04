<template>
  <div class="body">
    <div style="height:40px!important;">
      <div class="title">
        <!-- 定位 -->
        <div @click="location">
          {{city}}
          <van-icon name="arrow-down" />
        </div>
        <!-- 搜索框 -->
        <div style="background:white;margin-left:10px; height:24px;border-radius: 8%;">
          <i class="el-icon-search"></i>
          <input
            type="text"
            placeholder="请输入搜索关键词"
            style="border:none;outline: none;"
            v-model="value"
          />
        </div>
        <div style="margin-left:10px;">
          <div v-if="show===false">
            <van-button type="default" style="height:30px;" @click="search" @input="value" v-model="value">搜索</van-button>
          </div>
          <div v-else>
            <van-button type="default" style="height:30px;" @click="cancel">取消</van-button>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :overlay="app" duration="0" style="height:94%;">
      <div v-for="(item,index) in arr" :key="index">
        <div v-html="item.name" style="margin-bottom:5px;"></div>
      </div>
    </van-popup>
    <!-- 轮播图 -->
    <div style="height:200px;">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index,) in images" :key="index">
          <img v-lazy="item.image" style="width:100%; " @click="xq(item)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品分类 -->
    <div style="display:flex;">
      <div v-for="(item1,index1) in classification" :key="index1">
        <div @click="tiao(item1,index1)">
          <img :src="item1.image" alt style="width:65px;" />
          <span style="font-size:14px;">{{item1.mallCategoryName}}</span>
        </div>
      </div>
    </div>
    <!-- 小广告 -->
    <div>
      <img :src="advertisement" alt width="100%" style="margin:10px 0;" />
    </div>
    <!-- 平滑 -->
    <div style="width:375px;border:1px solid gray;">
      <div>商品推荐</div>
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <div v-for="(item,index) in Productrecommendation" :key="index" class="details">
            <div>
              <img :src="item.image" alt width="125px" @click="xq(item)" />
            </div>
            <div class="details1">{{item.goodsName}}</div>
            <div>
              ￥{{item.mallPrice}}
              <s style="color:ggray;font-size:14px;">￥{{item.price}}</s>
            </div>
            <div style="display:flex;justify-content:center;">
              <div
                style="width:30px;height:30px;text-align:center;line-height:30px;background:#FECA3A;color:white;border-top-left-radius:5px;"
              >
                <van-icon name="cart-o" style @click="jionshopping(item,index)" />
              </div>
              <div
                style="width:70px;height:30px;line-height:30px;background:#FF4C38;color:white;font-size:14px;text-align:center;border-top-right-radius:5px;"
                @click="xq(item)"
              >查看详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <F1 :floorName="onef" :floor="f1"></F1>
    <F1 :floorName="twof" :floor="f2"></F1>
    <F1 :floorName="sf" :floor="f3"></F1>
    <div class="hot">热销商品</div>
    <div>
      <div class="hot1">
        <div v-for="(item,index) in hotGoods" :key="index" style="width:180px;" @click="xq(item)">
          <div>
            <img :src="item.image" alt width="180px" />
          </div>
          <div class="xq">{{item.name}}</div>
          <div style="width:100%;text-align:center;">
            <span style="color:red;">{{item.mallPrice}}</span>&nbsp;&nbsp;&nbsp;
            <s style="font-size:14px;color:gray;">{{item.mallPrice}}</s>
          </div>
        </div>
      </div>
    </div>
    <Layout></Layout>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import F1 from "../components/F1";
import Layout from "../components/Layout";
import { Dialog } from "vant";
export default {
  name: "",
  props: {},
  components: {
    F1,
    Layout,
  },
  data() {
    return {
      //定位
      city: "",
      //轮播图
      images: [],
      //商品分类
      classification: [],
      //小广告
      advertisement: "",
      //平滑
      Productrecommendation: "",
      //1楼
      onef: "",
      f1: [],
      //2楼
      twof: "",
      f2: [],
      //3楼
      sf: "",
      f3: [],
      //热销商品
      hotGoods: [],
      //标签栏
      active: 0,
      //商品详情
      spxq: [],
      //搜索value值
      value: "",
      arr: [],
      show: false,
      app: false,
      pla:''
    };
  },
  methods: {
    //查看详情
    xq(item) {
      console.log(item, "uuu");
      // console.log(item.goodsId, "qqq");
      this.$router.push({ path: "/Details", query: { id: item.goodsId } });
    },
    //跳转分类
    tiao(item1, index1) {
      // console.log(item1)
      console.log(index1, "下标");
      this.$router.push({
        path: "/classification",
        query: {
          id: index1,
          item: item1,
        },
      });
      console.log(item1.bxMallSubDto[index1], "((");
    },
    //判断是否登录了
    // add() {
    //   this.$utils.checkLogin(this.jionshopping)
    // },
    //加入购物车
    jionshopping(item, index) {
      this.$api
        .jionshopping({ id: this.Productrecommendation[index].goodsId })
        .then((res) => {
          // console.log(res, "000");
          if (localStorage.getItem("user")) {
            this.$toast("加入购物车成功");
          } else {
            Dialog.confirm({
              title: "检测到您还没登录",
              message: "是否跳转到登录/注册页面",
            }).then(() => {
              this.$router.push("/Login");
            });
          }
          // console.log(this.Productrecommendation[index].goodsId, "11");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //模糊搜索
    search() {
      this.show = true;
      console.log(this.value, "value");
      this.$api
        .searchs(this.value)
        .then((res) => {
          if (res.code === 200) {
            this.arr = res.data.list;
            // console.log(this.arr,'arr')
            this.arr.map((item) => {
              item.name = item.name.replace(
                this.value,
                `<span style='color:red;'>${this.value}</span>`
              );
            });
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //取消
    cancel() {
      this.show = false;
      this.value = ''
      this.arr = null
    },
    //定位
    location(){
      this.$router.push({
        path:'/Location',
        query:{
          city:this.city
        }
      })
    }
  },
  mounted() {
    // console.log(this.$utils,'utils')
    let _this = this;
    AMap.plugin("AMap.Geolocation", function () {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB",
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        _this.city = data.addressComponent.city;
        // console.log(data);
      }

      function onError(data) {
        // 定位出错
      }
    });
    //轮播图
    this.$api
      .home()
      .then((res) => {
        //轮播图
        res.data.slides.map((item) => {
          this.images.push(item);
        });
        //打印轮播图的数据
        // console.log(this.images, "zzz");
        //打印首页请求的数据
        // console.log(res.data);
        //商品分类
        this.classification = res.data.category;
        console.log(this.classification, "&&");
        //小广告
        this.advertisement = res.data.advertesPicture.PICTURE_ADDRESS;
        // console.log(this.advertisement)
        //商品推荐
        this.Productrecommendation = res.data.recommend;
        // console.log(this.Productrecommendation,'@@')
        // console.log(res.data.recommend[0].goodsId,'##')
        //1楼
        this.onef = res.data.floorName.floor1;
        this.f1 = res.data.floor1;
        // console.log(this.f1)
        // console.log(this.onef)
        // console.log(typeof(this.onef))
        //2楼
        this.twof = res.data.floorName.floor2;
        this.f2 = res.data.floor2;
        // console.log(this.f2)
        // console.log(this.twof,'456')
        // console.log(typeof(this.twof))
        //3楼
        this.sf = res.data.floorName.floor3;
        this.f3 = res.data.floor3;
        // console.log(this.f3)
        // console.log(this.sf,'789')
        // console.log(typeof(this.sf))
        //热销商品
        this.hotGoods = res.data.hotGoods;
        // console.log(this.hotGoods);
      })
      .catch((err) => {
        console.log(err);
      });
    //平滑插件
    let wrapper = document.querySelector(".wrapper");
    let scroll = new BScroll(".wrapper", {
      startX: 0,
      scrollX: true,
      click: true,
    });
  },
  watch: {
    //监听input
    value(){
      if(this.value === ''){
        this.show = false//取消弹出层
        this.arr = null//清空v-html
      }
    }
  },
  computed: {},
};
</script>

<style lang='scss'>
.body {
  position: relative;
}
.title {
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #f2f2f2;
  height: 40px;
  align-items: center;
  position: fixed;
  clear: both;
}
.wrapper {
  display: flex;
  overflow: hidden;
}
.content {
  display: flex;
  .details1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .details {
    width: 123px;
    border: 1px solid skyblue;
  }
}
.hot {
  width: 100%;
  color: red;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #ededed;
  clear: both;
}
.hot1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.xq {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: red;
}
.tabbar {
  font-size: 20px;
  margin-left: 8px;
}
.tabbar1 {
  font-size: 16px;
}
</style>
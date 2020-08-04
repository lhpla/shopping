<template>
  <div class="box">
    <div class="box1">商品分类</div>
    <div style="display:flex;flex-driction:row;">
      <!-- 大分类 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          :title="item.mallCategoryName"
          v-for="(item,index) in classification"
          :key="index"
        />
      </van-sidebar>
      <!-- 小分类 -->
      <van-tabs v-model="active" @click="onClick" class="xq">
        <div v-for="(item,index) in Subclass" :key="index">
          <van-tab :title="item.mallSubName" :name="item.mallSubId">
            <div
              v-for="(item,index) in arr"
              :key="index"
              style="display:flex;flex-driction:row;margin:5px 0;"
            @click="toDetails(item)"
            >
              <div style="border:1px solid skyblue;">
                <img :src="item.image" alt width="100px" />
              </div>
              <div>
                <div style="color:red;">{{item.name}}</div>
                <div style="margin-top:50px;">
                  <span style="color:red;">￥{{item.present_price}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <s style="font-size:14px;color:gray;">{{item.orl_price}}</s>
                </div>
              </div>
            </div>
          </van-tab>
        </div>
      </van-tabs>
    </div>
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "../components/Layout";
import { Toast } from "vant";
import { Notify } from "vant";
export default {
  name: "Classification",
  props: {},
  components: {
    Layout,
  },
  data() {
    return {
      active: 0,
      activeKey: 0,
      classification: [],
      Subclass: [],
      arr: [],
      ar: [],
      ids: "",
      are:[],
      ara:[]
    };
  },
  methods: {
    //点击选择小分类
    onClick(name, title) {
      this.$api
        .classification(name)
        .then((res) => {
          this.arr = res.dataList;
          console.log(this.arr, 555);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击选择大分类
    onChange(index) {
      this.$api
        .home()
        .then((res) => {
          this.classification = res.data.category;
          this.Subclass = res.data.category[index].bxMallSubDto;
          // console.log(this.classification,'888')
          // console.log(this.Subclass,'666')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //请求小分类的商品数据
    getData(id) {
      this.$api
        .classification(id)
        .then((res) => {
          this.arr = res.dataList;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //去详情页
    toDetails(item){
      console.log(item, "qqq");
      this.$router.push({ path: "/Details", query: { id: item.id} });
    }
  },
  mounted() {
    // 接收首页上面分类跳转传过来的参数
    this.are = this.$route.query.id
    this.activeKey = this.are
    this.ara = this.$route.query.item
    // console.log(this.activeKey)//打印传过来的下标
    console.log(this.ara,'传过来的每一项')
    console.log(this.are,'传过来的下标')
    //点击首页下方导航分类跳转到分类的首次加载数据
    //通过点击首页商品分类发的请求
    if(this.ara!== undefined &&this.are !== undefined){
      this.$api
      .home()
      .then((res) => {
        this.classification = res.data.category;
        this.Subclass = res.data.category[0].bxMallSubDto;
        this.ids = this.classification[this.are].bxMallSubDto[0].mallSubId;
        console.log(this.ids);
        this.getData(this.ids);
        console.log(this.Subclass, 321);
        console.log(this.classification, 123);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      //通过导航点击发的请求
      this.$api
      .home()
      .then((res) => {
        this.classification = res.data.category;
        this.Subclass = res.data.category[0].bxMallSubDto;
        this.ids = this.classification[0].bxMallSubDto[0].mallSubId;
        console.log(this.ids);
        this.getData(this.ids);
        console.log(this.Subclass, 321);
        console.log(this.classification, 123);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
      
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.box1 {
  width: 100%;
  text-align: center;
  margin: 10px 0;
  border-bottom: 2px solid #f1f8ff;
}
.xq {
  font-size: 14px;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
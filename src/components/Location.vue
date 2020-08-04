<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">城市列表</div>
    </div>
    <div>
      <form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="请输入城市关键字"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
    </div>
    <div>当前城市</div>
    <div style="background:#F2F2F2;margin:10px 0;height:40px;line-height:40px;">{{city}}</div>
    <div>热门城市</div>
    <div style="display:flex;flex-wrap:wrap;">
      <div
        v-for="(item,index) in hotcity"
        :key="index"
        style="width:110px;height:40px;background:#F2F2F2;margin:1px;text-align:center;line-height:40px;"
      >{{item.name}}</div>
    </div>
    <div>
      <van-index-bar>
        <div>
          <div v-for="(item,index) in indexList" :key="index">
             <van-index-anchor :index="index" style="background:#F2F2F2;"/>
             <div v-for="(item1,index1) in item" :key="index1">
               <van-cell :title="item1.name" style="border-bottom:1px solid #F2F2F2;"/>
             </div>
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import indexList from "../http/可能要用的js文件/city";
import { Toast } from 'vant';
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      value: "",
      city: "",
      indexList: [],
      hotcity: [],
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
     onSearch(val) {
      //  console.log(this.value,'value')
       Toast(val);
    },
    onCancel() {
       Toast('取消');
    },
  },
  mounted() {
    this.city = this.$route.query.city
    console.log(this.city,'city')
    console.log(indexList);
    this.hotcity = indexList.data.hotCities;
    console.log(this.hotcity, "热门");
    this.indexList = indexList.data.cities;
    console.log(this.indexList, "所有城市");
    for(let i in this.indexList){

    }
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
// .div{
//   flex
// }
</style>
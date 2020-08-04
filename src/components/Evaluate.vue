<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">评价中心</div>
    </div>
    <div>
      <img src="../../server/效果图/evaluate.jpg" alt style="width:100%" />
    </div>
    <van-tabs v-model="active">
      <van-tab title="待评价">
        <div v-for="(item,index) in obj" :key="index">
          <van-card :title="item.name" :thumb="item.image_path" />
          <div>
            <div></div>
            <div>
              <button @click="toevaluate(item)">去评价</button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已评价 ">
        <div v-for="(item,index) in obj2" :key="index">
          <div style="display:flex;">
            <div><img :src="item.goods[0].image" alt="" style="width:150px"></div>
            <div>
              <div>{{item.goods[0].name}}</div>
              <div style="margin-top:90px;"><van-rate v-model="item.rate" /></div>
            </div>
          </div>
          <div style="background:gray;color:white">用户评价：{{item.content}}</div>
        </div>
      </van-tab>
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
      obj: [],
      obj1: [],
      obj2:{}
    };
  },
  methods: {
    back() {
      this.$router.push("/My");
    },
    toevaluate(item) {
      this.$router.push({
        path: "/EvaluationCenter",
        query: { arr: item },
      });
    },
  },
  mounted() {
    //查询未评价
    this.$api
      .tobeEvaluated()
      .then((res) => {
        this.obj = res.data.list
        console.log(res, "111");
      })
      .catch((err) => {
        console.log(er);
      });
      //查询已评价
      this.$api.alreadyEvaluated().then(res=>{
        this.obj2 = res.data.list
        console.log(this.obj2,'已评价')
      }).catch(err=>{
        console.log(err)
      })
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>
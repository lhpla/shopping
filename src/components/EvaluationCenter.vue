<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">评价中心</div>
    </div>
    <div style="display:flex;">
      <!-- 商品图片 -->
      <div>
        <img :src="obj.image_path" alt style="width:150px;" />
      </div>
      <div>
        <!-- 商品评分 -->
        <div>商品评分</div>
        <div style="margin-top:90px;">
          <van-rate v-model="value" />
        </div>
      </div>
    </div>
    <!-- 输入评价 -->
    <div>
      <van-field v-model="message" rows="1" autosize type="textarea" placeholder="请输入评价" />
    </div>
    <!-- 图片上传 -->
    <div>
      <van-field name="uploader">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
    </div>
    <!-- 是否匿名 -->
    <div>
      是否匿名：<van-switch v-model="checked" size="24px" />
    </div>
    <!-- 提交评价 -->
    <div>
      <van-button type="primary" @click="publish">提交按钮</van-button>
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
      obj: [],
      obj1: {},
      value: 1,
      message: "",
      checked: false,
      uploader: [],
    };
  },
  methods: {
    back() {
      this.$router.push("/Evaluate");
    },
    publish() {
      this.$api
        .Productreviews(
          (this.obj1 = {
            id: this.obj.cid,
            rate: this.value,
            content: this.message,
            anonymous: this.checked,
            _id: this.obj._id,
            order_id: this.obj.order_id,
            image: this.uploader,
          })
        )
        .then((res) => {
          console.log(res, "ppp");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.obj = this.$route.query.arr;
    console.log(this.obj, "111");
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>
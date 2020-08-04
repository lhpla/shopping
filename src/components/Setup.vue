<template>
  <div>
    <div style="height:40px;line-height:40px;border:1px solid skyblue;">
      <span @click="fanhui">&lt;</span>
      <span style="margin-left:150px;">个人资料</span>
    </div>
    <div style="margin-top:10px;border-bottom:1px solid skyblue;">githup</div>
    <div style="display:flex;justify-content: space-between;width:100%;line-height:60px;">
      <div>头像</div>
      <div>
        <img :src="arr.avatar" width="60px" alt style="border-radius: 50%;" />
        <span style="margin-right:30px;">&gt;</span>
      </div>
    </div>
    <van-field v-model="arr.username" disabled label="用户名" />
    <van-field v-model="arr.nickname" label="昵称" />
    <van-field v-model="arr.gender" label="性别" />
    <van-field placeholder="请输入邮箱" label="邮箱" />
    <van-cell is-link @click="showPopup">
      <van-field placeholder="请输入出生年月" label="出生年月" v-model="data" />
    </van-cell>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="newtime"
      />
    </van-popup>
    <div style="margin-top:20px;">
      <van-button type="primary" style="width:100%;" @click="preservation">保存</van-button>
    </div>
    <div style="margin-top:20px;">
      <van-button type="default" style="width:100%;" @click="fanhui">取消</van-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: '',
      arr: {},
      data: "",
      information: {
        gender: "",
        year: "",
        month: "",
        day: "",
        id: "",
        nickname: "",
      },
      show: false,
      year:null,
      month:null,
      day:null,
    };
  },
  methods: {
    newtime(value) {
      // console.log(value, "bn");
      // console.log(this.currentDate,'88')
      this.show = false;
      this.data = dayjs(value).format("YYYY年MM月DD日");
      this.year = dayjs(value).year();
      this.month = dayjs(value).month()+1;
      this.day = dayjs(value).date();
      console.log(this.month, "month");
      console.log(this.data, "data");
      // console.log(this.arr,'mn')
    },
    fanhui() {
      this.$router.push("/My");
    },
    showPopup() {
      this.show = true;
    },
    preservation() {
      console.log(this.year, "年");
      console.log(this.month, "月");
      console.log(this.day, "日");
      this.$api
        .setup(
          (this.information = {
            gender: this.arr.gender,
            year: this.year,
            month: this.month,
            day: this.day,
            id: this.arr._id,
            nickname: this.arr.nickname,
          })
        )
        .then((res) => {
          // console.log(this.information, "nb");
          console.log(res, "rrr");
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
        this.arr = res.userInfo;
        this.data = `${res.userInfo.year}年${res.userInfo.month}月${res.userInfo.day}日`;
        // console.log(this.data, "55");
        console.log(this.arr, "**");
        this.currentDate = this.data;
        // console.log(this.currentDate, "*****"); 
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
// .div{justify-content: space-between;
// border-radius: 50%;}
</style>
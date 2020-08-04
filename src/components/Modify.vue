<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">编辑地址</div>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-default="value"
      :address-info='addressinfo'
    />
  </div>
</template>

<script>
import areaList from "../../src/http/可能要用的js文件/area.js";
import { Toast } from "vant";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      areaList,
      searchResult: [],
      addressinfo:{},
      a:'',
      id:''
    };
  },
  methods: {
    //修改保存
    onSave(content) {
      // console.log(this.addressinfo._id,'hehe')
      console.log(this.addressinfo,'iii')
      this.$api.address(this.addressinfo).then(res=>{
        console.log(res,'///')
        this.a = res.msg
        Toast(this.a)
        // console.log(res.msg)
      }).catch(err=>{
        console.log(err)
      })
      
    },
    //修改删除
    onDelete() {
      console.log(this.addressinfo._id,'hh')
      this.$api.deleteAddress(this.addressinfo._id).then(res=>{
        console.log(res)
        Toast(res.msg);
        this.$router.push('/Address')
      }).catch(err=>{
        console.log(err)
      })
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [
         
        ];
      }
    },
    back() {
      this.$router.push("/Address");
    },
    //设置默认地址
    value(){
      this.$api.setDefaultAddress(this.id=this.addressinfo._id).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted() {
     this.addressinfo = this.$route.query.id;
    console.log(this.addressinfo, "121")
    console.log(this.addressinfo._id,'gg')
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>
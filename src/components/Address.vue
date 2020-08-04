<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">地址列表</div>
    </div>
<van-address-list
  v-model="chosenAddressId"
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      chosenAddressId: '1',
      list:[ {
          id: '',
          name: '',
          tel: '',
          address: '',
          isDefault: '',
          isDefault: true,
        }],
    };
  },
  methods: {
    //新增
    onAdd() {
      this.$router.push('/Newaddress')
    },
    //编辑修改
    onEdit(item, index) {
      // console.log(item,'555')
      this.$router.push({
        path:'/Modify',
        query:{
          id:item
        }
      })
      
      Toast('编辑地址:' +(index+1));
    },
    //返回我的
    back(){
      this.$router.push('/My')
    }
  },
  mounted() {
    //查询用户收获地址请求
    this.$api.getAddress().then(res=>{
      this.list = res.address
      console.log(this.list,'++')
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
<template>
 <div>
      <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">我的收藏</div>
    </div>
     <div v-for="(item,index) in obj" :key="index">
         <van-card
  :price="item.present_price"
  :title="item.name"
  :thumb="item.image_path"
/> <van-button size="mini" @click="dtel(item)">删除</van-button>
     </div>
 </div>
</template>

<script>
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
         obj:[]
     }
   },
   methods: {
       back(){
           this.$router.push('/My')
       },
       dtel(item){
           console.log(item.cid)
           this.$api.cancelCollection(item.cid).then(res=>{
               console.log(res)
           }),
           this.$api.collection1().then(res=>{
           this.obj = res.data.list
           console.log(res)
           console.log(this.obj)
       }).catch(err=>{
           console.log(err)
       })
       }
   },
   mounted() {
       this.$api.collection1().then(res=>{
           this.obj = res.data.list
           console.log(res)
           console.log(this.obj)
       }).catch(err=>{
           console.log(err)
       })
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>
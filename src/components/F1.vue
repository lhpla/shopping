<template>
 <div>
        <div class="floors">
            <span class="f" v-if="floorName==='休闲食品'">1F</span>
            <span class="f" v-if="floorName==='新鲜水果'">2F</span>
            <span class="f" v-if="floorName==='营养奶品'">3F</span>
            {{floorName}}
        </div>
        <div v-for="(item,index) in floor" :key="index">
        <img :src="item.image" alt="" width="182px" v-if="index===0" style="float:left;"  @click="xq(item)">
        <img :src="item.image" alt="" width="182px" v-else-if="index===floor.length-4" style="float:left;"  @click="xq(item)">
        <img :src="item.image" alt="" width="182px" v-else style="float:right;"  @click="xq(item)">
        </div>
 </div>
</template>

<script>
 export default {
   name: '',
   props: {
       floorName:{
           type:String
       },
       floor:{
           type:Array
       }
   },
   components: {

   },
   data () {
     return {

     }
   },
   methods: {
     xq(item) {
        console.log(item.goodsId, "qqq");
          this.$router.push({ path: "/Details", query: { id: item.goodsId } });
        
    },
   },
   mounted() {
    //    console.log(this.floor,111)
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
    .floors{
        // border: 1px solid black;
        text-align: center;
        line-height: 30px;
        color: red;
        margin: 10px 0;
        background-color: #EDEDED;
        .f{
            width: 20px;
            height: 20px;
            background-color: red;
            color: white;
            border-radius: 50%;
        }
    }
</style>
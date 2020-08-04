<template>
 <div class="box">
     <div class="hui" @click="hui"><van-icon name="arrow-left" /></div>
        <div style="width:339px;height:400px;margin:50px 0; background:white;">
            <div><h3>登录/注册</h3></div>
       <van-form @submit="onSubmit">
  <van-field
    v-model="nickname"
    name="用户名"
    placeholder="USERNAME"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    placeholder="PASSWORD"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
</van-form>
        <div style="border-bottom:1px solid gray;">
            手机号码<input type="number" placeholder="仅注册需要" style="border:none;outline:none;margin:10px;">
        </div>
        <div style="border-bottom:1px solid gray;">
            短信验证码<input type="text" placeholder="仅注册需要" style="border:none;outline:none;margin:10px;width:100px;">
            <van-button type="primary" @click="btn" :disabled="flag">{{yzm}}</van-button>
        </div>
        <div style="border-bottom:1px solid gray;display:flex;flex:;">
            <div>验证码<input type="text" placeholder="仅注册需要" v-model="verify" style="border:none;outline:none;margin:10px;width:100px;"></div>
            <div v-html="images" @click="getData"></div>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: space-around;margin:20px 0;">
            <van-button type="info" native-type="button" @click="login">
        登录
    </van-button>
    <van-button type="info" native-type="button" @click="register">
        注册
    </van-button></div>
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
         //验证码
         images :'',
         //登录/注册
         verify:'',
         nickname: '',
         password: '',
         user:'',
         flag:false,
         yzm:'发送验证码'
     }
   },
   methods: {
       //页头返回
       hui(){
           this.$router.push('/')
       },
       //验证码
       getData(){
           this.$api.geVerificationCodet().then(res => {
                this.images = res
            //    console.log(res)
            //    console.log(this.images)

           }).catch(err=> {
               console.log(err)
           })
       },
        onSubmit() {},
        //注册
    register(){
        this.$api.register(
            this.user={nickname:this.nickname,
                 password:this.password,
                 verify:this.verify}
        ).then(res =>{
            if(res.code===200){
               localStorage.setItem('user',JSON.stringify(this.user))
               this.$toast.success(res.msg)
               this.$router.push('/')
            }
            if(res.code===-1){
                this.$toast.fail(res.msg)
            }
            if(res.code===-2){
                this.$toast.fail(res.msg)
            }
                // console.log(this.user)
            })
    },
    //登录
    login(){
        this.$api.login(
            this.user={nickname:this.nickname,
                 password:this.password,
                 verify:this.verify}
        ).then(res =>{
            if(res.code===200){
               this.$toast.success(res.msg)
               this.$router.push('/')
            }
            if(res.code===-1){
                this.$toast.fail(res.msg)
            }
            if(res.code===-2){
                this.$toast.fail(res.msg)
            }
                console.log(this.user)
            })
    },
    btn(){
        this.flag = true
        let time = 10
        let timer = setInterval(item=>{
            time --
            this.yzm = `${time}s后重新发送`
            if(time === 0){
                this.flag = false
                this.yzm = '重新发送'
                clearInterval(timer)
            }
        },1000)
    }
    
   },
   mounted() {
       this.getData () 
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
    .box{
        display:flex; 
        justify-content:center;
        height: 100vh;
        background-image: url('../../server/效果图/login.jpg');
        .hui{
            border-radius: 50%;
            width:30px;height:30px;
            border:1px solid gray;
            line-height: 30px;
            text-align: center;
            margin:5px;
        }
    }
</style>
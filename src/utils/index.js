// import { Dialog } from "vant"

// // 默认导出
// export default{
//     checkLogin(next){
//         if(localStorage.getItem('user')){
//             next()
//         }else{
//             Dialog.alert({
//                 title:'检测到您还没登录',
//                 message:'是否跳转到登录/注册页面'
//             }).then(() => {
//              this.$router.push('/Login')
//               })
//         }
//     }
// }
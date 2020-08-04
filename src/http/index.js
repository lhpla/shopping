//封装axios
import axios from 'axios'

//创建一个axios 实例
const service = axios.create({
    //基础路径
    baseURL:'/api',
    //超时时间
    timeout:10000
})
//相应拦截
service.interceptors.response.use((res)=>{
    return res.data
},err=>{
    console.log(err)
})

//导出
export default service
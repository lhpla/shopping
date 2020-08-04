//封装所有请求
import service from './index'

export default {
    //注册
    register({ nickname, password, verify }) {
        return service.post('/register', {
            nickname,
            password,
            verify
        })
    },
    //登录
    login({ nickname, password, verify }) {
        return service.post('/login', {
            nickname,
            password,
            verify
        })
    },
    //验证码
    geVerificationCodet() {
        return service.get('/verify')
    },
    //首页数据请求
    home() {
        return service.get('/recommend')
    },
    //分类数据请求
    classification(id) {
        return service.get(`/classification?mallSubId=${id}`)
    },
    //单个商品详情请求
    details(id) {
        return service.get(`/goods/one?id=${id}`)
    },
    //获取用户信息请求
    Userinformation() {
        return service.post('/queryUser')
    },
    //加入购物车
    jionshopping({ id }) {
        return service.post('/addShop', { id })
    },
    //查询获取购物车数据
    getcard() {
        return service.post('/getCard')
    },
    //购物车商品删除
    deleteShopping(id) {
        return service.post('/deleteShop', id)
    },
    //修改保存用户信息请求
    setup({
        gender: 性别,
        year: 年,
        month: 月,
        day: 日,
        id: 用户id,
        nickname: 昵称 }) {
        return service.post("/saveUser", {
            gender: 性别,
            year: 年,
            month: 月,
            day: 日,
            id: 用户id,
            nickname: 昵称
        })
    },
    //收藏商品请求
    collection(goods) {
        return service.post('/collection', goods)
    },
    //取消收藏商品请求
    cancelCollection(id) {
        return service.post('/cancelCollection', { id })
    },
    //查询商品是否以收藏
    isCollection(id) {
        return service.post('/isCollection', { id })
    },
    //查询用户收获地址请求
    getAddress() {
        return service.get('/getAddress')
    },
    //增加收货地址请求
    address({ name,
        tel,
        address,
        isDefault,
        province,
        city,
        county,
        addressDetail,
        areaCode,
        id, }) {
        return service.post('/address', {
            name,
            tel,
            address,
            isDefault,
            province,
            city,
            county,
            addressDetail,
            areaCode,
            id,
        })
    },
    //查询我的收藏商品请求
    collection1() {
        return service.get('/collection/list')
    },
    //删除地址请求
    deleteAddress(id) {
        return service.post('/deleteAddress', { id })
    },
    //获取默认地址
    getDefaultAddress() {
        return service.get('/getDefaultAddress')
    },
    //购物车支付请求
    order({
        address,
        tel,
        orderId,
        totalPrice,
        idDirect,
        count, }) {
        return service.post('/order', {
            address,
            tel,
            orderId,
            totalPrice,
            idDirect,
            count,
        })
    },
    //修改默认地址请求
    setDefaultAddress(id) {
        return service.post('/setDefaultAddress', { id })
    },
    // 查询订单数量
    myOrder() {
        return service.get('/myOrder')
    },
    //查询未评价
    tobeEvaluated() {
        return service.get('/tobeEvaluated')
    },
    // 查询已评价
    alreadyEvaluated() {
        return service.get('/alreadyEvaluated')
    },
    //商品评论
    Productreviews({ id,
        rate,
        content,
        anonymous,
        _id,
        order_id,
        image, }) {
        return service.post('/goodsOne/comment', {
            id,
            rate,
            content,
            anonymous,
            _id,
            order_id,
            image,
        })
    },
    //推出登录
    loginOut() {
        return service.post('/loginOut')
    },
    //搜索请求
    searchs(value) {
        return service.post('/search', { value })
    }

}
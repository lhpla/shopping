<template>
  <div>
    <div class="lt" @click="back">&lt;</div>
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index,) in obj" :key="index">
          <img v-lazy="obj.image" style="width:100%; " @click="lookimg(item,index)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>{{obj.name}}</div>
    <div style="color:red;">
      <span>￥{{obj.present_price}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <s style="font-size:14px;color:gray;">￥{{obj.orl_price}}</s>
    </div>
    <div style="display:flex;justify-content:space-around;">
      <div>运费：0</div>
      <div>剩余：1000</div>
      <div @click="collection" v-if="flag">
        收藏商品
        <span>
          <van-icon name="like-o" />
        </span>
      </div>
      <div @click="collection1" v-else>
        取消收藏
        <span style="color:red;">
          <van-icon name="like" />
        </span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;width:100%;margin:10px 0;">
      <div style="display:flex;">
        <van-icon name="shop-o" />有赞的店
        <div class="guanfan">官方</div>
      </div>
      <div style="color:gray;">进入店铺&gt;</div>
    </div>
    <div>
      <van-tabs v-model="active">
        <div>
          <van-tab title="商品详情">
            商品详情
            <div>
              <div v-html="obj.detail"></div>
            </div>
          </van-tab>
        </div>
        <div>
          <van-tab title="商品评价">
            <div v-for="(item,index) in arr" :key="index">
                  <div>{{item.comment_nickname}}</div>
                  <div>
                    <img :src="item.comment_avatar" alt style="width:60px;" />
                  </div>
              <div style="display:flex;">
                <div>
                  <img :src="obj.image" alt style="width:150px;" />
                </div>
                <div>
                  <div>{{obj.name}}</div>
                  <div style="margin-top:90px;">
                    <van-rate v-model="item.rate" />
                  </div>
                </div>
              </div>
              <div>评价时间：{{item.comment_time}}</div>
              <div style="height:80px;">买家评论：{{item.content}}</div>
            </div>
          </van-tab>
        </div>
      </van-tabs>
    </div>

    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="toshopping" />
        <van-goods-action-button type="warning" text="加入购物车" @click="jionshopping" />
        <van-goods-action-button type="danger" text="立即购买" @click="showPopup" />
      </van-goods-action>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-card :price="obj.present_price" :title="obj.name" :thumb="obj.image">
        <template #footer>
          <van-stepper theme="round" button-size="22" disable-input v-model="value" />
        </template>
      </van-card>
      <van-button type="danger" style="width:100%;" @click="buynow">立即购买</van-button>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { Dialog } from 'vant';
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      value: 1,
      show: false,
      ids: "",
      obj: {},
      flag: true,
      active: 0,
      show: false,
      goods: "",
      success: "",
      obj1: {},
      obj2: {
        address: "",
        tel: "",
        totalPrice: "",
        idDirect: "",
        count: "",
      },
      orderId: [],
      obj3: {},
      arr: [],
    };
  },
  methods: {
    //收藏
    collection() {
     if(localStorage.getItem('user')){
        this.flag = !this.flag;
      console.log(this.obj, "收藏商品");
      this.$api
        .collection(this.obj)
        .then((res) => {
          this.success = res.msg;
          console.log(this.success);
          console.log(res, "ii");
          this.$toast.success(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
     }else{
       Dialog.alert({
                title:'检测到您还没登录',
                message:'是否跳转到登录/注册页面'
            }).then(() => {
             this.$router.push('/Login')
              })
     }
    },
    //取消收藏
    collection1() {
      this.flag = !this.flag;
      console.log(this.ids, "商品id");
      this.$api
        .cancelCollection(this.ids)
        .then((res) => {
          this.success = res.msg;
          console.log(this.success);
          console.log(res);
          this.$toast.success(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //返回
    back() {
      this.$router.push("/");
    },
    //图片预览
    lookimg(item, index) {
      ImagePreview({
        images: [this.obj.image],
        closeable: true,
        showIndex: true,
      });
    },
    //去购物车
    toshopping() {
      this.$router.push("/Shopping");
    },
    //加入购物车
    jionshopping() {
      this.$api
        .jionshopping({ id: this.ids })
        .then((res) => {
          if(localStorage.getItem('user')){
           console.log(res, "000");
          console.log(this.ids, "11");
          }else{
             Dialog.alert({
                title:'检测到您还没登录',
                message:'是否跳转到登录/注册页面'
            }).then(() => {
             this.$router.push('/Login')
              })
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 弹出立即购买
    showPopup() {
      this.show = true;
    },
    //立即购买
    buynow() {
      this.orderId.push(this.obj.id);
      // console.log(this.orderId,'jjj')
      if(localStorage.getItem('user')){
        this.$api
        .order(
          (this.arr = {
            address: this.obj3.address,
            tel: this.obj3.tel,
            orderId: this.orderId,
            totalPrice: this.obj.present_price,
            idDirect: true,
            count: this.value,
          })
        )
        .then((res) => {
          console.log(res);
          this.$toast(res.msg);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        Dialog.alert({
                title:'检测到您还没登录',
                message:'是否跳转到登录/注册页面'
            }).then(() => {
             this.$router.push('/Login')
              })
      }
      
    },
  },
  mounted() {
    this.ids = this.$route.query.id;
    console.log(this.ids, "pp");
    //请求详情数据
    this.$api
      .details(this.ids)
      .then((res) => {
        if (res.code === 200) {
          this.obj = res.goods.goodsOne;
        }
        this.img = this.obj.image;
        this.arr = res.goods.comment;
        console.log(this.arr, "评论详情");
        console.log(res, "^^");
        console.log(this.obj, "mm");
        // localStorage.setItem('abc',JSON.stringify(this.obj))
        //最近浏览存入localStorage
        let z = JSON.parse(localStorage.getItem('z'))
        // console.log(z,'zzz')
        if(z===null){
          let i = []
          i.push(this.obj)
          // console.log(i,'iii')
          localStorage.setItem('z',JSON.stringify(i))
        }else{
          let x = []
          if(z.some(item=>{
            return item.id === this.obj.id
          })===false){
            z.unshift(this.obj)
            x = z
            localStorage.setItem('z',JSON.stringify(x))
          }else{
            x = z.filter(item1=>{
              return item1.id !==this.obj.id
            })
            x.unshift(this.obj)
            localStorage.setItem(z,JSON.stringify(x))
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //查看商品是否以收藏
    console.log(this.ids, "==");
    this.$api
      .isCollection(this.ids)
      .then((res) => {
        if (res.isCollection) {
          this.flag = false;
          console.log(this.flag);
        } else {
          this.flag = true;
          console.log(this.flag, "当前没有搜藏");
        }
        console.log(res, "[");
      })
      .catch((err) => {
        console.log(err);
      });
    this.$api
      .getDefaultAddress()
      .then((res) => {
        this.obj3 = res.defaultAdd;
        console.log(this.obj3, "**");
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
.lt {
  width: 30px;
  height: 30px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  margin: 10px;
  // position: fixed;
}
.guanfan {
  height: 25px;
  width: 40px;
  background: red;
  color: white;
  text-align: center;
  font-size: 14px;
  line-height: 25px;
  border-radius: 3px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/api'
import Vant from 'vant'
import 'vant/lib/index.css'
// import utils from './utils'

//表单
import { Form } from 'vant'
Vue.use(Form)
//按钮
import { Button } from 'vant';
Vue.use(Button);
//图标
import { Icon } from 'vant';
Vue.use(Icon);
//轮播图
import { Lazyload } from 'vant';
Vue.use(Lazyload);
//标签栏
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
//侧边导航
import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);
//标签页
import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
//图片预览
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
//商品导航
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
//商品规格
import { Sku } from 'vant';
Vue.use(Sku);
//宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid);
Vue.use(GridItem);
//商品卡片
import { Card } from 'vant';
Vue.use(Card);
//进步器
import { Stepper } from 'vant';
Vue.use(Stepper);
//提交订单栏
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);
//选择时间
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);
//弹出层
import { Popup } from 'vant';
Vue.use(Popup);
//轻提示
import { Toast } from 'vant';
Vue.use(Toast);
//地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);
//编辑地址
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);
//评分
import { Rate } from 'vant';
Vue.use(Rate);
//开关
import { Switch } from 'vant';
Vue.use(Switch);
//弹出框
import { Dialog } from 'vant';
Vue.use(Dialog);
//搜索
import { Search } from 'vant';
Vue.use(Search);
//索引栏
import { IndexBar, IndexAnchor } from 'vant';
Vue.use(IndexBar);
Vue.use(IndexAnchor);

//挂载在原形对象上
Vue.prototype.$api = api
// Vue.prototype.$utils = utils

Vue.use(Vant)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

<template>
  <div>
    <div style="display:flex;height:40px;line-height:40px;border-bottom:1px solid skyblue;">
      <div @click="back">&lt;</div>
      <div style="margin-left:150px;">新增地址</div>
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
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import areaList from "../../src/http/可能要用的js文件/area.js";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      areaList,
      searchResult: [],
      AddressInfo:[]
    };
  },
  methods: {
    back() {
      this.$router.push("/Address");
    },
    onSave(content) {
      this.$api
        .address(this.AddressInfo={
          name:	content.name,
          tel:	content.tel,
          address:	content.county+content.city+content.county+content.addressDetail,
          isDefault: content.isDefault,
          province:	content.province,
          city:	content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode:	content.areaCode,
          id: content.id,
        })
        .then((res) => {
           Toast(res.msg);
           this.$router.push('/Address')
          console.log(res, "yy");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onDelete() {
      Toast("delete");
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
        this.searchResult = [];
      }
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>
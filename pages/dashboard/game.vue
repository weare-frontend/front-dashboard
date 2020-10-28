<template>
    <div class="container">
      <h6 class="subtitle">ดาวน์โหลดเกม</h6>
      <div class="row">
        <div class="col-md-8 m-auto">
          <a target="_blank" :href="getSettingObject.link_download">
            <div class="card shadow border-0 mb-3 text-center">
              <div class="ribbontwo"><span>HOT</span></div>
              <div class="card-body">
                <div class="avatar avatar-60 no-shadow border-0">
                  <div class="overlay bg-template"></div>
                  <i class="material-icons vm md-36 text-template">android</i>
                </div>
                <h4 class="mt-3 mb-0 font-weight-normal">ANDROID </h4>
                <p class="text-secondary text-mute small">สำหรับระบบ Android ทุกรุ่น</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-8 m-auto">
          <a target="_blank" :href="getSettingObject.link_download_ios">
            <div class="card shadow border-0 mb-3 text-center">
              <div class="ribbontwo"><span>HOT</span></div>
              <div class="card-body">
                <div class="avatar avatar-60 no-shadow border-0">
                  <div class="overlay bg-template"></div>
                  <i class="material-icons vm md-36 text-template">stay_current_portrait</i>
                </div>
                <h4 class="mt-3 mb-0 font-weight-normal">IOS</h4>
                <p class="text-secondary text-mute small">สำหรับระบบ IOS ทุกรุ่น</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-12">
          <h5 class="text-center"> 
            <a class="text-white text-underline" target="_blank" :href="getSettingObject.link_front">เข้าสู่เว็บไซต์</a>
          </h5>
        </div>
      </div>
      <page-promotions :slides="promotionArray" />
    </div>
</template>
<style scoped>
a{
  text-decoration: none;
}

.text-underline{
  text-decoration: underline;
}
.ribbontwo {
  position: absolute;
  right: -5px; top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px; height: 75px;
  text-align: right;
}
.ribbontwo span {
  font-size: 10px;
  font-weight: bold;
  color: #FFF;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79A70A;
  background: linear-gradient(#9BC90D 0%, #79A70A 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px; right: -21px;
}
.ribbontwo span::before {
  content: "";
  position: absolute; left: 0px; top: 100%;
  z-index: -1;
  border-left: 3px solid #79A70A;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79A70A;
}
.ribbontwo span::after {
  content: "";
  position: absolute; right: 0px; top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #79A70A;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79A70A;
}

</style>

<script>
import Promotions from '~/components/Promotions.vue'
export default {
    head() {
      return {
        title: 'Game',
      }
    },
    asyncData : async function({$axios,env}){
        const promotion  = await $axios.$get("/api/get-promotion/get-all-path-photo");
        let promotionArray = promotion.data.map(item => {  item.img = env.API + item.img; return item; })
        return { promotionArray : promotionArray }
    },
    components : {
     'page-promotions' : Promotions,
    },
    computed: {
      getSettingObject: function() {
        return this.$store.getters.getSettingObject
      }
    }
}
</script>
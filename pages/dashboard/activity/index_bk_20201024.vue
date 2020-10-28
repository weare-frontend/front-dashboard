
<template>
  <div>
    <div class="col-4 text-left" style="top:25px; position:absolute;">
       <nuxt-link :to="{name:'dashboard'}">
            <i  class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
    <div class="mt-4 col-12">
        <h5 class="text-center text-white font-weight-100" style="border-radius: 15px;"><i class="text fas fa-gift"></i> กิจกรรม</h5>
    </div>
    
    
    <div class="panel-center">
      <div class="container">
        <div class="row" v-for="(item, index) in getPromotionArray" :key="index">
          <!-- {{getPromotionArray}} -->
          <div class="w-100 mx-2" v-if="rotues[item.id] && item.status">
            <div class="col-12 mb-3">
              <div class="card" style="border-bottom: 1px solid #555;">
                <div class="d-flex align-items-center" style="height: 95px;">
                  <!-- <div class="p-2 flex-grow-0 bd-highlight  d-flex  justify-content-start">
                  <img :src="showAPI+item.img_banner" alt style="width:100%;max-width:100px;" />
                  </div>-->
                  <nuxt-link :to="{name : rotues[item.id]}" class="text-center px-2">
                    <div
                      class="avatar avatar-60 border-0 bg-dark text-white"
                      :class="[{'font-size-vh' : !rotues[item.id]}]"
                      :style="'background-image:url('+item.img_banner+'); background-size:100%;'"
                    >
                      <i
                        class="material-icons"
                        v-if="rotues[item.id]=='share'"
                        @click="facebookShare"
                      >share</i>
                    </div>
                  </nuxt-link>

                  <div class="p-2 flex-grow-1 bd-highlight">
                    <nuxt-link :to="{name : rotues[item.id]}" class="text-center px-2">
                      <h6 class="text-left mb-0 font-weight-normal text-template">
                        {{item.pro_name}}
                        <small
                          class="badge badge-dark text-white"
                          style="float:right;"
                        >{{ item.status == 1 && rotues[item.id] ? 'เข้าร่วม' : 'ปิด'}}</small>
                      </h6>
                      <!-- <p class="text-left text-secondary text-mute small">
                        ยอดฝากมากกว่าหรือเท่ากับ
                        {{item.minimum_money | toCurrencyString}} สิทธิ์ทันที
                      </p> -->
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-custom {
  box-shadow: 0 0rem 0.6rem #a68750 !important;
}

.font-size-vh {
  font-size: 1vh;
}
</style>


<script>
export default {
  head() {
    return {
      title: "Activity",
      api_img: process.env.API,
    };
  },
  data: () => ({
    rotues: {
      // 111: "dashboard-activity-wheel",
      103: "share",
      116: "dashboard-activity-giftbox",
      127: "dashboard-activity-question",
      126: "dashboard-activity-cashback",
    },
  }),
  computed: {
    showAPI: function (params) {
      return process.env.API + "backend/web/special_promotions/";
    },
    getPromotionObjects: function () {
      return this.$store.getters.getPromotionObjects;
    },
    getPromotionArray: function () {
      return this.$store.getters.getPromotionArray;
    },
  },
  async asyncData({ $axios, $auth, env }) {
    const checkProSheare = await $axios.$get(
      "api/free-bonus/check-pro-facebookshare"
    );
    return { proSheare: checkProSheare };
  },
  methods: {
    checkProShare() {
      const loader = this.$loading.show({ container: this.$refs.formInfoUser });
      this.$store.dispatch("setLoading", true);
      this.$axios
        .$post("api/free-bonus/check-pro-facebookshare", "")
        .then((response) => {
          this.check103 = response;
        });
    },
    async facebookShare() {
      let shareUrl = JSON.parse(this.proSheare.data.values_json);
      var self = this;
      if (this.proSheare && this.proSheare.data) {
        let shareUrl = JSON.parse(this.proSheare.data.values_json);
        window.fbAsyncInit = function () {
          FB.init({
            appId: shareUrl.appID,
            autoLogAppEvents: true,
            xfbml: true,
            version: "v6.0",
          });
        };
      }
      await this.$axios
        .$get("api/free-bonus/check-topup-facebook")
        .then((response) => {
          if (response.success) {
            FB.ui(
              {
                method: "feed",
                link: shareUrl.url,
              },
              function (response) {
                if (response) {
                  if (response.length == 0) {
                    self.$axios
                      .$get("api/free-bonus/get-credit-facebook")
                      .then((response) => {
                        if (response.success) {
                          self.$toast.global.success({
                            message: response.message,
                          });
                        } else {
                          self.$toast.global.error({
                            message: response.message,
                          });
                        }
                      });
                  }
                } else {
                  self.$toast.global.error({
                    message: "คุณแชร์ Facebook ไม่สำเร็จ !!",
                  });
                }
              }
            );
          } else {
            self.$toast.global.error({ message: response.message });
          }
        });
    },
  },
  mounted: function () {
    if (
      // !this.getPromotionObjects[111].status &&
      !this.getPromotionObjects[103].status &&
      !this.getPromotionObjects[116].status &&
      !this.getPromotionObjects[126].status 
    ) {
      this.$toast.global.error({ message: "COMING SOON..." });
      this.$router.push({ name: "dashboard" });
    }
  },
};
</script>

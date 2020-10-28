<template>
  <div class="container mb-4">
     <div class="col-4 text-left"  style="top:25px; position:absolute;">
       <nuxt-link :to="{name:'dashboard'}">
            <i  class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-xs-12" v-if="getPromotionObjects[101].status">
        <h6 class="subtitle text-white" style="text-align: center;">ข้อมูลการชวนเพื่อน</h6>
        <img class="w-100 mb-2" :src="getPromotionObjects[101].img_banner" alt style="border-radius:20px;">
      </div>
    </div>

    <div class="row justify-content-center ">
      <div class="col-md-6 col-xs-12 my-2">
        <div class="form-group float-label active">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control text-template"
              ref="linkAffiliate"
              @click="copyAffiliate('linkAffiliate')"
              readonly
              :value="baseUrl"
            />
            <div class="input-append bg-white">
                <span class="input-group-text" style="height:49px" @click="copyAffiliate('linkAffiliate')">
                  <i class="f7-icons size-24">doc_on_doc</i>
                </span>
              </div>
            
          </div>
          <label class="form-control-label text-template">ลิงค์ชวนเพื่อน</label>
        </div>
      </div>
    </div>
      <div class="col-md-12 col-xs-12 text-center">
        <a
          class="btn btn-secondary text-white"
          v-if="getPromotionObjects[121].status=='1'"
          @click="checkAffiliateNew"
        >
          <i class="fas fa-share-alt text-white"></i> คอมมิสชั่น
        </a>
      </div>
    
    <!-- page content here -->
    <div class="row justify-content-center mb-5">
      <div class="col-md-6 col-xs-12">
        <h6 class="text-template">เพื่อนทั้งหมด {{ dataTotal }} คน</h6>
        <ul class="list-group list-group-flush border-top border-bottom" v-if="affiliateArray">
          <li class="list-group-item" v-for="(item, index) in affiliateArray" :key="index">
            <div class="row align-items-center">
              <div class="col-auto pr-0">
                <div class="avatar avatar-50 no-shadow border-0">
                  <i class="material-icons text-template">face</i>
                </div>
              </div>
              <div class="col align-self-center pr-0">
                <h6 class="font-weight-normal mb-1 text-warning">
                  {{item.player_profile_id}}
                  <span
                    class="badge small vm text-template"
                    :class="toStatusColor(item.status)"
                  >{{ (item.status) }}</span>
                </h6>
                <p
                  class="text-mute small text-secondary"
                >{{item.create_at != '-' ? item.create_at : 'การตรวจสอบจากพนักงาน'}}</p>
              </div>
              <div class="col-auto">
                <h6 class="text-success">{{ item.money | toCurrencyString}}</h6>
              </div>
            </div>
          </li>
        </ul>
        <button
          class="btn btn-md btn-default mt-2 text-template btn-block shadow"
          v-show="pageTotal < dataTotal"
          @click="getAffiliate"
        >
          <span>เพิ่มเติม</span>
        </button>

        <div class="card shadow border-0 mb-3 text-center" v-if="!affiliateArray.length">
          <div class="card-body">
            <div class="avatar avatar-60 no-shadow border-0 bg-template">
              
              <i class="material-icons vm md-36 text-white">people</i>
            </div>
            <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการชวนเพื่อน</h4>
            <p class="text-secondary text-mute small">จะแสดงรายการชวนเพื่อนทั้งหมด</p>
          </div>
        </div>
      </div>
    </div>
    <!-- page content ends -->
  </div>
</template>


<script>
export default {
  head() {
    return {
      title: "Affiliate",
    };
  },
  data: () => ({
    baseUrl: null,
  }),
  asyncData: async function ({ $axios }) {
    let currentPage = 1,
      perPage = 10;
    let form = { params: { currentPage: currentPage, perPage: perPage } };
    const { data, dataTotal } = await $axios.$get(
      "/api/api-player-affiliate",
      form
    );
    return {
      affiliateArray: data,
      currentPage: currentPage,
      perPage: perPage,
      dataTotal: dataTotal,
    };
  },
  computed: {
    pageTotal: function () {
      return this.currentPage * this.perPage;
    },
    getPromotionObjects() {
      return this.$store.getters.getPromotionObjects;
    },
  },
  mounted: function () {
    if (!this.getPromotionObjects[101].status) {
      this.$toast.global.error({ message: "COMING SOON..." });
      this.$router.push({ name: "dashboard" });
    }
    LineIt.loadButton();
    this.getBaseUrl();
  },
  methods: {
    toStatusColor: function (value) {
      switch (value) {
        case "ได้รับแล้ว":
          return "badge-success";
          break;
        case "ยังไม่ได้รับ":
          return "badge-info";
          break;
        case "ไม่ได้เติมเงิน":
          return "badge-warning";
          break;
        default:
          return "badge-danger";
          break;
      }
    },
    checkAffiliateNew() {
      const loader = this.$loading.show({ container: this.$refs.formInfoUser });
      // if (this.btnAffiliate.status == "1") {
      if (this.getPromotionObjects[121].status == "1") {
        // let token = this.$store.state.auth;
        // const headers = { headers: { Authorization: `Bearer ${token}` } }
        this.$axios
          .$get("api/get-link-affiliate")
          .then((response) => {
            // console.log(response);
            if (response.success === true) {
              // let url = response.link_front;
              window.location.href = response.link_front;
              // window.open(url,'_blank');
            } else {
              this.$toast.global.error({
                message: "ยังไม่เปิดให้บริการค่ะ !!",
              });
              loader.hide();
            }
          })
          .catch((error) => {
            this.$toast.global.error({
              message: "ไม่สามารถใช้งานได้ กรุณาแจ้งพนักงาน",
            });
            loader.hide();
          });
      } else {
        this.$root.$emit("bv::show::modal", "modal-comming-soon");
        loader.hide();
      }
    },
    copyAffiliate: function (target) {
      this.$refs[target].select();
      document.execCommand("copy");
      this.$toast.global.success({ message: "คัดลอกลงคลิปบอร์ดแล้ว" });
    },
    getBaseUrl: function () {
      this.baseUrl = window.origin + "/register/" + this.$auth.user.account_api;
    },
    getAffiliate: async function (number) {
      this.currentPage++;
      let form = {
        params: { currentPage: this.currentPage, perPage: this.perPage },
      };
      const { data } = await this.$axios.$get(
        "/api/api-player-affiliate",
        form
      );
      this.affiliateArray = [...this.affiliateArray, ...data];
    },
  },
};
</script>

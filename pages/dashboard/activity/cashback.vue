<template>
  <div>
    <div class="container">
    <div class="col-4 text-left" style="top:25px; position:absolute;">
        <nuxt-link :to="{name:'dashboard-activity'}">
            <i  class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
      <div class="card px-3">
      <div class="row justify-content-center">
        <div class="col-md-6 col-xs-12 mt-3">
          <nav class="nav nav-pills nav-justified w-100 m-auto">
            <h4 class="nav-item nav-link">
              <span class="text-template">คืนยอดเสีย (cashback)</span>
            </h4>
          </nav>
          <img class="w-100 mb-2" :src="getPromotionObjects[126].img_banner" style="border-radius: 10px;" alt />
        </div>
        <div class="pt-3 col-12 text-center">
          <h5>จำนวนเงินที่ได้รับ</h5>
          <h2>{{balance}}</h2>
        </div>
        <div class="py-2 col-12 text-center">
          <b-button @click="getCreditFree()" variant="danger">
            กดรับเครดิตฟรี
            <i class="fas fa-check-circle" style="color:#fff"></i>
          </b-button>
        </div>
        <div class="py-2 col-md-11 col-sm-12">
          <h6 class="py-2">ประวัติการกดรับเครดิตฟรี</h6>
          <b-table
            id="cash"
            small
            show-empty
            striped
            responsive
            sticky-header
            :items="getTableReturnBalance"
            :fields="tableCashback.fields"
            head-variant="dark"
            class="text-template"
          >
            <template v-slot:empty>
              <div class="text-template text-center">ไม่พบข้อมูล</div>
            </template>
            <template v-slot:cell(index)="data" class="text-template">{{ data.index + 1 }}</template>
          </b-table>
          <hr />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: 0,
      tableCashback: {
        items: [],
        fields: [
          {
            key: "index",
            label: "#",
            class: "text-center text-light small",
          },
          {
            key: "bonus",
            label: "จำนวนเครดิตฟรี",
            sortable: false,
            class: "text-right text-light small",
          },
          {
            key: "create_at",
            label: "วันที่กดรับ",
            sortable: false,
            class: "text-center text-light small",
          },
        ],
      },
    };
  },
  mounted() {
    this.getReturnBalance();
  },
  computed: {
    pageTotal: function () {
      return this.currentPage * this.perPage;
    },
    getPromotionObjects() {
      return this.$store.getters.getPromotionObjects;
    },
  },
  methods: {
    getReturnBalance() {
      this.$axios
        .request({
          method: "GET",
          url: "/api/get-return-balance/show",
        })
        .then((response) => {
          if (response.data.success) {
            this.balance = response.data.balance;
          } else {
            this.balance = 0.0;
          }
        })
        .catch((error) => {
          // console.log("error => getReturnBalance :", error);
        });
    },
    getCreditFree() {
      if (this.balance == 0) {
        this.$toast.global.error({
          message: "ไม่สามารถรับได้ จำนวนเงินที่รับได้ต้องมากกว่า 0",
        });
      } else {
        this.$axios
          .request({
            method: "GET",
            url: "/api/get-return-balance",
          })
          .then((response) => {
            if (response.data.success) {
              this.$toast.global.success({
                message: response.data.message,
              });
              this.$root.$emit("bv::refresh::table", "cash");
              this.getReturnBalance();
            } else {
              this.$toast.global.error({
                message: response.data.message,
              });
            }
          })
          .catch((error) => {
            // console.log("error => getCreditFree :", error);
            this.$toast.global.success({
              message: "กดรับไม่สำเสร็จ กรุณาลองให้ภายหลัง",
            });
          });
      }
    },
    getTableReturnBalance() {
      return this.$axios
        .request({
          method: "GET",
          url: "/api/get-return-balance/history",
        })
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          // console.log("error => getTableReturnBalance :", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
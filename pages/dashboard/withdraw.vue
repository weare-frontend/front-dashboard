<template>
  <div style="margin-top:-132px;" class="mx-3">
    <page-info :showModalWithdraw="showModalWithdraw" />
    <div class="container mb-5" ref="formWithdraw" style="overflow: hidden; ">
      <h6 class="text-left my-2 mt-3 text-template">ประวัติรายการถอน</h6>
      <div
        class="row pb-2"
        :class="[{'bg-unfinish' :  withdrawArray[index].accept_status == 0,'bg-sky' :  withdrawArray[index].accept_status == 2 ,'bg-finish' :  withdrawArray[index].accept_status == 1 }]"
        style="margin:15px 0;border-radius: 10px;border: solid 1px #666;"
        v-for="(item,index) in perPage"
        :key="index"
        v-if="withdrawArray[index]"
      >
        <div class="col-7 pt-2">
          <p class="font-weight-100 mb-1">
            <span class="text-dark">ถอนเงิน</span>
            <span
              :class="[{ 'text-brown' :  withdrawArray[index].accept_status == 0  ,'text-blue' :  withdrawArray[index].accept_status ==2 ,'text-success' :  withdrawArray[index].accept_status == 1 }] "
              style="white-space: nowrap; font-size: 15px;"
            >{{ toStatusString(withdrawArray[index].accept_status) }}</span>
          </p>
          <p class="text-mute small text-pink mb-0"></p>
          <p
            class="text-mute small text-secondary mb-2"
            style="font-weight: 100;"
          >{{withdrawArray[index].create_at}}</p>
        </div>
        <div v-if="withdrawArray[index].accept_status==1" class="col-5 text-dark text-right pt-2">
          {{ withdrawArray[index].money | toCurrencyString }}
          <br />
          <small
            style="font-weight: 100;"
          >หักโบนัส {{ withdrawArray[index].deductions | toCurrencyString }}</small>
        </div>
        <div v-else class="col-5 text-dark text-right pt-2">
          {{ Math.abs(withdrawArray[index].withdraw) | toCurrencyString }}
          <br />
          <small
            style="font-weight: 100;"
          >หักโบนัส {{ withdrawArray[index].deductions | toCurrencyString }}</small>
        </div>
      </div>
      <div class="row mb-5 mx-1" @click="readMore" v-if="perPage < withdrawRow">
        <div class="col-md-12 p-2 rounded" style="background:#d7d4d4;">
          <p class="text-center text-body">ดูข้อมูลเพิ่มเติม</p>
        </div>
      </div>
      <div class="card shadow border-0 mb-3 text-center " v-if="!withdrawArray.length">
        <div class="card-body">
          <div class="avatar avatar-60 shadow border-0 bg-template" style="border-radius: 50%;">
            <i class="material-icons vm md-36 text-white">local_atm</i>
          </div>
          <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการถอนเงิน</h4>
          <p class="text-secondary text-mute small">จะแสดงรายการถอนทั้งหมด</p>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-withdraw"
      ref="modal-withdraw"
      centered
      content-class="rounded"
      header-class="shadow"
      body-class="bg-body-modal"
      no-close-on-backdrop
      >
      <template v-slot:modal-header="{ close }">
        <i
          class="f7-icons text-white multiply-circle2"
          
          @click="$bvModal.hide('modal-withdraw')"
        >multiply_circle</i>
        <h6 class="text-center m-0 w-100 text-dark">ยืนยันการถอนเงิน</h6>
      </template>
      <div class="row">
        <div class="col-12 text-center">
          <span class="material-icons fs-75 text-danger">error_outline</span>
        </div>
        <div class="col-12 text-center">
          <p class="text-white">ต้องการถอนเงินใช่หรือไม่ ?</p>
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <div class="row w-100 justify-content-center">
          <div class="col-4">
            <button
              type="button"
              class="btn text-white py-2 px-4 bg-button-cc"             
              @click="$bvModal.hide('modal-withdraw')"
            >ยกเลิก</button>
          </div>
          <div class="col-4">
            <b-overlay
              :show="busy"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="white"
              class="btn-block d-inline-block"
            >
              <button
                type="button"
                @click="acceptWithdraw"
                class="btn py-2 px-4 btn-outline-secondary bg-button-cf"
              >ยืนยัน</button>
            </b-overlay>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<style scoped>
.text-brown{
  color: #DA7C57;

}
.text-blue{
  color: #2C267C;
}
.spin {
  -webkit-animation-name: spin;
  -webkit-animation-duration: 1000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 1000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 1000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;

  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@-ms-keyframes spin {
  from {
    -ms-transform: rotate(0deg);
  }

  to {
    -ms-transform: rotate(360deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }

  to {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.marquees-text {
  height: 50px;
  overflow: hidden;
  position: relative;
}

.marquees-text p {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  /* Starting position */
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  /* Apply animation to this element */
  -moz-animation: marquees-text 8s linear infinite;
  -webkit-animation: marquees-text 8s linear infinite;
  animation: marquees-text 8s linear infinite;
}

/* Move it (define the animation) */
@-moz-keyframes marquees-text {
  0% {
    -moz-transform: translateX(100%);
  }

  100% {
    -moz-transform: translateX(-100%);
  }
}

@-webkit-keyframes marquees-text {
  0% {
    -webkit-transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
  }
}

@keyframes marquees-text {
  0% {
    -moz-transform: translateX(100%);
    /* Firefox bug fix */
    -webkit-transform: translateX(100%);
    /* Firefox bug fix */
    transform: translateX(100%);
  }

  100% {
    -moz-transform: translateX(-100%);
    /* Firefox bug fix */
    -webkit-transform: translateX(-100%);
    /* Firefox bug fix */
    transform: translateX(-100%);
  }
}

.bg-finish {
  background: #FFF;
  /* background: #0286259e; */
}

.bg-unfinish {
  background: #FFF;
  /* background: #bb000069; */
}

.bg-sky {
  background: #FFF;
  /* background: #00b5bb69; */
}

#title {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  color: #fff;
  text-align: center;
  font-family: "lato", sans-serif;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
}

#title span {
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-2000px);
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import Info from "~/components/Info.vue";
export default {
  data: () => ({
    perPage: 4,
    addPage: false,
  }),
  head() {
    return {
      title: "Withdraw",
    };
  },
  components: {
    "page-info": Info,
  },
  asyncData: async function ({ $axios, $auth, $route }) {
    const { data } = await $axios.$get("/api/data-withdraw");
    return {
      withdrawArray: data ? data : [],
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["getThemeObject", "getSettingObject"]),
    withdrawRow: function () {
      return this.withdrawArray.length;
    },
  },

  mounted: function () {
    this.addPage = this.perPage;
    if (this.$auth.user.lname == "Not verified") {
      const loader = this.$loading.show({
        "is-full-page": true,
      });
      setTimeout(() => {
        this.$router.push({
          name: "dashboard-verified",
        });
        //  this.$refs['verified-modal'].show();
        loader.hide();
      }, 800);
    }
  },
  methods: {
    readMore: function () {
      this.perPage += this.addPage;
    },
    toStatusString: function (value) {
      value = parseInt(value);
      switch (value) {
        case 0:
          return "ทำรายการไม่สำเร็จ";
          break;
        case 1:
          return "ทำรายการสำเร็จ";
          break;
        case 2:
          return "รอการตรวจสอบ";
          break;
      }
    },
    // showModalWithdraw : function(params) {
    //        this.$bvModal.msgBoxConfirm('โปรดยืนยันว่าคุณต้องการแจ้งถอนเงิน', {
    //            title: 'แจ้งเตือน',
    //            size: 'sm',
    //            buttonSize: 'sm',
    //            okVariant: 'success',
    //            okTitle: 'ยืนยัน',
    //            cancelTitle: 'ยกเลิก',
    //            footerClass: 'p-2',
    //            hideHeaderClose: false,
    //            centered: true
    //          })
    //          .then(value => {
    //            if (value) this.acceptWithdraw();
    //          });
    // },
    showModalWithdraw: function (params) {
      this.$bvModal.show("modal-withdraw");
    },

    acceptWithdraw: async function () {
      this.busy = true;
      const checkWithdraw = await this.$axios
        .$get("/api/check-withdraw")
        .catch(() => {
          return {
            success: false,
            msg: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (500) / กรุณาติดต่อพนักงาน",
          };
        });
      if (checkWithdraw.success) {
        const withdraw = await this.$axios.$post("/api/withdraw", {
          turn_status: checkWithdraw.data.chkTurn,
          player_credit_id: checkWithdraw.data.dtChk.id,
          money: checkWithdraw.data.detail.MoneyNum,
        });
        this.busy = false;
        if (withdraw.success) {
          this.$toast.global.success({
            message: withdraw.msg,
          });
          this.$bvModal.hide("modal-withdraw");
        } else {
          this.$toast.global.error({
            message: withdraw.msg,
          });
        }
        this.getWithdraw();
        this.$auth.fetchUser();
        // loader.hide();
      } else {
        this.$toast.global.error({
          message: checkWithdraw.msg,
        });
        this.busy = false;
        // loader.hide();
      }
    },
    getWithdraw: async function () {
      const { data } = await this.$axios.$get("/api/data-withdraw");
      return (this.withdrawArray = data);
    },
  },
};
</script>

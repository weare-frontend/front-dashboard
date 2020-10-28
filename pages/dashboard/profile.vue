<template>
  <div class="container" ref="formProfileUser">
   <div class="col-4 text-left" style="top:25px; position:absolute;">
       <nuxt-link :to="{name:'dashboard'}">
            <i  class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
    <div class="mt-3 mb-3" style="overflow: hidden;">
      <!-- <div class="col-2 text-left">
        <nuxt-link :to="{name:'dashboard'}" class="mt-4">
          <i class="f7-icons text-pink">chevron_left_circle_fill</i>
        </nuxt-link>
      </div> -->
      <div class="col-12">
        <h5 class="text-center font-weight-100 text-white mb-0">ข้อมูลส่วนตัว</h5>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-xs-6">
          <div class="input-group mb-1 bg-white" v-if="$auth.user.password">
            <div class="input-group">
              <div class="input-prepend align-items-center">
                <span class="text-white">ยูสเซอร์เข้าเกม</span>
              </div>
              <input 
              type="text" 
              :value="$auth.user.account_api"
              ref="user_copy"
              
              @click="copyAffiliate('user_copy')"
              readonly class="h6 text-secondary form-control" aria-label="Amount (to the nearest dollar)">
              <div class="input-append" style="background-color: #d8ff00;">
                <span class="input-group-text" @click="copyAffiliate('user_copy')">
                  <i class="f7-icons size-24">doc_on_doc</i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-xs-6">
          <div class="input-group my-2 bg-white" v-if="$auth.user.password">
            <div class="input-group">
              <div class="input-prepend align-items-center">
                <span class="text-white">รหัสผ่านเข้าเกม</span>
              </div>
              <input type="text" :value="$auth.user.password" @click="copyAffiliate('pass_copy')"  ref="pass_copy" readonly class="h6 text-secondary form-control" aria-label="Amount (to the nearest dollar)">
              <div class="input-append">
                <span class="input-group-text" @click="copyAffiliate('pass_copy')">
                   <i class="f7-icons size-24">doc_on_doc</i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div
        class="rounded row p-3 bg-white mx-1"
        v-if="$auth.user.lname!='Not verified'"
      >
        <div class="col-md-6" style="margin-top: 5px;">
          <small class="text-template font-weight-100">ชื่อบัญชี :</small>
          <small class="text-right text-template font-weight-100">{{$auth.user.fullname}}</small>
        </div>
        <div class="col-md-5">
          <small class="text-left text-template font-weight-100">ธนาคาร :</small>
          <small class="text-right text-template font-weight-100">{{$auth.user.bank_type}}</small>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-6">
          <small class="text-left text-template font-weight-100">เลขที่บัญชี :</small>
          <small class="text-right text-template font-weight-100">{{$auth.user.bank_account}}</small>
        </div>
        <div class="col-md-5" v-if="$auth.user.refer_code">
          <small class="text-right text-template font-weight-100">รหัสผู้เชิญชวน :</small>
          <small class="text-right text-template font-weight-100">{{$auth.user.refer_code}}</small>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-6">
          <small class="text-right text-template font-weight-100">รหัส Pincode :</small>
          <small class="text-right text-template font-weight-100">{{$auth.user.pincode}}</small>
        </div>
      </div>
      <div class="row justify-content-center mb-3" v-else>
        <div class="col-8" style="margin-top: 5px;">
          <small class="text-template font-weight-100">ชื่อบัญชี :</small>
          <small class="text-right text-template font-weight-100">{{$auth.user.fullname}}</small>
        </div>
        <div class="col-4">
          <nuxt-link :to="{name:'dashboard-verified'}" class="btn-theme btn w-100 text-white px-0" style="border-radius: 20px;">
            <small>ยืนยันข้อมูล</small>
          </nuxt-link>
        </div>
        <div class="col-6">
          <small class="text-template font-weight-100">รหัส Pincode :</small>
          <small class="text-template font-weight-100">{{$auth.user.pincode}}</small>
        </div>
        <div class="col-6"></div>
      </div>
      <div>
        <div class="text-center">
          <a
            class="btn btn-md btn-light text-template btn-block shadow mt-3"
            v-b-toggle.collapse-password
            @click="$refs.password.focus()"
          >
           เปลี่ยนรหัสผ่านเข้าเกม
          </a>
          <b-collapse id="collapse-password" class="my-2" @shown="$refs.password.focus()">
            <b-card ref="formResetPassword">
              <p class="card-text text-template">เปลี่ยนรหัสผ่านเข้าเกม</p>
              <div class="text-center"></div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control text-center text-white bg-background"
                      ref="password"
                      placeholder="กรุณากรอกรหัสผ่านใหม่"
                    />
                    <small class="text-danger">
                      *** รหัสผ่านต้องมีตั้งแต่ 6-12 ตัวขึ้นไป และมีภาษาอังกฤษ พิมพ์เล็กและใหญ่
                      เช่น
                      Abc123
                    </small>
                  </div>
                  <button
                    class="btn btn-md bg-dark text-success text-template btn-block shadow"
                    @click="resetPassword"
                  >
                    <span class="text-light">ยืนยัน</span>
                  </button>
                </div>
              </div>
            </b-card>
          </b-collapse>
          <div class="mb-3"></div>
        </div>
      </div>
      <div class=" mt-0">
       
        <div class="text-center ">
          <a class="btn btn-md btn-light text-template btn-block shadow" v-b-toggle.collapse-pin>
            เปลี่ยน PIN เข้าสู่ระบบ
          </a>
          <b-collapse id="collapse-pin" class="my-2" @shown="$refs.pincodeOne.focus()">
            <b-card ref="formChangePincode">
              <p class="card-text text-template">PIN เข้าสู่ระบบ</p>
              <div class="text-center"></div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group float-label">
                    <input
                      type="password"
                      ref="pincodeOne"
                      class="form-control text-center bg-background text-white"
                      maxlength="4"
                      placeholder="กรุณากรอกรหัสผ่าน"
                    />
                  </div>
                  <div class="form-group float-label">
                    <input
                      type="password"
                      ref="pincodeTwo"
                      class="form-control text-center bg-background text-white"
                      maxlength="4"
                      placeholder="กรุณายืนยันรหัสผ่าน"
                    />
                    <small
                      class="text-danger"
                    >หมายเหตุ: “ตัวเลข4 หลัก” เพื่อใช้สำหรับเข้าสู่ระบบล็อกอิน</small>
                  </div>
                  <button class="btn btn-md bg-dark btn-block shadow" @click="resetPincode">
                    <span class="text-light">ยืนยัน</span>
                  </button>
                </div>
              </div>
            </b-card>
          </b-collapse>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 justify-content-center mt-4">
        <div class="form-group text-center" v-show="(typeGame.bonus_status)">
          <h6 class="text-template font-weight-100" tabindex="0" id="yes-promotion">
            โปรโมชั่น
            <span class="material-icons text-template" style="margin:-2px 4px; position: absolute;">help</span>
          </h6>
          <div class="onoffswitch" style="width:100px;margin:0 auto;">
            <input
              type="checkbox"
              ref="checkBoxPromotion"
              class="onoffswitch-checkbox"
              id="myonoffswitch"
              v-if="$auth.user.player_bonus==1"
              checked
            />
            <input
              type="checkbox"
              ref="checkBoxPromotion"
              class="onoffswitch-checkbox"
              id="myonoffswitch"
              v-else
            />
            <label @click="changeBonus" class="onoffswitch-label" for="myonoffswitch">
              <span class="onoffswitch-inner"></span>
              <span class="onoffswitch-switch"></span>
            </label>
          </div>
        </div>

        <b-tooltip
          target="yes-promotion"
          style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(12px, 211px, 0px);"
        >
          <!-- game slot -->
          <span v-if="typeGame.slot_status">
          
            <b-alert show variant="bg-danger dark">
              <small class="d-block text-white">เงื่อนไขหากเลือก "รับโปรโมชั่น"</small>
              <hr class="border-bottom" />
              <small class="text-left pl-2 d-block text-white">- ต้องทำยอดเทิร์นตามกติกา จึงจะถอนเงินได้</small>
              <small class="text-left pl-2 d-block text-white">- ได้สิทธิ์ร่วมกิจกรรม เช่น สะสมแต้ม ขาประจำ</small>
              <small class="text-left pl-2 d-block text-white">
                - หากมีการวางเดิมพัน
                <u>เกมคาสิโนออนไลน์</u> ในตอนท่านถอนเงินจะถูกตัดเงินเฉพาะส่วนโปรโมชั่นที่ท่านได้ออกทั้งหมด
              </small>
            </b-alert>
            <b-alert show variant="bg-danger dark">
              <small class="d-block text-white mt-2">เงื่อนไขหากเลือก "ไม่รับโปรโมชั่น"</small>
              <hr class="border-bottom" />
              <small class="text-left pl-2 d-block text-white">- ไม่ต้องทำเทิร์น ถอนเงินได้ทุกยอด</small>
              <small class="text-left pl-2 d-block text-white">- ไม่สามารถร่วมกิจกรรม เช่น สะสมแต้ม ขาประจำ</small>
            </b-alert>
          </span>
          <!-- game luca -->
          <span v-if="typeGame.casino_status">
            <b-alert show variant="bg-danger dark">
              <small class="d-block text-white">เงื่อนไขหากเลือก "รับโปรโมชั่น"</small>
              <hr class="border-bottom" />
              <small class="text-left pl-2 d-block text-white">- ต้องทำยอดเทิร์นตามกติกา จึงจะถอนเงินได้</small>
            </b-alert>
            <b-alert show variant="bg-danger dark">
              <small class="d-block text-white mt-2">เงื่อนไขหากเลือก "ไม่รับโปรโมชั่น"</small>
              <hr class="border-bottom" />
              <small class="text-left pl-2 d-block text-white">- ไม่ต้องทำเทิร์น ถอนเงินได้ทุกยอด</small>
            </b-alert>
          </span>
        </b-tooltip>
      </div>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Verified from '~/components/Verified.vue'
export default {
  head() {
    return {
      title: "Profile",
    };
  },
  data: () => ({
    // showText: false,
    typeGame: {},
    options: [
      {
        text: "รับโปร",
        value: "1",
      },
      {
        text: "ไม่รับโปร",
        value: "0",
      },
    ],
  }),

  asyncData: async function ({ params, $auth, $axios }) {
    const dataGame = await $axios
      .request({
        method: "GET",
        url: "/api/get-promotion-game",
      })
      .then((response) => response.data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return {
          bonus_status: true,
          slot_status: null,
          casino_status: null,
        };
      });
    return {
      selected: $auth.user.player_bonus,
      typeGame: dataGame || {},
    };
  },

  watch: {
    // whenever question changes, this function will run
    selected: function (newQuestion, oldQuestion) {
      this.changeBonus();
    },
  },
  components: {
    //  'page-verified' : Verified,
  },
  computed: {
    ...mapGetters(["getThemeObject", "getSettingObject"]),
  },
  mounted: function () {
    // this.showText = (this.$auth.user.player_bonus==1)? false : true
    //  if (this.$auth.user.lname == 'Not verified') {
    //         const loader = this.$loading.show({'is-full-page':  true});
    //         setTimeout(() => {
    //             this.$router.push({name:"dashboard-verified"});
    //           //  this.$refs['verified-modal'].show();
    //            loader.hide();
    //         }, 800);
    //     }
  },
  methods: {
    acceptPromotion: function () {
      //  const respones = this.$axios.$get("/api/line/login-authorize");
    },
    connectLinefunction() {
      const respones = this.$axios.$get("/api/line/login-authorize");
      window.location = respones.redirect;
    },
    fetchUser: function () {
      const loader = this.$loading.show({
        container: this.$refs.formInfoUser,
      });
      this.isSpin = true;
      this.$auth
        .fetchUser()
        .then((res) => {
          if(this.$route.name != 'dashboard-profile'){
            this.$toast.global.success({
              message: "อัพเดทข้อมูลเรียบร้อย",
            });
          }
          
          
          setTimeout(function(){this.isSpin = false;
            loader.hide();
          },800);
          
        })
        .catch((e) => {
          this.isSpin = false;
          loader.hide();
        });
    },
    exchangeCredit: async function () {
      const loader = this.$loading.show({
        container: this.$refs.formInfoUser,
      });
      const { success, message } = await this.$axios.$post("/api/topup-bonus", {
        val: this.$refs.exchange.value,
      });
      if (success) {
        this.$root.$emit("bv::toggle::collapse", "collapse-exchange");
        this.$refs.exchange.value = "";
        this.$auth.fetchUser();
        this.$toast.global.success({
          message: message,
        });
        loader.hide();
      } else {
        this.$refs.exchange.focus();
        this.$toast.global.error({
          message: message,
        });
        loader.hide();
      }
    },
    changeBonus: async function () {
      const loader = this.$loading.show({
        container: this.$refs.formProfileUser,
      });
      const { success } = await this.$axios.$get("/api/change-bonus-status");
      if (success) {
        let alertMassegr ="คุณเลือกไม่โปรโมชั่น";
        if(this.$auth.user.player_bonus==0){
          alertMassegr ="รับโปรโมชั่นสำเร็จแล้ว";
        }
        this.$toast.global.success({
          message: alertMassegr,
        });
        this.fetchUser();
      } else {
        this.$toast.global.error({
          message: "อัพเดทโปรโมชั่นไม่สำเร็จ",
        });
      }
      loader.hide();
    },
    resetPassword: async function () {
      if (
        !!this.$refs.password.value.match(/[a-z]/g) &&
        !!this.$refs.password.value.match(/[A-Z]/g) &&
        this.$refs.password.value.length >= 6
      ) {
        const loader = this.$loading.show({
          "is-full-page": true,
        });
        const res = await this.$axios.$post("/api/reset-password", {
          password: this.$refs.password.value,
        });
        this.$toast.global.success({
          message: "อัพเดทรหัสเข้าเกมผ่านสำเร็จ",
        });
        this.$root.$emit('bv::toggle::collapse', 'collapse-password');
        this.$refs.password.value = "";
        this.$auth.fetchUser();
        loader.hide();
      } else {
        this.$toast.global.error({
          message:
            "รหัสผ่านต้องมีตั้งแต่ 6-12 ตัว และมีภาษาอังกฤษ พิมพ์เล็กและใหญ่ เช่น Abc123",
        });
        this.$refs.password.focus();
      }
    },
    resetPincode: async function () {
      if (this.$refs.pincodeOne.value.length != 4) {
        this.$toast.global.error({
          message: "ห้ามมีช่องว่างและเป็นตัวเลข 4 หลักเท่านั้น",
        });
        this.$refs.pincodeOne.focus();
        return;
      }

      if (!this.$refs.pincodeOne.value.match(/^[0-9]+$/)) {
        this.$toast.global.error({
          message: "ต้องเป็นตัวเลขเท่านั้น",
        });
        this.$refs.pincodeOne.focus();
        return;
      }

      if (this.$refs.pincodeTwo.value.length != 4) {
        this.$toast.global.error({
          message: "ห้ามว่างและต้องมี 4 หลักเท่านั้น",
        });
        this.$refs.pincodeTwo.focus();
        return;
      }

      if (!this.$refs.pincodeTwo.value.match(/^[0-9]+$/)) {
        this.$toast.global.error({
          message: "ต้องเป็นตัวเลขเท่านั้น",
        });
        this.$refs.pincodeTwo.focus();
        return;
      }

      if (this.$refs.pincodeOne.value != this.$refs.pincodeTwo.value) {
        this.$toast.global.error({
          message: "Pincode ไม่ตรงกัน",
        });
        this.$refs.pincodeTwo.focus();
        return;
      }

      const loader = this.$loading.show({
        "is-full-page": true,
      });
      const { success } = await this.$axios.$post("/api/change-pincode", {
        pincode: this.$refs.pincodeOne.value,
      });

      if (success) {
        this.$toast.global.success({
          message: "อัพเดท Pincode สำเร็จเรียบร้อย",
        });
        this.$root.$emit('bv::toggle::collapse', 'collapse-pin');
      } else {
        this.$toast.global.error({
          message: "กรุณาตรวจสอบข้อมูล",
        });
      }
      this.$refs.pincodeOne.value = "";
      this.$refs.pincodeTwo.value = "";
      this.$auth.fetchUser();
      loader.hide();
    },
    copyAffiliate: function (target) {
      this.$refs[target].select();
      document.execCommand("copy");
      this.$toast.global.success({
        message: "คัดลอกลงคลิปบอร์ดแล้ว",
      });
    },
    copyUser: function (target) {
      document.getElementById("cbc1").style.display = "none";
      document.getElementById("cbc2").style.display = "block";
      // $("#cbc1").addClass("display-none");
      // $("#cbc2").removeClass("display-none");
      setTimeout(function () {
        document.getElementById("cbc2").style.display = "none";
        document.getElementById("cbc1").style.display = "block";
      }, 2400);
      this.$refs[target].select();
      document.execCommand("copy");
      this.$toast.global.success({
        message: "คัดลอกลงคลิปบอร์ดแล้ว",
      });
    },
  },
};
</script>

<style>
.display-none {
  display: none;
}

.pin {
  right: 15px;
  top: 12px;
  position: absolute;
}



button.form-controles,
input.form-controles {
  color: #ccc;
  border: 1px solid #a0a0a0;
  background-color: #2f2d2f;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}

.border-bottom {
  margin: 5px;
  margin-left: 0;
  right: 0;
  width: 100%;
  height: 0px;
  background-color: #ff1100;
}

.tooltip {
  font-family: "Kanit", sans-serif;
}

.tooltip-inner {
  max-width: 350px;
  padding: 0.25rem 0.5rem;
  
  text-align: center;
  background-color: #000;
  border-radius: 0.25rem;
}

.onoffswitch {
  position: relative;
  width: 90px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.onoffswitch-checkbox {
  display: none;
}

.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #d1d1d1;
  border-radius: 20px;
}

.onoffswitch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}

.onoffswitch-inner:before,
.onoffswitch-inner:after {
  display: block;
  float: left;
  width: 50%;
  height: 25px;
  padding: 0;
  line-height: 30px;
  font-size: 14px;
  font-weight: 100;
  color: white;
  /* font-family: Trebuchet, Arial, sans-serif; */
  font-weight: bold;
  box-sizing: border-box;
}
.onoffswitch-inner:before {
  content: "NO";
  padding-left: 0px;
   background: linear-gradient(90deg,hsl(0deg 49% 61% / 50%) 0,rgb(0 0 0 / 38%));
  background-color: #4b0404;
  color: #ffffff;
  font-weight:100;
}

.onoffswitch-inner:after {
  content: "OFF";
  padding-right: 15px;
  background-color: #eeeeee;
  color: #ec1415;
  text-align: right;
  font-weight:100;
}

.onoffswitch-switch {
  display: block;
  width: 15px;
  margin: 7.5px;
  background: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 68px;
  border: 2px solid #d1d1d1;
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
}

.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}

.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  right: 0px;
}

input.focus {
  color: #f00;
  background: none;
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

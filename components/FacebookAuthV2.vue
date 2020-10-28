<template>
  <div>
    <a
      class="my-2 btn btn-facebook btn-rounded  btn-block text-white broder-1 w-100"
      @click="logInWithFacebook"
    >
      <img src="https://image.flaticon.com/icons/png/512/23/23730.png" alt style="width:20px; filter:invert(1);" class="mx-3">
      เข้าสู่ระบบด้วยเฟสบุ๊ค 
    </a>
    <b-modal id="modal-fb" title="เข้าสู่ระบบด้วย Facebook" hide-footer no-close-on-backdrop>
      <b-overlay
      id="overlay-background"
      :variant="'light'"
      :opacity="0.3"
      :blur="'2px'"
      rounded="sm"
      >
        <div class="row px-2 py-2">
          <div class="col-12">
            <small for="tel">เบอร์โทร</small>
            <b-form-input minlength="10" maxlength="10" :disabled="showOtp||showPin" class="my-2" v-model="tel" placeholder="เบอร์โทร 10 หลัก"></b-form-input>
          </div>
          <div class="col-12 text-right" v-show="!showOtp&&!showPin">
            <b-button @click="checkPhoneNumber">ยืนยันเบอร์โทร</b-button>
          </div>
          <div class="col-12" v-show="showOtp">
            <small for="otp">ยืนยันรหัส OTP</small>
            <b-form-input minlength="6" maxlength="6" class="my-2" v-model="otp" placeholder="รหัส OTP 6 หลัก"></b-form-input>
          </div>
          <div class="col-12 text-right" v-show="showOtp">
            <b-button @click="facebookCheckOtp">ยืนยัน OTP</b-button>
          </div>
          <div class="col-12" v-show="showPin">
            <small for="otp">รหัส PIN</small>
            <b-form-input minlength="4" maxlength="4" class="my-2" v-model="pin" placeholder="PIN 4 หลัก"></b-form-input>
          </div>
          <div class="col-12 text-right" v-show="showPin">
            <b-button @click="facebookCheckPin">ยืนยัน pin</b-button>
          </div>
        </div>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel:'',
      name:'',
      email:'',
      picture:'',
      otp:'',
      pin:'',
      showOtp:false,
      showPin:false,
      show:false,
      user:'',
      fbIdFromBacknd:''
    }
  },
  computed:{
    getSettingObject: function () {
      return this.$store.getters.getSettingObject;
    },
  },
  methods: {
    async logInWithFacebook() {
      let self = this
      FB.init({
        appId: this.getSettingObject.app_id_facebook,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v8.0",
      });
      window.FB.login(function(response) {
        window.FB.api('/me?fields=name,email,picture',(function(response){
          self.user = response
          self.facebook_id = self.user.id
          self.name = self.user.name
          self.email = self.user.email || '-'
          self.picture = self.user.picture
          // console.log(self.user);
          if(response.id){
            self.apiFacebook(response.id)
          }else{
            self.$toast.global.error({
              message: "ยกเลิกการเข้าสู่ระบบด้วย Facebook",
            });
          }
        }))
      }, );
    },

    apiFacebook : async function(facebook_id){
      await this.$axios.request({
        method: 'POST',
        url: '/api/line/check-facebook',
        data:{
          "facebook_id":facebook_id,
        }
      })
      .then(response => response.data)
      .then((response) => {
        if (response.status == 200){
          this.loginFromRedirect(response.redirect)
        } else if (response.status == 404){
          this.$root.$emit('bv::show::modal', 'modal-fb')
        } else {
           this.$toast.global.error({
          message: response.message,
        });
        }
      })
      this.show = false
    },

    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },

    checkPhoneNumber : async function(){
      // validate phone number
      if(this.tel.length!=10){
        this.$toast.global.error({
            message: 'เบอร์โทรไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
          });
        return false;
      }

      this.$bvModal.show('modal-fb')
      await this.$axios.request({
        method: 'POST',
        url: '/api/line/check-phone-number',
        data:{
            "tel":this.tel,       
        }
      })
      .then(response => response.data)
      .then((response) => {
        if (response.success){
          this.sendOtp()
          this.showPin = false
          this.showOtp = true
        } else {
          this.showPin = true
          this.showOtp = false
        }
      }).catch((error) => {
        this.$toast.global.error({
          message: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง",
        });
      })
      this.show = false
    },

    sendOtp : async function(){
      this.$bvModal.show('modal-fb')
      await this.$axios.request({
        method: 'POST',
        url: '/api/send-otp',
        data:{
            "tel":this.tel,       
        }
      })
      .then(response => response.data)
      .then((response) => {
        if (response.success){
          this.$toast.global.success({
              message: 'ส่งรหัส OTP ไปยังเบอร์ '+this.tel,
          });
        } else {
          this.$toast.global.error({
            message: response.data,
          });
        }
      }).catch((error) => {
        this.$toast.global.error({
          message: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง",
        });
      })
      this.show = false
    },

    facebookCheckOtp : async function(){
      // validate otp
      if(this.otp.length!=6){
          this.$toast.global.error({
            message: 'รหัส otp ไม่ถูกต้อง',
          });
        return false;
      }
      this.$bvModal.show('modal-fb')
      await this.$axios.request({
        method: 'POST',
        url: '/api/line/facebook-check-otp',
        data:{
          "facebook_id": this.facebook_id,
          "email": this.email,
          "name": this.name,
          "img_pro": this.picture,
          "tel": this.tel,
          "otp": this.otp    
        }
      })
      .then(response => response.data)
      .then((response) => {
        if (response.success){
          location.replace(response.redirect);
        } else {
          this.$toast.global.error({
            message: response.message,
          });
        }
      }).catch((error) => {
        this.$toast.global.error({
          message: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง",
        });
      })
      this.show = false
    },

    facebookCheckPin : async function(){
      // validate pin 
      if(this.pin.length!=4){
        this.$toast.global.error({
          message: "ยืนยันรหัส pin ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
        });
        return false;
      }

      this.$bvModal.show('modal-fb')
      await this.$axios.request({
        method: 'POST',
        url: '/api/line/facebook-check-pin',
        data:{
          "facebook_id": this.facebook_id,
          "email": this.email,
          "name": this.name,
          "img_pro": this.picture,
          "tel": this.tel,
          "pin": this.pin    
        }
      })
      .then(response => response.data)
      .then((response) => {
        if (response.success){
          location.replace(response.redirect);
        } else {
          this.$toast.global.error({
            message: response.message,
          });
        }
      }).catch((error) => {
        this.$toast.global.error({
          message: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง",
        });
      })
      this.show = false
    },

    loginFromRedirect(redirect){
      let queryStr =  redirect.slice(redirect.indexOf('?')+1)
      let userObj =   Object.fromEntries(new URLSearchParams(queryStr))
        this.$auth
        .loginWith("local", {
          data: {
            username: userObj.username,
            password: userObj.password
          },
        })
        .then(() => {
          this.$router.push({
            name: "dashboard",
          });
          this.$toast.global.success({
            message: "เข้าสู่ระบบเรียบร้อยแล้ว",
          });
        }).catch(() => {
            this.$toast.global.error({
              message: "ยืนยันตัวตนไม่ถูกต้อง",
            });
        })
    }
  },
};
</script>

<style>
.boxFb {
  color: white;
  background: #1877F2;
}
</style>
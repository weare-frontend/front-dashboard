<template>

    <div class="container">
      <div class="row" style="min-height: 780px;">
        <div class="col align-self-center px-3 text-center">
                
          <div class="row">
            <div class="col-12">
              <img :src="getThemeObject[2].img" alt="logo" class="logo-small" />
              <p class="text-template">{{$auth.user.fullname}}</p>
              <b-alert show variant="warning w-330">
                <h5 class="m-0">เราทำการล็อคหน้าจอของท่านแล้ว</h5>
                <small class="text-danger">กรุณากรอก PINCODE ของท่านให้ถูกต้อง</small>
              </b-alert>
            </div>
            <div class="col-12 my-2">
              <div class="input-wrapper">
                <client-only placeholder="Loading...">
                  <pincode-input v-model="inputConfirmPincode"  placeholder="*" :autofocus="true"></pincode-input>
                </client-only>
              </div>
            </div>
            <div class="col-12" >
              <a @click="unlockScreen" class="btn btn-default btn-lg btn-rounded shadow btn-block w-330">เข้าสู่ระบบ</a>
              <a @click="logout" class="btn btn-dark btn-lg my-2 btn-rounded shadow btn-block w-330 ">ออกจากระบบ</a>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<style>
.vue-pincode-input-wrapper {
      display: flex!important;
     justify-content: center;
}

input.vue-pincode-input {
  color: #495057;
  background: #222222;
  max-width: 77px;
  height: 45px;
}
</style>

<style scoped>
.w-330{
    width: 330px;
    margin: auto;
}
</style>


<script>
export default {
    head() {
      return {
        title: 'Lockscreen',
      }
    },
    data : () => ({
        inputConfirmPincode : ''
    }),
    computed: {
      getThemeObject () {
        return this.$store.getters.getThemeObject
      }
    },
    created : function(){
      this.$cookies.set('lockscreen',true);
    },
    methods : {
        unlockScreen : async function(){
           const loader = this.$loading.show({container:  null}); 
           const loggedIn = this.$axios.$post("/api/login", {
             username: this.$auth.user.tel,
             password: this.inputConfirmPincode
           })

           loggedIn.catch(() => {
             loader.hide();
             this.inputConfirmPincode = "";
             this.$toast.global.error({
               message: "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล"
             });
           })

           loggedIn.then(res => {
             loader.hide();
             if (res.success) {
              //  console.log(this.checkOS());
                
               this.$cookies.remove('lockscreen');
               this.$router.push({
                 name: 'dashboard'
               });
               this.$toast.global.success({
                 message: "เข้าสู่ระบบเรียบร้อยแล้ว"
               });
             } else {
               this.inputConfirmPincode = "";
               this.$toast.global.error({
                 message: "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล"
               });

             }
           });
        },
         checkOS :function(){
          if(this.$device.isMacOS && this.$device.isDesktop){
            return "MacOS"
          }else if(this.$device.isWindows){
            return "Windows"
          }else if(this.$device.isIos && this.$device.isMobile){
            return "IOS"
          }else if(this.$device.isAndroid){
            return "Android"
          }else if(this.$device.isMacOS){
            return "IOS"
          }else{
            return "Other"
          }
        },
        saveLogs: function (ip) {
          this.isLoading = true
          let token = this.$store.state.auth;
          this.$axios.request({
              method: 'POST',
              url: "/api/log-device-login",
              headers: {
                  Authorization: `Bearer ${token}`
              },
              data :{
                os: this.checkOS()
              }
          })
          .then(response => response.data)
          .then(response => {
          // console.log("[log] => success.");
          }).catch(error => {
          this.isLoading = false
          // console.log("[log] => error.");
          })
        },
        logout: function () {
          this.$cookies.remove('lockscreen');
          this.$toast.global.success({
            message: 'ออกจากระบบสำเร็จแล้ว'
          });
          this.$auth.logout();
          this.$router.push({
            name: 'login'
          });
        }
    }
}
</script>
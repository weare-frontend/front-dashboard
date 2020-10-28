<template>
  <div class="container">
    <div class="justify-content-center no-gutters login-row">
      <div class="row">
        <div class="col-12 px-3 py-4 text-center">
          <img :src="getThemeObject[2].img" alt="logo" class="logo-small mt-3" style="cursor: pointer;" @click="webFront"/>
        </div>
      </div>
      <div class="row" id="userLogin">
        <div class="col align-self-center px-3 text-center">
          <form
            class="form-signin mt-3"
          >
            <div class="row">
              <div class="col-12 mt-2 mb-2">
                <p style="font-size:24px;font-weight:100;" class="text-white">
                  <!-- <img src="https://i.imgur.com/oV4HGbA.png" style="width:40px;filter:invert(1);" />  -->
                  เข้าสู่ระบบ
                </p>
              </div>
              <div data-v-f9119b72 class="col-12 mt-4">
                <div data-v-f9119b72 class="form-group float-label active">
                  <p
                    class="form-control-label"
                    style="margin-top: -30px;margin-left: -10px;color:#fff;"
                  >เบอร์โทร/Username</p>
                  <input
                    data-v-f9119b72
                    type="text"
                    v-model="username"
                    ref="username"
                    maxlength="20"
                    placeholder="กรอกเบอร์โทร/Username"
                    required="required"
                    class="form-control text-white"
                  />
                  <div data-v-f9119b72 class="invalid-feedback"></div>
                </div>
              </div>

              <div data-v-f9119b72 class="col-12 mt-2">
                <div data-v-f9119b72 class="form-group float-label active">
                  <p
                    data-v-f9119b72
                    class="form-control-label"
                    style="margin-top: -30px;margin-left: -10px;color:#fff;"
                  >PIN/Password</p>
                  <input
                    data-v-f9119b72
                    type="password"
                    ref="password"
                    v-model="password"
                    @keyup.enter="submit"
                    maxlength="10"
                    placeholder="กรอก PIN/รหัสผ่าน"
                    required="required"
                    pattern="\d*"
                    class="form-control text-white"
                  />

                  <div data-v-f9119b72 class="invalid-feedback"></div>
                </div>
              </div>

              <!-- <div class="col-12">
                    <div class="form-group float-label">
                    <input type="text" v-model="username" ref="username"
                        class="form-control form-control-lg text-center text-white" placeholder required autofocus
                        style=" border: 1px solid #ccc;" />
                    <label class="form-control-label" style="color:#ddd;">Username</label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group float-label">
                    <input type="password" ref="password" v-model="password" @keyup.enter="submit"
                        class="form-control form-control-lg text-center text-white" placeholder autocomplete
                        style=" border: 1px solid #ccc;" />
                    <label class="form-control-label" style="color:#ddd;">PIN/Password</label>
                    </div>
              </div>-->
              <div class="col-12 mt-2 justify-content-center">
                <nuxt-link
                  class="btn-register text-white btn btn-md mb-2 shadow btn-block"
                  :to="{name : 'register-id' }"
                  id="btn-register"
                >สมัครสมาชิก</nuxt-link>
                <a
                  @click="submit"
                  class="btn-login btn border-1"
               
                  id="btn-login"
                >เข้าสู่ระบบ</a>
                <a
                  class="btn bg-template border-1"
                  style="background: linear-gradient(to right, #ffffff80 0%, #00000000 100%);border: 1px solid #ccc;font-size:14px; width:48%; float: right; color:#051c1d; border-radius: 8px; padding:10px 8px; font-weight: 100;"
                  id="btnfalse"
                >กำลังตรวจสอบ..</a>
              </div>
              <!-- <a href="#" class="mt-4 d-block">ลืมรหัสผ่าน</a>-->
              <div class="container mt-2 px-3 ml-4"  v-if="getSettingObject.status_facebook=='1' || getSettingObject.status_line_login=='1'">
                <div class="col-12 row">
                  <div class="col-5"><hr class="or"></div>
                  <div class="col-2 px-1 my-2 text-white"><p>หรือ</p></div>
                  <div class="col-5"><hr class="or"></div>
                </div>
              </div> 
              <div
                class="col-12 justify-content-center"
                v-if="getSettingObject.status_line_login=='1'"
              >
                <a
                  class="my-2 btn btn-line btn-rounded shadow btn-block text-white broder-1 w-100 py-2 broder-1"
                  @click="checkLoginState"
                >
                  <img src="~/assets/img/line-logo.png" alt style="width:28px; filter: brightness(9);" class="mx-3">
                  เข้าสู่ระบบด้วยไลน์ 
                </a>
              </div>
              <!-- <p class="text-white">{{getSettingObject}}</p> -->
              <div class="col-12 justify-content-center" v-if="getSettingObject.status_facebook=='1'">
                <FacebookAuthV2></FacebookAuthV2>
              </div>
            </div>
          </form>
          
        </div>
      </div>

      <div class="row justify-content-center mt-3">
        <div class="col-10">
          
          <!-- <hr class="line" /> -->
          <div class="text-center text-white" style="margin-top:20px;font-size: 13px;">
            <!-- &copy; 2020 Supported by
            EXPGaming.com
            <br> -->
            Version {{$store.state.appVersion}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FacebookAuthV2 from "~/components/FacebookAuthV2.vue";
export default {
  head() {
    return {
      title: "Login",
      redirect: "",
      username: this.$route.query.username,
      password: this.$route.query.password,
    };
  },
  computed: {
    ...mapGetters(["getThemeObject", "getSettingObject"]),
  },
  components:{
    FacebookAuthV2
  },
  layout: "login",
  auth: "guest",
  asyncData: async function ({ route }) {
    return {
      username: route.query.username,
      password: route.query.password,
    };
  },
  created: async function () {
    if (this.$route.query.friendshipid) {
      this.$cookies.set("friendship", this.$route.query.friendshipid, {
        maxAge: 82800,
      });
      this.checkLoginState();
    }
  },
  mounted: function () {
    if (this.$route.query.code) {
      this.accessToken();
    }

    if (this.username && this.password) {
      this.submit();
    }
  },
  methods: {
    submit: function (event) {
      const loader = this.$loading.show({
        container: this.$refs.form,
      });
      document.getElementById("btn-login").style.display = "none";
      document.getElementById("btnfalse").style.display = "block";
      // this.$bvModal.show('modalLoad');
      // const loader = this.$loading.show({ 'is-full-page': true });
      setTimeout(() => {
        document.getElementById("btn-login").style.display = "block";
        document.getElementById("btnfalse").style.display = "none";
        loader.hide();
      }, 1800);
      if (!this.$refs.username.value) {
        this.$toast.global.error({
          message: "กรุณากรอก Username",
        });
      } else if (!this.$refs.password.value) {
        this.$toast.global.error({
          message: "กรุณากรอก PIN/Password",
        });
      } else {
        setTimeout(() => {
          this.$auth
            .loginWith("local", {
              data: {
                username: this.$refs.username.value,
                password: this.$refs.password.value,
              },
            })
            .then(() => {
              this.$router.push({
                name: "dashboard",
              });
              window.location = "dashboard";
              this.$toast.global.success({
                message: "เข้าสู่ระบบเรียบร้อยแล้ว",
              });
            })
            .catch(() => {
              if (!this.$refs.username.value) {
                this.$toast.global.error({
                  message: "กรุณากรอก Username",
                });
              } else if (!this.$refs.password.value) {
                this.$toast.global.error({
                  message: "กรุณากรอก PIN/Password",
                });
              } else {
                this.$toast.global.error({
                  message: "Username หรือ PIN/Password ไม่ถูกต้อง",
                });
              }
            });
        }, 400);
      }
    },
    checkLoginState: async function () {
      const loader = this.$loading.show({
        "is-full-page": true,
      });
      const respones = await this.$axios.$get("/api/line/login-authorize");
      window.location = respones.redirect;
    },
    accessToken() {
      const respones = this.$axios.$get("/api/line/login-token", {
        params: {
          code: this.$route.query.code,
        },
      });
    },
    checkLoginUser() {
      setTimeout(function () {
        document.getElementById("userLogin").style.display = "none";
        document.getElementById("idUser").style.display = "block";
      }, 1200);
    },
    webFront: function () {
            window.location.replace(this.getSettingObject.link_front);
        },
  },
};
</script>

<style scoped>

.wrapper {
    background: #1e7773;
    background: -webkit-gradient(left top, left bottom, color-stop(0%, #1e7773), color-stop(100%, #1e7773));
    background: linear-gradient(to bottom, #1e7773 0%, #1e7773 100%);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#1e7773', endColorstr='#1e7773', GradientType=0);
    background-attachment: fixed;
    background-position: center top;
    background-size: 100% 100%;
}
.border-1 {
  border: solid 1px #fff;
}

.border-2 {
  border: solid 2px #fff;
}

#btnfalse {
  display: none;
}

#idUser {
  display: none;
}
.broder-1 {
  border: solid 1px #ccc;
}
hr.or{
  border: 0.5px solid #ccc;
}
</style>

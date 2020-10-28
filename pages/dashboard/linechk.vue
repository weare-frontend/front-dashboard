<template>
<div>
    <div class="header bg-white">
        <div class="text-center" style="padding-top: 15px; padding-bottom: 10px;">
            <nuxt-link :to="{name : 'dashboard'}" class="text-center">
                <b-img style=" width:auto;height: 60px;filter: drop-shadow(0px 1px 1px black);" :src="getThemeObject[2].img|| ''" fluid alt="Responsive image"></b-img>
            </nuxt-link>
        </div>
    </div>
    <div
      class="row no-gutters login-row justify-content-center bg-template pb-5"
      ref="formRegisterUser"
      style="width: 100%;position:absolute; margin-right: 0px; margin-left: 0px; margin-top: -95px;border-top-left-radius:70px;border-top-right-radius: 70px;height:110vh;overflow: overlay;"
      >
        <div class="container pt-5">
            <div class="row" id="successTel">
               <h4 class="text-center text-white font-weight-100">
            ยืนยันข้อมูลการสมัคร
          </h4>
            <p class="text-center text-danger">ท่านต้องยืนยันข้อมูลการสมัครก่อนจะเข้าสู่ระบบ</p>     
            </div>
            <br />
            <div class="row justify-content-center">
                <div class="col-12 mt-1" id="tel">
                    <div class="form-group">
                        <h6 class="text-white font-weight-100">เบอร์โทร</h6>
                        <input type="text" id="tel1" v-model="inputPhoneNumber" @keyup="removeValidation('inputPhoneNumber')" pattern="\d*" ref="inputPhoneNumber" :class="{'is-invalid' : formValidation('inputPhoneNumber')}" class="form-controls form-control-lg bg-white px-4 text-dark" placeholder="เบอร์โทร" style="border-radius: 25px; " required maxlength="10" />
                        <div class="invalid-feedback">{{ formValidation('inputPhoneNumber') }}</div>

                        <small id="thisPhone">เพื่อยืนยัน OTP จากระบบ</small>
                    </div>
                </div>
                <!-- otp -->
                <div class="col-12" id="acceptOtp">
                    <b-collapse id="collapse-otp">
                        <div class="form-group">
                            <h6 class="text-white font-weight-100">OTP</h6>
                            <input type="tel" ref="inputOtpNumber" v-model="inputOtpNumber" :class="{'is-invalid' : formValidation('inputOtpNumber')}" @keyup="removeValidation('inputOtpNumber')" class="form-controls form-control-lg bg-white px-4 text-dark" style="border-radius: 25px; " placeholder="OTP" required />
                            <div class="invalid-feedback">{{formValidation('inputOtpNumber')}}</div>
                        </div>
                         <a class="text-white" v-if="this.coutDownOtp < 0" @click="getOtp_Again">ขอ (OTP) ใหม่อีกครั้ง</a>
                        <a class="text-danger" style="font-size: 16px" v-else>จะสามารถลองใหม่อีกครั้งภายใน เวลา {{this.textContent}} นาที</a>
                    </b-collapse>
                </div>

                <div class="col-12" id="acceptOtpBtn">
                    <b-overlay :show="show" rounded="sm" :opacity="0.4" :blur="'2px'" :variant="'dark'">
                        <div class="form-group mt-2">
                            <b-button class="btn btn-md btn-theme shadow btn-block text-white font-weight-100"  size="md" id="send-otp" @click="acceptResearch">ยืนยันข้อมูล</b-button>
                            <b-button class="btn btn-md btn-theme shadow btn-block text-white font-weight-100"  size="md" id="accepted-otp" @click="acceptOtp">ยืนยัน OTP</b-button>
                        </div>
                    </b-overlay>
                </div>

                <!-- setting pin -->
                <div class="col-12" id="settingpin">
                    <b-collapse id="collapse-setting-pin">
                        <div class="col-12 text-center">
                            <h6 class="text-white">ตั้งรหัส PIN เข้าสู่ระบบ</h6>
                            <div class="input-wrappe">
                                <client-only placeholder="Loading...">
                                    <pincode-input v-model="inputPincode" class="form-controls text-center" placeholder="_" :autofocus="true"></pincode-input>
                                </client-only>
                                <br />
                                <small class="text-danger text-left">{{formValidation('inputPincode')}}</small>
                            </div>
                        </div>
                    </b-collapse>
                </div>
                <div class="col-12" id="settingpinBtn">
                    <div class="form-group mt-4">
                        <b-button class="btn btn-md display-none btn-theme shadow btn-block text-white font-weight-100" size="md" id="setting-pin" @click="acceptSettingPin">ยืนยัน PIN</b-button>
                    </div>
                </div>
                <!-- แสดงผล pin ที่ลูกค้าตั้ง -->
                <div class="col-12 justify-content-center" id="successPin">
                    <b-collapse id="collapse-success-pin">
                        <div class="row justify-content-center">
                            <div class="col-12 col-md-6 card">
                                <b-alert show variant="warning" class="bg-white border-0">
                                    <p class="text-dark text-center">ยืนยันข้อมูลสำเร็จ</p>
                                    <small class="d-block text-danger">* ท่านสามารถใช้ข้อมูลนี้ ล็อคอินเข้าระบบได้</small>
                                    <small class="d-block text-danger">* กรุณาบันทึกรหัส Pin หรือบันทึกภาพหน้าจอไว้</small>
                                </b-alert>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-3">
                            <div class="col-12">
                                <div class="form-group float-label active">
                                    <div class="input-group mb-3" style="border-radius: 25px; ">
                                        <input type="text" class="form-controls text-dark px-3 bg-white" style="border-radius: 25px; height:50px;" ref="inputPhoneNumber" @click="copyClipboard('inputPhoneNumber')" :value="inputPhoneNumber" readonly />
                                        <div class="input-group-append btn-copy px-2" style="border-radius: 25px; position: absolute; right:10px;margin-top:5px;">
                                            <button id="cbctel1" class="btn text-white" type="button" @click="copyClipboard('inputPhoneNumber')" style="color:#fff;">คัดลอก</button>
                                            <button id="cbctel2" class="btn text-success display-none" type="button" style="color:#fff;">คัดลอกแล้ว</button>
                                        </div>
                                    </div>
                                    <label class="form-control-label text-white" style="margin-top: -24px;margin-left: -15px; background: rgb(42 42 42 / 0%);">เบอร์โทร</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group float-label active">
                                    <div class="input-group mb-3" style="border-radius: 25px; ">
                                        <input type="text" class="form-controls text-dark px-3 bg-white" style="border-radius: 25px; height:50px;" ref="inputPincodeA" :value="inputPincode" @click="copyPin('inputPincodeA')" readonly />
                                        <div class="input-group-append btn-copy px-2" style="border-radius: 25px; position: absolute; right:10px;margin-top:5px;">
                                            <button class="btn text-white" type="button" @click="copyPin('inputPincodeA')" style="color:#fff;" id="cbc1">คัดลอก</button>
                                            <button class="btn text-success display-none" type="button" id="cbc2" style="color:#fff;">คัดลอกแล้ว</button>
                                        </div>
                                    </div>
                                    <label class="form-control-label text-white" style="margin-top: -24px;margin-left: -15px; background: rgb(42 42 42 / 0%);">Pin</label>
                                </div>
                            </div>
                        </div>
                    </b-collapse>
                </div>
                <div class="col-11" id="successPinBtn">
                    <div class="form-group mt-2">
                        <b-button class="btn btn-md btn-theme shadow mb-2 btn-block display-none text-white font-weight-100" size="md" id="success-pin"  @click="letItGo">เข้าสู่ระบบ</b-button>
                    </div>
                </div>

                <!-- pin -->
                <div class="col-12">
                    <b-collapse id="collapse-pin">
                        <div class="form-group">
                            <h6 class="text-white font-weight-100">กรุณายืนยัน PIN 4 หลักที่ท่านเคยลงทะเบียนไว้</h6>
                            <input type="tel" ref="inputPincode" :class="{'is-invalid' : formValidation('inputPincode')}" v-model="inputPincode" class="form-controls form-control-lg bg-white text-dark" placeholder="Pin" maxlength="4" style="border-radius: 25px;" required />
                            <div class="invalid-feedback">{{formValidation('inputPincode')}}</div>
                        </div>
                        <p id="verify"></p>
                    </b-collapse>
                </div>
                <div class="col-12">
                    <b-button class="btn btn-md mt-2 display-none btn-theme shadow btn-block text-white font-weight-100"  size="md" id="accepted-pin" variant="ocean" @click="acceptPin">ยืนยัน PIN</b-button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    asyncData: async function ({
        route,
        $axios
    }) {
        const data = await $axios.$get("/api/promote-image/");
        return {
            dataImg: data || [],
        };
    },
    data() {
        return {
            login: 1,
            title: "Login",
            redirect: "",
            username: "",
            password: "",
            line_id: this.$store.getters.getLineId,
            dataImg: [],
            formError: [],
            inputBirthday: null,
            inputPhoneNumber: null,
            inputPincode: "",
            statusOtp: false,
            coutDownOtp: 0,
            textContent: "",
            token: 0,
            displayname: "",
            lineredirect: "",
            pin: "",
            show: false,
            inputOtpNumber: "",
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

    computed: {
        ...mapGetters(["getThemeObject", "getSettingObject", "getLineId"]),
        getThemeObject() {
            return this.$store.getters.getThemeObject;
        },
    },
    layout: "login",
    auth: "guest",

    mounted: function () {
        if (this.$route.query.code) {
            this.accessToken();
        }
        if (this.$route.query.token) {
            this.token = this.$route.query.token;
        }
        if (this.$route.query.displayname) {
            this.displayname = this.$route.query.displayname;
        }
        if (this.username && this.password) this.submit();
    },
    methods: {
        formValidation: function (ref) {
            let error = this.formError.find((item) => item.ref == ref);
            return error ? error.message : "";
        },
        isFormValidation: function (ref) {
            let error = this.formError.find((item) => item.ref == ref);
            return error ? true : null;
        },
        removeValidation: function (ref) {
            this.formError = this.formError.filter((item) => item.ref != ref);
        },
        acceptResearch: async function () {
            if (!this.inputPhoneNumber) {
                this.formError.push({
                    step: 1,
                    ref: "inputPhoneNumber",
                    message: "กรุณากรอกเบอร์โทร",
                });
            } else if (this.inputPhoneNumber.length != 10) {
                this.formError.push({
                    step: 1,
                    ref: "inputPhoneNumber",
                    message: "กรุณากรอกเบอร์โทรให้ถูกต้อง",
                });
            } else if (!this.inputPhoneNumber.match(/^[0-9]+$/)) {
                this.formError.push({
                    step: 1,
                    ref: "inputPhoneNumber",
                    message: "กรุณากรอกเบอร์โทรให้ถูกต้อง",
                });
            } else {
                this.show = true;
                const {
                    data,
                    success
                } = await this.$axios.$post(
                    "/api/line/chk-phone", {
                        tel: this.inputPhoneNumber,
                    }
                );
                if (success) {
                    this.show = false;
                    this.getOtp();
                } else {
                    this.show = false;
                    this.getPin();
                }
            }
        },
        startTimer() {
            this.coutDownOtp = 120;
            var minutes, seconds;
            var downloadTimer = setInterval(() => {
                minutes = parseInt(this.coutDownOtp / 60, 10);
                seconds = parseInt(this.coutDownOtp % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                this.textContent = minutes + ":" + seconds;

                if (--this.coutDownOtp < 0) {
                    clearInterval(downloadTimer);
                }
            }, 1000);
        },
        coutDownPin: function () {
            this.coutDownPin = 60;
            var downloadTimer = setInterval(() => {
                this.coutDownPin -= 1;
                if (this.coutDownPin <= 0) {
                    clearInterval(downloadTimer);
                }
            }, 1000);
        },
        getPin: function () {
            this.$root.$emit("bv::toggle::collapse", "collapse-pin");
            document.getElementById("send-otp").style.display = "none";
            document.getElementById("accepted-pin").style.display = "block";
            document.getElementById("thisPhone").style.display = "none";
            document.getElementById("acceptOtp").style.display = "none";
            document.getElementById("acceptOtpBtn").style.display = "none";
            document.getElementById("settingpin").style.display = "none";
            document.getElementById("settingpinBtn").style.display = "none";
            document.getElementById("successPinBtn").style.display = "none";
            document.getElementById("successPin").style.display = "none";
            document.getElementById("tel1").disabled = "disabled";
        },
        acceptSettingPin: async function () {
            if (!this.inputPincode || this.inputPincode == "") {
                this.formError.push({
                    step: 1,
                    ref: "inputPincode",
                    message: "กรุณากรอกตั้ง PIN ",
                });
                return false;
            } else if (this.inputPincode.length < 4) {
                this.formError.push({
                    step: 1,
                    ref: "inputPincode",
                    message: "กรุณากรอกรัส PIN ให้ถูกต้อง",
                });
            } else {
                const loader = this.$loading.show({
                    "is-full-page": true
                });
                const research = await this.$axios.$post("/api/line/line-account", {
                    phoneNumber: this.inputPhoneNumber,
                    token: this.token,
                    pincode: this.inputPincode,
                    displayname: this.displayname,
                });
                if (research.success) {
                    loader.hide();
                    this.$root.$emit("bv::toggle::collapse", "collapse-setting-pin");
                    this.$root.$emit("bv::toggle::collapse", "collapse-success-pin");
                    document.getElementById("setting-pin").style.display = "none";

                    document.getElementById("successPinBtn").style.display = "block";
                    document.getElementById("successPin").style.display = "block";
                    document.getElementById("tel1").disabled = "disabled";
                    document.getElementById("tel1").disabled = "disabled";
                    document.getElementById("success-pin").style.display = "block";
                    document.getElementById("tel").style.display = "none";
                    document.getElementById("successTel").style.display = "none";
                    this.researchObject = research.data;
                    this.lineredirect = research.redirect;
                    this.pin = research.pincode;
                } else {
                    loader.hide();
                    return this.$toast.global.error({
                        message: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (400) / กรุณาติดต่อพนักงาน",
                    });
                }
            }
        },
        letItGo: async function () {
            const loader = this.$loading.show({
                "is-full-page": true
            });
            window.location = this.lineredirect;
        },
        getOtp_Again: async function () {
            this.startTimer();
            const { data, success } = await this.$axios.$post("/api/send-otp", {
                tel: this.inputPhoneNumber,
            });
            // console.log(data[0].error);
            if (data[0].status == "duplicate") {
                this.telerror = data[0].error;
                this.$toast.global.error({
                    message: data[0].error,
                });
                return false;
            } else if (success) {
                this.$toast.global.success({
                    message: "กรุณากรอก OTP ที่ได้รับให้ถูกต้อง",
                });
            } else {
                this.$toast.global.error({
                    message: data,
                });
            }
            this.statusOtp = true;
        },
        getOtp: async function () {
            const {
                data,
                success
            } = await this.$axios.$post("/api/send-otp", {
                tel: this.inputPhoneNumber,
            });
            if (success) {
            this.startTimer();
                this.$root.$emit("bv::toggle::collapse", "collapse-otp");
                document.getElementById("send-otp").style.display = "none";
                document.getElementById("thisPhone").style.display = "none";
                document.getElementById("accepted-otp").style.display = "block";
                document.getElementById("tel1").disabled = "disabled";
                this.$toast.global.success({ message: 'ส่ง OTP ไปแล้ว กรุณารอซักครู่' });
            } else {
                // this.$root.$emit("bv::toggle::collapse", "collapse-otp");
                // document.getElementById("send-otp").style.display = "none";
                // document.getElementById("accepted-otp").style.display = "block";
                this.$toast.global.error({
                    message: data[0].error
                });
                this.statusOtp = false;
                return false;
            }
            this.statusOtp = true;

        },
        acceptOtp: async function () {
            if (!this.inputOtpNumber || this.inputOtpNumber == "") {
                this.formError.push({
                    step: 1,
                    ref: "inputOtpNumber",
                    message: "กรุณากรอกรัส OTP",
                });
                return false;
            } else if (this.inputOtpNumber.length != 6) {
                this.formError.push({
                    step: 1,
                    ref: "inputOtpNumber",
                    message: "กรุณากรอกรัส OTP ให้ถูกต้อง",
                });
            } else {
                this.show = true;
                if (await this.checkOtpFn(this.inputPhoneNumber, this.inputOtpNumber)) {
                    this.show = false;
                    this.$root.$emit("bv::toggle::collapse", "collapse-setting-pin");
                    this.$root.$emit("bv::toggle::collapse", "collapse-otp");
                    document.getElementById("setting-pin").style.display = "block";
                    document.getElementById("accepted-otp").style.display = "none";
                } else {
                    this.show = false;
                    this.$toast.global.error({
                        message: "กรุณากรอก OTP ให้ถูกต้อง",
                    });
                }
            }
        },
        checkOtpFn: async function (paramTel, paramOtp) {
            let result = await this.$axios
                .request({
                    method: "POST",
                    url: "/api/check-otp",
                    data: {
                        tel: paramTel,
                        otp: paramOtp,
                    },
                })
                .then((response) => response.data)
                .then((response) => {
                    if (response.success) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch((error) => {
                    return false;
                });
            return await result;
        },
        goRedirect: async function () {
            const loader = this.$loading.show({
                "is-full-page": true
            });
            window.location = this.lineredirect;
            return this.$toast.global.success({
                message: "ยืนยันตนสำเร็จ ท่านสามารถทำรายการได้ปกติแล้ว",
            });
        },
        acceptPin: async function () {
            if (!this.inputPincode || this.inputPincode == "") {
                this.formError.push({
                    step: 1,
                    ref: "inputPincode",
                    message: "กรุณากรอกรัส PIN",
                });
                return false;
            } else if (this.inputPincode.length < 4) {
                this.formError.push({
                    step: 1,
                    ref: "inputPincode",
                    message: "กรุณากรอกรัส PIN ให้ถูกต้อง",
                });
            } else {
                const loader = this.$loading.show({
                    "is-full-page": true
                });
                const chkpin = await this.$axios.$post("/api/line/chk-merge-line", {
                    tel: this.inputPhoneNumber,
                    pin: this.inputPincode,
                });
                if (!chkpin.success) {
                    loader.hide();
                    document.getElementById("verify").innerHTML =
                        "<span style='color: #dc3545;'><i class='fa fa-close' style='font-size:1rem;margin:0px auto;color: #dc3545;'></i>" +
                        chkpin.message +
                        "</span>";
                } else {
                    document.getElementById("verify").innerHTML =
                        "<span class='text-success'><i class='fa fa-close' style='font-size:1rem;margin:0px auto;'></i> " +
                        chkpin.message +
                        "</span>";
                    const research = await this.$axios.$post("/api/line/merge-line", {
                        tel: this.inputPhoneNumber,
                        token: this.token,
                        displayname: this.displayname,
                    });
                    if (research.success) {
                        loader.hide();
                        this.$root.$emit("bv::toggle::collapse", "collapse-pin");
                        this.$root.$emit("bv::toggle::collapse", "collapse-success-pin");
                        document.getElementById("setting-pin").style.display = "none";
                        document.getElementById("success-pin").style.display = "block";
                        document.getElementById("tel").style.display = "none";
                        document.getElementById("accepted-pin").style.display = "none";
                        document.getElementById("successTel").style.display = "none";
                        document.getElementById("tel1").disabled = "disabled";
                        document.getElementById("successPinBtn").style.display = "block";
                        document.getElementById("successPin").style.display = "block";
                        this.lineredirect = research.redirect;
                        this.pin = research.pincode;
                    } else {
                        loader.hide();
                        return this.$toast.global.error({
                            message: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (400) / กรุณาติดต่อพนักงาน",
                        });
                    }
                }
            }
        },
        copyPin: function (target) {
            document.getElementById("cbc1").style.display = "none";
            document.getElementById("cbc2").style.display = "block";
            setTimeout(function () {
                document.getElementById("cbc2").style.display = "none";
                document.getElementById("cbc1").style.display = "block";
            }, 2400);
            this.$refs[target].select();
            document.execCommand("copy");
            this.$toast.global.success({
                message: "คัดลอก PIN แล้ว",
            });
        },
        copyClipboard: function (target) {
            document.getElementById("cbctel1").style.display = "none";
            document.getElementById("cbctel2").style.display = "block";
            setTimeout(function () {
                document.getElementById("cbctel2").style.display = "none";
                document.getElementById("cbctel1").style.display = "block";
            }, 2400);
            this.$refs[target].select();
            document.execCommand("copy");
            this.$toast.global.success({
                message: "คัดลอกเบอร์โทรแล้ว",
            });
        },
    },
};
</script>

<style>

#cbctel2 {
    display: none;
}

#cbc2 {
    display: none;
}

#tel2 {
    display: none;
}

div>>>span.text-dark {
    color: #000000 !important;
}

div>>>small.text-truncate {
    color: #000000 !important;
}

div>>>header.text-center {
    color: #000000 !important;
}

select.form-controls,
button.form-controls,
input.form-controls {
    color: #555;
    border: 1px solid #555;
    background-color: #000;
    width: 100%;
    border-radius: 5px;
}

input.vue-pincode-input {
    color: white;
}

#accepted-otp {
    display: none;
}

.btn-ocean {
    width: 100%;
     background: linear-gradient(0deg,#410c0c 0,#991515);
    filter: drop-shadow(3px 3px 1px black);
}

#page-2 {
    display: none;
}

#successTel {
    display: block;
}

#btnfalse {
    display: none;
}

.small,
small {
    font-size: 80%;
    font-weight: 400;
}

.display-none {
    display: none;
}

.line {
    width: 100%;
    margin: 20px 0;
    height: 1px;
    background: #292929;
    background: -webkit-gradient(linear,
            -1 0,
            100% 0,
            from(#292929),
            to(#292929),
            color-stop(50%, #d7d4d4));
}

.nav-link.active {
    background: rgba(0, 0, 0, 0);
    border-bottom: solid 0px #555;
    /* border-bottom-width: 10px; */
}

.w-80 {
    width: 80%;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: 0px;
    margin-left: 0px;
}

.bg-gradaint {
    /* border-radius: 50%; */
    /* background: #259690; */
    background: linear-gradient(to top,#410c0c 0%, #991515 100%);
    filter: drop-shadow(1px 1px 1px white)
}

.btn-aff {
    filter: invert(1);
    width: 35px;
    -webkit-animation-duration: 4.4s;
    /* Safari 4.0 - 8.0 */
    -webkit-animation: fade-img 4.4s infinite;
    animation: fade-img 4.4s infinite;
    animation-duration: 4.4s;
}

@keyframes fade-img {
    0% {
        filter: invert(1);
    }

    90% {
        filter: invert(1);
    }

    100% {
        filter: invert(0);
    }
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: 0px;
    margin-left: 0px;
}

.modal.show .modal-dialog {
    transform: none;
    border-radius: 20px;
}

.modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
    background-color: #a74e4e;
}

.modal-header {
    background-color: #fff;
    color: #000;
    font-weight: 600;
    font-size: 24px;
    border-top-left-radius: calc(0.3rem - -15px);
    border-top-right-radius: calc(0.3rem - -15px);
}

.modal-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: #a74e4e;
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
    border-bottom-right-radius: calc(0.3rem - -15px);
    border-bottom-left-radius: calc(0.3rem - -15px);
}

input {
    background-color: #000;
}

.border-info {
    height: 250px;
}

.img-info {
    width: 80%;
    bottom: -18%;
    position: absolute;
}

.desktop {
    display: block;
}

.mobile {
    display: none;
}

.videos {
    filter: drop-shadow(0px 2px 5px #fff);
    width: 100%;
    max-width: 640px;
    height: auto;
    min-height: 420px;
}

.btn-regis {
    font-size: 20px;
    white-space: nowrap;
    font-weight: 500;
    border: solid 1px #ec1514;
    padding: 2% 4%;
    background-image: linear-gradient(#ccc, #fff, #ccc);
}

.btn-login {
    font-size: 20px;
    white-space: nowrap;
    font-weight: 500;
    border: solid 1px #ec1514;
    padding: 2% 7%;
    background-image: linear-gradient(#ccc, #fff, #ccc);
}

.carousel-center {
    margin-top: 30%;
}

.carousel-slide {
    margin-top: 0%;
    z-index: 0;
}

.center-slide {
    overflow: hidden;
    min-height: 100px;
    padding-top: 150px;
    background-image: url(https://i.imgur.com/eciYx3Q.jpg);
    background-size: cover;
}

.layer-top {
    top: 0;
    z-index: 8;
    position: absolute;
}

.tabregister {
    padding: 10px;
    background-image: url("https://i.imgur.com/g9rDiyX.png");
    background-position: top center;
    background-size: 90%;
    background-repeat: no-repeat;
    height: 210px;
}

.title-center {
    z-index: 8;
    margin-top: -200px;
}

@media only screen and (min-width: 1167px) {
    .tabdetail-1 {
        font-size: 16px;
        line-height: 1.4em;
        padding: 20px 40px;
        text-align: center;
    }
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) {
    .tabdetail-1 {
        font-size: 16px;
        line-height: 1.4em;
        padding: 20px 40px;
        text-align: center;
    }
}

@media only screen and (min-width: 961px) and (max-width: 1023px) {
    .couraseler {
        margin-top: -50px;
    }
}

@media only screen and (max-width: 640px) {
    .tabregister {
        padding: 10px;
        background-image: url("https://i.imgur.com/K8zAbvA.png");
        background-position: top center;
        background-size: 90%;
        background-repeat: no-repeat;
        height: 210px;
    }

    .center-slide {
        overflow: hidden;
        min-height: 100px;
        padding-top: 50px;
        background-image: url(https://i.imgur.com/eciYx3Q.jpg);
        background-size: cover;
    }

    .carousel-center {
        margin-top: -85%;
        z-index: 2;
    }

    .carousel-slide {
        margin-top: 0%;
        z-index: 0;
    }

    .tabdetail-1 {
        font-size: 0.9em;
        line-height: 1.4em;
        padding: 10px 0;
        text-align: left;
    }

    .videos {
        filter: drop-shadow(0px 2px 5px #fff);
        width: 100%;
        max-width: 640px;
        height: auto;
        min-height: 180px;
    }

    .desktop {
        display: none;
    }

    .mobile {
        display: block;
    }

    footer.mobile {
        z-index: 9;
    }

    .title-game {
        width: 32%;
        margin: 3px 0;
    }
}

@media only screen and (max-width: 480px) {
    .tabregister {
        padding: 10px;
        background-image: url(https://i.imgur.com/K8zAbvA.png);
        background-position: top center;
        background-size: 90%;
        background-repeat: no-repeat;
        height: 210px;
    }

    .tabdetail-1 {
        font-size: 12px;
        line-height: 1.4em;
        padding: 10px 0;
        text-align: left;
    }

    .center-slide {
        overflow: hidden;
        min-height: 100px;
        padding-top: -20px;
        background-image: url(https://i.imgur.com/eciYx3Q.jpg);
        background-size: cover;
    }

    .carousel-center {
        margin-top: 0%;
    }

    .carousel-slide {
        margin-top: 0%;
    }

    .btn-regis {
        font-size: 16px;
        white-space: nowrap;
        font-weight: 500;
        border: solid 1px #ec1514;
        padding: 10px;
        background-image: linear-gradient(#ccc, #fff, #ccc);
    }

    .btn-login {
        font-size: 16px;
        white-space: nowrap;
        font-weight: 500;
        border: solid 1px #ec1514;
        padding: 10px 20px;
        background-image: linear-gradient(#ccc, #fff, #ccc);
    }

    .videos {
        filter: drop-shadow(0px 2px 5px #fff);
        width: 100%;
        max-width: 640px;
        height: auto;
        min-height: 180px;
    }

    .img-info {
        width: 80%;
        bottom: 0;
        position: absolute;
    }

    .border-info {
        height: 150px;
    }

    .theme-dark .footer,
    .theme-dark .bg-background,
    .theme-dark .header.active {
        backdrop-filter: saturate(125%) blur(10px);
        background: rgba(0, 0, 0, 0);

        /* margin-top: 30px; */
        .header+div {
            padding-top: 54px;
        }
    }

    .couraseler {
        margin-top: 40px;
    }
}

.theme-dark .modal-content .form-control,
.theme-dark .text-dark,
.theme-dark .icon-slide .swiper-slide p,
.theme-dark .icon-slide .swiper-slide:hover p,
.theme-dark .icon-slide .swiper-slide:focus p,
.theme-dark .text-secondary {
    color: #e9ecef !important;
}

.size-29 {
    font-size: 29px;
}

.size-50 {
    color: #ccc;
    font-size: 50px;
}

@media (max-width: 991.98px) {
    .x-sexy-contact-us {
        padding: 0;
        background: none;
    }
}

.x-sexy-contact-us {
    z-index: 999;
    position: fixed;
    bottom: 50%;
    right: 0;
    padding: 8px;
    overflow: hidden;
    background: hsla(0, 0%, 100%, 0.2);
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
}

.x-ocean-contact-us {
    z-index: 999;
    position: fixed;
    bottom: 45%;
    right: 0;
    padding: 8px;
    overflow: hidden;
    background: hsla(0, 0%, 100%, 0.2);
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
}

.x-ocean-affiliate-us {
    z-index: 999;
    position: fixed;
    bottom: 50%;
    right: 0;
    padding: 8px;
    overflow: hidden;
    background: hsla(0, 0%, 100%, 0.2);
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
}

modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem 1rem;
    background-color: #fff;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
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

.icon-intab-ani {
    animation: animMove 4s linear infinite;
}

@keyframes animMove {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

.icon-intab-ani2 {
    animation: animMove2 4s linear infinite;
}

@keyframes animMove2 {
    10% {
        transform: translateY(0px);
    }

    60% {
        transform: translateY(-10px);
    }

    110% {
        transform: translateY(0px);
    }
}

.icon-intab-ani3 {
    animation: animMove3 4s linear infinite;
}

@keyframes animMove3 {
    20% {
        transform: translateY(0px);
    }

    70% {
        transform: translateY(-10px);
    }

    120% {
        transform: translateY(0px);
    }
}
</style>

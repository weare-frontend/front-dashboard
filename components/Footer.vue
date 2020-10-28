<template>
<div class="footer" v-if="$auth.loggedIn">
    <div class="no-gutters">
        <div class="col-auto mx-auto">
            <div class="row justify-content-center align-footer">
                <div class="col-2 px-0">
                    <nuxt-link :to="{ name : 'dashboard'}" class="btn btn-link-default">
                        <i class="fas fa-home text-template" style="margin:6px auto;margin:10px;"></i>
                        <br />
                        <span class=" text-template">หน้าแรก</span>
                    </nuxt-link>
                </div>
                <div class="col-2 px-0">
                    <nuxt-link :to="{ name : 'dashboard-profile'}" class="btn btn-link-default">
                        <i class="fas fa-user text-template" style="margin:6px auto;margin:10px;"></i>
                        <br />
                        <span class=" text-template">ข้อมูลส่วนตัว</span>
                    </nuxt-link>
                </div>
                <!-- <div class="col-3 px-0 px-sm-1 px-md-1 px-lg-1 ft" v-if="this.$auth.user.game.toLowerCase() == 'csroyale' ">
                    <nuxt-link :to="{ name : 'dashboard-luca'}" class="menu-btn-center btn btn-link-default module-border-wrap justify-content-center" style="width: 97px;height: 97px;margin: -30px auto 0 auto;">
                        <div class="module bg-white mt-1">
                            <img src="~/assets/icon/Game-revert.png" alt="" class="my-2 bg-template" style="width: 64%;margin-left: 10px;">
                            <p class="mt-2 text-template font-weight-100">เข้าสู่เกม</p>
                        </div>
                    </nuxt-link>
                </div> -->
                <div class="col-3 px-0 px-sm-1 px-md-1 px-lg-1 ft" style="margin-top: -10px; filter: drop-shadow(0px 0px 2px white);">
                    <a @click="$refs['modal-download'].show()" class="menu-btn-center btn btn-link-default module-border-wrap justify-content-center" style="width: 97px;height: 97px;margin: -30px auto 0 auto;">
                        <div class="module bg-white">
                            <img src="~/assets/icon/Game-revert.png" alt="" class="my-2 bg-template" style="width: 64%;margin-left: 10px;">
                            <p class="mt-2 text-template font-weight-100">เข้าสู่เกม</p>
                        </div>
                    </a>
                </div>
                <div class="col-2 px-1">
                    <a class="btn btn-link-default text-template" target="_blank" :href="getSettingObject.link_front">
                        <i class="fas fa-globe text-template" style="margin:6px auto;margin:10px;"></i>
                        <br />
                        <span class=" text-template">เข้าสู่เว็บไซต์</span>
                    </a>
                </div>
                <div class="col-2">
                    <a target="_blank" :href="'http://line.me/ti/p/'+ $auth.user.line_agent" class="btn btn-link-default">
                        <i class="fab fa-line text-template" style="margin:6px auto;margin:10px;"></i>
                        <br />
                        <span class=" text-template">แจ้งปัญหา</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <b-modal id="modal-download" ref="modal-download" centered content-class="rounded" header-class="shadow" body-class hide-footer>
        <template v-slot:modal-header="{ close }">
            <i class="f7-icons multiply-circle2 text-white" @click="$bvModal.hide('modal-download')">multiply_circle</i>
            <p class="text-center w-100 text-dark" style="font-weight:100; font-size:18px;">ทางเข้าสู่เกม</p>
        </template>

        <div class="row justify-content-center">
            <div class="col-12 mb-3">
                <a v-if="lunchGameUrlWeb || lunchGameUrlMoblie" :href="$device.isDesktop ? lunchGameUrlWeb : lunchGameUrlMoblie">
                    <div class="bg-background card">
                        <div class="bg-modal card-body text-center">
                            <img src="~/assets/img/casino.png" style="margin:auto; padding:5px;width:75px;" />
                            <h5 class="text-white font-weight-100">เข้าสู่เว็บไซต์เดิมพัน</h5>
                        </div>
                    </div>
                </a>
            </div>
            <!-- <div class="col-12 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'slotxo' && $device.isAndroid">
          <div class="card-body text-center">
                <span class="material-icons" style="font-size: 62px;">android</span>
                <h6 class="text-template font-weight-100" style="font-size: 12px;">สำหรับระบบ Android</h6>
                <a target="_blank" :href="getSettingObject.link_download" class="btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100">ดาวน์โหลด</a>
          </div>
        </div>-->
            <!-- <div class="col-12 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'slotxo' && !$device.isAndroid"> -->
            <div class="col-12 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'slotxo'">
                <form target="_blank" ref="formSlotxo" action="https://slotxo.com/SignIn" class="form-playgame" method="post">
                    <input type="hidden" name="Username" v-model="this.$auth.user.account_api" value />
                    <input type="hidden" name="Password" v-model="this.$auth.user.password" value />
                    <a @click="submitSlotxo">
                        <div class="bg-background card">
                            <div class="bg-modal card-body text-center">
                                <img src="~/assets/img/casino.png" style="margin:auto; padding:5px;width:75px;" />
                                <h5 class="text-white text-body">เข้าสู่เว็บไซต์เดิมพัน</h5>
                            </div>
                        </div>
                    </a>
                </form>
            </div>
            <div class="col-12 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'apijoker' ">
                <form target="_blank" ref="formJoker" action="http://www.joker1919.net/SignIn" class="form-playgame" method="post">
                    <input type="hidden" name="Username" v-model="this.$auth.user.account_api" value />
                    <input type="hidden" name="Password" v-model="this.$auth.user.password" value />
                    <a @click="submitJoker">
                        <div class="bg-background card">
                            <div class="bg-modal card-body text-center">
                                <img src="~/assets/img/casino.png" style="margin:auto; padding:5px;width:75px;" />
                                <h5 class="text-white text-body">เข้าสู่เว็บไซต์เดิมพัน</h5>
                            </div>
                        </div>
                    </a>
                </form>
            </div>
            <div class="col-md-6 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'pussy888'">
                <div class="bg-modal card-body text-center">
                    <span class="material-icons text-white" style="font-size: 62px;">android</span>
                    <h6 class="text-white font-weight-100" style="font-size: 12px;">สำหรับระบบ Android</h6>
                    <a target="_blank" :href="getSettingObject.link_download" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100">ดาวน์โหลด</a>
                </div>
            </div>
            <div class="col-md-6 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'pussy888'">
                <div class="bg-modal card-body text-center">
                    <i class="f7-icons text-white" style="font-size: 67px;">logo_apple</i>
                    <h6 class="text-white font-weight-100" style="font-size: 12px;">สำหรับระบบ IOS</h6>
                    <a target="_blank" :href="getSettingObject.link_download_ios" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100">ดาวน์โหลด</a>
                </div>
            </div>
            <div class="col-md-6 mb-3" v-if="this.$auth.user.game.toLowerCase() == '918kiss'">
                <div class="bg-modal card-body text-center">
                    <span class="material-icons text-white" style="font-size: 62px;">android</span>
                    <h6 class="text-white font-weight-100" style="font-size: 12px;">สำหรับระบบ Android</h6>
                    <a target="_blank" :href="getSettingObject.link_download" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100">ดาวน์โหลด</a>
                </div>
            </div>
            <div class="col-md-6 mb-3" v-if="this.$auth.user.game.toLowerCase() == '918kiss'">
                <div class="bg-modal card-body text-center">
                    <i class="f7-icons text-white" style="font-size: 67px;">logo_apple</i>
                    <h6 class="text-white font-weight-100" style="font-size: 12px;">สำหรับระบบ IOS</h6>
                    <a target="_blank" :href="getSettingObject.link_download_ios" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100">ดาวน์โหลด</a>
                </div>
            </div>
            <div class="col-md-6 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'lavagame'">
                <div class="bg-modal card-body text-center">
                    <span class="material-icons text-white" style="font-size: 62px;">android</span>
                    <h6 class="font-weight-100 text-white" style="font-size: 12px;">สำหรับระบบ Android</h6>
                    <a target="_blank" :href="getSettingObject.link_download" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100" style="border-radius: 10px;">ดาวน์โหลด</a>
                </div>
            </div>
            <div class="col-md-6 mb-3" v-if="this.$auth.user.game.toLowerCase() == 'lavagame'">
                <div class="bg-modal card-body text-center">
                    <i class="f7-icons text-white" style="font-size: 67px;">logo_apple</i>
                    <h6 class="font-weight-100 text-white" style="font-size: 12px;">สำหรับระบบ IOS</h6>
                    <a target="_blank" :href="getSettingObject.link_download_ios" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100" style="border-radius: 10px;">ดาวน์โหลด</a>
                </div>
            </div>
            <div class="col-6" v-if="this.$auth.user.game.toLowerCase()!= 'csroyale' & 'pgslot'">
                <div class="bg-transparent card border">
                    <div class="bg-modal card-body text-center">
                        <span class="material-icons text-white" style="font-size: 62px;">android</span>
                        <h6 class="text-white font-weight-100" style="font-size: 12px;">สำหรับระบบ Android</h6>
                        <a target="_blank" :href="getSettingObject.link_download" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100">ดาวน์โหลด</a>
                    </div>
                </div>
            </div>
            <div class="col-6" v-if="this.$auth.user.game.toLowerCase()!= 'csroyale' & 'lavagame' & 'pgslot'">
                <div class="bg-transparent card border">
                    <div class="bg-modal card-body text-center">
                        <!-- <span class="material-icons" > stay_current_portrait </span> -->
                        <i class="f7-icons text-white" style="font-size: 67px;">logo_apple</i>
                        <h6 class="text-white font-weight-100" style="font-size: 12px;">สำหรับระบบ ios</h6>
                        <a target="_blank" :href="getSettingObject.link_download_ios" class="bg-button-cc btn btn-md btn-secondary btn-rounded btn-block shadow small font-weight-100">ดาวน์โหลด</a>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</div>

<!-- footer ends-->
</template>

<script>
export default {
    data() {
        return {
            activityButton: false,
            lunchGameUrlWeb: "",
            lunchGameUrlMoblie: "",
            web: 0,
            downloadApp: 0,
            downloadAndriod: 0,
            downloadIos: 0,
            checkUserGame: 0,
            gameData: "",
            gameSelect: null,
            gameName: "",
            playerGameDataArray: null,
        };
    },
    computed: {
        getSettingObject: function () {
            return this.$store.getters.getSettingObject;
        },
        getPromotionObjects: function () {
            return this.$store.getters.getPromotionObjects;
        },
    },
    async mounted() {
        //*********** lunchGame All Start***********
        switch (this.$auth.user.game.toLowerCase()) {
            case "csroyale":
                const lunchCroyale = await this.$axios.$get("/api/open-game");
                this.lunchGameUrlWeb = lunchCroyale.data.url;
                this.lunchGameUrlMoblie = lunchCroyale.data.url;
                break;
            case "ocean99":
                // this.lunchGameUrlMoblie = !this.$device.isDesktop ? this.$auth.user.links.native : null;
                // this.lunchGameUrlWeb = this.$auth.user.links.mobile
                break;
            case "epicwin":
                const lunchEpicwin = await this.$axios.$get("/api/lunch-game");
                this.lunchGameUrlWeb = lunchEpicwin.urlGame;
                this.lunchGameUrlMoblie = lunchEpicwin.urlGame;
                break;
            case "live22":
                const lunchLive22 = await this.$axios.$get("/api/lunch-game");
                this.lunchGameUrlWeb = lunchLive22.urlGame;
                this.lunchGameUrlMoblie = lunchLive22.urlGame;
                break;
            case "pussy888":
                // this.lunchGameUrlMoblie =  !this.$device.isDesktop ? "pussy888://pussy888.com/?user=" + this.$auth.user.account_api + "&password=" + this.$auth.user.password : null;
                break;
            case "918kiss":
                // this.lunchGameUrlMoblie =  this.$device.isIos ? "LobbyKiss64://account=" + this.$auth.user.account_api + "&password=" + this.$auth.user.password : null;
                // this.lunchGameUrlMoblie =  this.$device.isAndroid ? "lobbykissandroid://lobbykissandroid?account=" + this.$auth.user.account_api + "&password=" + this.$auth.user.password : this.lunchGameUrlMoblie;
                // this.lunchGameUrlMoblie =  !this.$device.isDesktop ? this.lunchGameUrlMoblie : null;
                break;
            case "sagame":
                const lunchSagame = await this.$axios.$get("/api/url-sagame");
                this.lunchGameUrlWeb = lunchSagame.urlGame;
                this.lunchGameUrlMoblie = this.$device.isDesktop ?
                    null :
                    lunchSagame.urlGameMobile;
                break;
                // case "csroyale":
                //   const lunchCroyale = await this.$axios.$get("/api/open-game");
                //   this.lunchGameUrlWeb = lunchCroyale.data.url;
                //   this.lunchGameUrlMoblie = lunchCroyale.data.url;
                //   break;
            case "lavagame":
                const lunchLavagame = await this.$axios.$get("/api/open-game");
                this.lunchGameUrlWeb = lunchLavagame.data.url;
                this.lunchGameUrlMoblie = lunchLavagame.data.url;
                break;
            case "pgslot":
                const lunchPgslot = await this.$axios.$get("/api/open-game");
                this.lunchGameUrlWeb = lunchPgslot.data.url;
                this.lunchGameUrlMoblie = lunchPgslot.data.url;
                break;
            default:
                break;
        }
        //*********** lunchGame All End***********
    },
    methods: {
        submitSlotxo: function () {
            this.$refs.formSlotxo.submit();
        },
        submitJoker: function () {
            this.$refs.formJoker.submit();
        },
    },
};
</script>

<style>
.module-border-wrap {
    /* max-width: 250px; */
    /* padding: 1rem; */
    position: relative;
    /* padding: 3px; */
    border-radius: 50%;
    /* -webkit-animation-duration: 1.4s; */
    /* Safari 4.0 - 8.0 */
    /* -webkit-animation: go-game 1.4s infinite;
  animation: go-game 1.4s infinite;
  animation-duration: 1.4s; */
}

.module {
    /* background: rgba(0, 0, 0, 0.5); */
    color: white;
    border-radius: 50%;
    height: 73px;
    width: 73px;
    margin: auto;
    /* padding: 2rem; */
}

.footer .col-auto .row .col-auto a span {
    color: #000;
    font-weight: 100;
}

/* .footer .col-auto .row .col-2 a span {
  color: #000;
  font-weight: 100;
} */

.footer .col-auto .row .col-auto a {
    color: #000;
    font-weight: 100;
}

.menu-btn-center {
    /* border: solid 1px #222; */
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-top: -25px;
    background-color: #272727;
}

.footer .col-auto .row .col-auto a {
    /* margin: 0 6px; */
    padding-top: 4px;
    line-height: 0.3em;
}

i.f7-icons {
    color: #000;
}

.modal-content .text-origin {
    color: #000;
}

.black-theme.theme-dark .footer i.fa,
.black-theme.theme-dark .footer i.fas,
.black-theme.theme-dark .footer i.fab {
    color: #000;
}

.black-dark .footer i.fa,
.black-dark .footer i.fas,
.black-dark .footer i.fab {
    color: #000;
}

.black-dark.theme-dark .col-auto a i.f7-icons.text-template.go-game {
    color: #fff;
}

.black-dark .col-auto a i.f7-icons.text-template.go-game {
    color: #fff;
}

.black-theme .col-5 i.f7-icons.text-template {
    color: #000;
}

.black-theme.theme-dark .col-5 i.f7-icons.text-template {
    color: #fff;
}

.go-game {
    border: 0;
    -webkit-animation-duration: 1.4s;
    /* Safari 4.0 - 8.0 */
    -webkit-animation: fade-game 1.4s infinite;
    animation: fade-game 1.4s infinite;
    animation-duration: 1.4s;
}

@keyframes fade-game {
    0% {
        margin-top: 0px;
        margin-bottom: 0px;
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(10deg);
    }

    30% {
        margin-top: -3px;
        margin-bottom: 3px;
        transform: rotate(-10deg);
    }

    100% {
        margin-top: 0px;
        margin-bottom: 0px;
        transform: rotate(0deg);
    }
}

@keyframes go-game {
    0% {
        background: linear-gradient(to right, red, purple);
    }

    25% {
        ackground: linear-gradient(to right, purple, red);
    }

    75% {
        background: linear-gradient(to right, purple, red);
    }

    100% {
        background: linear-gradient(to right, red, purple);
    }
}

@media (min-width:480px) {
    .align-footer {
        max-width: 600px;
        margin: 0 auto;
        width: 500px;
    }

    .ft {
        margin-top: -10px;
        filter: drop-shadow(0px 0px 2px white);
        text-align: center;
    }
}

@media (max-width:480px) {
    .align-footer {
        max-width: 600px;
        width: 100%;
        margin: auto;
    }

    .ft {
        margin-top: -10px;
        filter: drop-shadow(0px 0px 2px white);
    }
}
</style>


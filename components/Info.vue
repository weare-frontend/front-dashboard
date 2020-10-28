<template>
<div class="container">
    <div class="row">
        <b-modal id="modal-exchange" ref="modal-exchange" centered content-class="rounded" header-class="shadow" no-close-on-backdrop body-class="bg-infos" hide-footer>
            <template v-slot:modal-header="{ close }">
                <p class="text-center w-100 text-template">โอนเครดิตฟรีเข้าเกม</p>
                <i class="f7-icons text-danger" @click="$bvModal.hide('modal-exchange')" style="float:right;">multiply</i>
            </template>
            <template v-slot:modal-footer="{ cancel }"></template>
            <div class="row mt-3 justify-content-center" v-if="$route.name != 'dashboard-withdraw'">
                <div class="col-4 text-center mb-1">
                    <h6 class="m-0 w-100 text-template small mb-2">ยอดเงินในเกม</h6>
                    <img class="bg-template mb-2" src="~/assets/icon-svg/Coin.svg" style="width:83px; padding:1px; border-radius: 60%; " />
                    <h6 class="text-template mb-1">{{ $auth.user.money | toCurrencyString }}</h6>
                </div>
                <div class="col-4 text-center mb-1">
                    <h6 class="m-0 w-100 text-template small mb-2" style=" white-space: nowrap;">กระเป๋าเครดิตฟรี</h6>
                    <img class="bg-template mb-2" src="~/assets/icon-svg/Wallet2.svg" style="width:83px; padding:1px; border-radius: 60%; " />

                    <h5 class="text-template">{{ $auth.user.credit_bonus | toCurrencyString }}</h5>
                </div>
                <div class="position-absolute icon-exchange">
                    <span class="text-muted"></span>
                    <!-- <i class="f7-icons text-template">chevron_left_2</i> -->
                </div>
            </div>
            <b-modal id="modal-download" ref="modal-download" centered content-class="rounded" header-class="shadow" no-close-on-backdrop body-class hide-footer>
                <template v-slot:modal-header="{ close }">
                    <i class="f7-icons" style="position:absolute;right:10px;color:#ec1415;" @click="$bvModal.hide('modal-download')">multiply</i>
                    <p class="text-center w-100 text-template" style="font-weight:100; font-size:18px;">ยืนยันถอนเครดิต</p>
                </template>
                <div class="row justify-content-center" v-if="this.$auth.user.game.toLowerCase()!= 'csroyale'">
                    <div class="col-12 text-center">
                        <span class="material-icons fs-75 text-danger">error_outline</span>
                    </div>
                    <div class="col-12 text-center mb-2" style="margin-bottom: -5px;">
                        <label>เครดิตฟรีไม่สามารถนำไปเล่นเกมประเภทออนไลน์ได้</label>
                        <p>
                            <small class="text-danger" font-size="10px">หมายเหตุ : หากทำผิดเงื่อนไขเครดิตจะถูกตัดออกทั้งหมดทันที</small>
                        </p>
                    </div>
                    <div class="col-4">
                        <button type="button" @click="exchangeCredit" class="btn btn-block btn-outline-secondary bg-black text-white">ยืนยัน</button>
                    </div>
                    <div class="col-4">
                        <button type="button" class="btn btn-block btn-light text-body" @click="$bvModal.hide('modal-download')">ยกเลิก</button>
                    </div>
                </div>
                <div class="row justify-content-center" v-else>
                    <div class="col-12 text-center">
                        <span class="material-icons fs-75 text-danger">error_outline</span>
                    </div>
                    <div class="col-12 text-center mb-2" style="margin-bottom: -5px;">
                        <label>คุณต้องการแลกเครดิตฟรีใช่หรือไม่ ?</label>
                    </div>
                    <div class="col-4">
                        <button type="button" @click="exchangeCredit" class="btn btn-block btn-outline-secondary bg-black text-white">ยืนยัน</button>
                    </div>
                    <div class="col-4">
                        <button type="button" class="btn btn-block btn-light text-body" @click="$bvModal.hide('modal-download')">ยกเลิก</button>
                    </div>
                </div>
            </b-modal>

            <div class="row justify-content-center">
                <div class="col-9 mt-1">
                    <div class="form-group mx-3">
                        <!-- <label for="" class="text-template">จำนวนเงิน</label> -->
                        <input type="number" ref="exchange" placeholder="จำนวนเงิน" class="text-center text-template form-control bg-dark rounded" />
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    <button type="button" @click="$refs['modal-download'].show()" class="btn btn-block btn-outline-secondary bg-black text-white">ยืนยัน</button>
                </div>
                <div class="col-4">
                    <button type="button" class="btn btn-block btn-light text-body" @click="$bvModal.hide('modal-exchange')">ยกเลิก</button>
                </div>
            </div>
        </b-modal>
        <div class="container" v-if="getSettingObject.show_announce">
            <div class="marquees-text">
                <p v-html="getSettingObject.text_announce"></p>
            </div>
        </div>
        <div class="container">
            <div class="row">
            <div class="col-4 text-left" style="top:25px; position:absolute;">
                <nuxt-link :to="{name:'dashboard'}">
                    <i class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
                </nuxt-link>
            </div>
            </div>
            <div class="mt-0 mt-md-4 fetch-main" v-if="$route.name != 'dashboard-withdraw'">
                <!-- <div class="fetch justify-content-center">
            <button class="btn btn-default btn-rounded-54 shadow bg-template" @click="fetchUser">
              <i
                class="material-icons overlay bg-template text-template"
                :class="{'spin' : isSpin}"
                style="transform: rotate(45deg);"
              >autorenew</i>
            </button>
          </div> -->
                <div class="info bg-infos shadow mb-2 d-flex align-items-center" @click="modalExchange">
                    <div class="card-body" ref="formInfoUser">
                        <div class="row">
                            <div class="col-4 mb-2 text-left" style="margin-top: 10%;">
                                <span class="text-template">
                                    <small class="font-weight-100 size-12">ยอดเงินในเกม</small>

                                    <h3 class="text-template font-weight-100 size-22">{{ $auth.user.money+'฿' }}</h3>
                                </span>
                            </div>
                            <div class="col-4 text-center mb-1" style="margin:0 auto;">
                                <div class="right text-center text-template">
                                    <h5 class="text-left" style="font-weight: 100;white-space: nowrap; ">กระเป๋าเครดิตฟรี</h5>
                                    <h5 class="text-left text-template font-weight-100">{{ $auth.user.credit_bonus | toCurrencyString }}</h5>
                                </div>
                                <button class="btn border small material-icons text-template">โอนโบนัส</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center justify-content-center" style="margin-top: 100px;" v-else-if="$route.name == 'dashboard-withdraw'">

                <div class="row">
                    <div class="col-12">
                        <h5 class="text-center text-white mb-2 font-weight-100">ถอนเครดิต</h5>
                    </div>
                </div>
                <div class="row mt-3">
                    <h5 class="mt-2 col-6 text-dark">ยอดเงินในเกม</h5>
                    <span class="shadow-lg text-right bg-white rounded-lg p-3 col-6 text-dark size-20">{{ $auth.user.money | toCurrencyString }}</span>
                </div>
                <div class="row mt-3">
                    <button class="col-12 btn btn-block text-white bg-button-withdraw" @click="showModalWithdraw">
                        <i class="material-icons text-white">local_atm</i>
                        <span class="text-white">แจ้งถอนเครดิต</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>


.black-theme img.bg-template {
    border-radius: 50%;
    background: #000;
    background: -webkit-gradient(left top,
            right bottom,
            color-stop(0%, #000),
            color-stop(100%, #000));
    background: linear-gradient(135deg, #d7d4d4 0%, #d7d4d4 100%);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#000', endColorstr='#000', GradientType=1);
}

.icon-exchange {
    left: 47%;
    top: 30%;
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

.fetch-main {
    position: relative;
    width: 350px;
    /* height: 190px; */
    margin: auto;
}

.left {
    float: left;
    width: 30%;
}

.right {
    float: right;
    width: 60%;
    margin-top: -5px;
    margin-right: 17px;
    font-weight: lighter;
}

.size-12 {
    font-size: 12px;
}

.size-22 {
    font-size: 22px;
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

.theme-dark img.icon-template {
    padding: 0px;
    width: 100%;
    border-radius: 50%;
    filter: invert(0);
}

img.icon-template {
    border-radius: 50%;
    padding: 0px;
    width: 100%;
    filter: invert(1);
}

.gray-theme.theme-dark .bg-infos {
    background: #222;
}

.deeporange-theme.theme-dark .bg-infos {
    background: #222;
}

.lime-theme.theme-dark .bg-infos {
    background: #222;
}

.lightblue-theme.theme-dark .bg-infos {
    background: #222;
}

.deeppurple-theme.theme-dark .bg-infos {
    background: #222;
}

.purple-theme.theme-dark .bg-infos {
    background: #222;
}

.orange-theme.theme-dark .bg-infos {
    background: #222;
}

.pink-theme.theme-dark .bg-infos {
    background: #222;
}

.green-theme.theme-dark .bg-infos {
    background: #222;
}

.green-theme.theme-dark .bg-infos {
    background: #222;
}

.yellow-theme.theme-dark .bg-infos {
    background: #222;
}

.blue-theme.theme-dark .bg-infos {
    background: #222;
}

.red-theme.theme-dark .bg-infos {
    background: #222;
}

.teal-theme.theme-dark .bg-infos {
    background: #222;
}

.black-theme.theme-dark .bg-infos {
    background: #222;
}

.black-theme .bg-infos {
    background: #f2f2f2;
}
</style>

<script>
import {
    mapGetters
} from "vuex";
export default {
    data: () => ({
        isSpin: false,
        isMarquee: false,
    }),
    computed: {
        ...mapGetters(["getThemeObject", "getSettingObject"]),
    },
    props: {
        showModalWithdraw: Function,
    },
    methods: {},
};
</script>

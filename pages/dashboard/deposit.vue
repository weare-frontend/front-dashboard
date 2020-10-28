<template>
<div>
    <div class="container pt-3">
        <div class="col-4 text-left" style="top:25px; position:absolute;">
            <nuxt-link :to="{name:'dashboard'}">
                <i class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
            </nuxt-link>
        </div>
        <div class="row mb-5">
            <div class="col-12">
                <h5 class="text-center text-white font-weight-100 mt-2">ช่องทางการเติมเงิน</h5>
            </div>
            <div class="tab_container px-3 mb-5 mt-3">
                <input class="checkbox-tap" id="tab1" type="radio" name="tabs" checked />
                <label for="tab1" style="width:45%;margin:0 0 0 5%;" class="checkbox-tap text-center" v-if="promptPayArray.length>0 &&$auth.user.lname != 'Not verified'">โอนผ่านบัญชี</label>
                <label for="tab1" style="width:100%;" class="checkbox-tap text-center" v-if="promptPayArray.length==0 &&$auth.user.lname != 'Not verified'">โอนผ่านบัญชี</label>
                <input class="checkbox-tap" id="tab2" type="radio" name="tabs" checked v-if="promptPayArray.length>0 &&$auth.user.lname == 'Not verified'" />
                <label for="tab2" style="width:100%;" class="checkbox-tap text-center" v-if="promptPayArray.length>0 &&$auth.user.lname == 'Not verified'">โอนผ่านพร้อมเพย์</label>
                <input class="checkbox-tap" id="tab2" type="radio" name="tabs" />
                <label for="tab2" style="width:43%; margin:0 0 0 2%;" class="checkbox-tap text-center" v-if="promptPayArray.length>0 &&$auth.user.lname != 'Not verified'">โอนผ่านพร้อมเพย์</label>
                <section id="content1" class="bg-rgba tab-content" v-if="$auth.user.lname != 'Not verified'">
                    <div class="row">
                        <div class="col-md-12 col-xs-12 text-center" v-if="promptPayArray.length > 0 && bankArray.length == 0">
                            <div class="card shadow border-0 my-3 text-center bg-template">
                                <div class="card-body">
                                    <div class="avatar avatar-60 no-shadow border-0 bg-white" style="border-radius: 50%;">

                                        <i class="material-icons vm md-36 text-template">report</i>
                                    </div>
                                    <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการบัญชีธนาคาร</h4>
                                    <p class="text-secondary text-mute small">กรุณาติดต่อพนักงาน</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row text-center justify-content-center" v-if="bankArray.length">
                        <div class="col-12 col-md-12">
                        <h6 class="subtitle" style="margin-top: 15px; margin-bottom: 5px;">
                            <u style="color: #000;">กรุณาใช้บัญชีที่ท่านสมัครโอนมาเท่านั้น</u>
                            <small class="text-center d-block text-danger">* ระบบจะเติมเครดิตเกมอัตโนมัติ ภายในเวลา 1-2 นาที</small>
                        </h6>
                        </div>
                        <div class="list-group list-group-flush" v-if="bankArray.length" style="border-radius: 10px;border: solid 1px #fff;background: rgba(0,0,0,0.2);">
                            <a class="list-group-item border-top text-dark click-active" style="border-radius: 10px;background: rgba(0,0,0,0);" @click="copyBank(item.bank_account)" v-for="(item, index) in bankArray" :key="index">
                                <div class="row align-items-center">
                                    <div class="col-2 align-self-center">
                                        <img class="avatar-50 rounded" :src="require('~/assets/img/thaibanks/'+ item.shortname +'.png')" alt />
                                    </div>
                                    <div class="col-7 text-left" style="line-height: .8em; font-weight:100;">
                                        <div class="m-0 small text-dark text-right font-bank">เลขบัญชี :</div>
                                        <div class="text-left text-template font-bank2">{{item.bank_account}}</div>
                                        <div class="m-0 small text-dark text-right font-bank">ชื่อบัญชี :</div>
                                        <div class="text-left text-template font-bank2">{{ item.bank_fullname }}</div>
                                        <div class="m-0 small text-dark text-right font-bank">ธนาคาร :</div>
                                        <div class="text-left text-template font-bank2">{{ item.name }}</div>
                                    </div>
                                    <div class="col-3 px-0 pr-2">
                                        <p class="bg-copy-bank" style="line-height: .8em; white-space: nowrap;padding:6px;border:solid 1px #fff;border-radius:6px;">
                                            คัดลอก
                                            <br />
                                            <small>เลขบัญชี</small>
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="card shadow border-0 my-3 text-center" v-if="!bankArray.length">
                            <div class="card-body">
                                <div class="avatar avatar-60 no-shadow border-0">
                                    <div class="overlay bg-template"></div>
                                    <i class="material-icons vm md-36 text-template">report</i>
                                </div>
                                <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการบัญชีธนาคาร</h4>
                                <p class="text-secondary text-mute small">กรุณาติดต่อพนักงาน</p>
                            </div>
                        </div>
                        <!-- dragon Social wallet -->
                        <div class="col-md-12 col-xs-12 mb-3" v-if="drgxObject && drgxObject.status == '1'">
                            <div class="card shadow border-0 text-center click-active" v-b-toggle.dragon>
                                <div class="card-body">
                                    <div class="avatar avatar-60 no-shadow border-0">
                                        <div class="overlay bg-template"></div>
                                        <i class="material-icons vm md-36 text-template">account_balance_wallet</i>
                                    </div>
                                    <h4 class="mt-3 mb-0 font-weight-normal text-dark">Dragon Social Wallet (DGC-THB)</h4>
                                    <p class="text-secondary text-mute small">ระบบจะเติมเครดิตเข้ากระเป๋าหลักอัตโนมัติ</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section id="content2" class="tab-content bg-rgba">
                    <div class="row justify-content-center">
                        <div class="col-lg-12 col-md-6 px-3">
                            <!-- toggle.dragon -->
                            <b-collapse id="dragon" accordion="my-bank" role="tabpanel" v-if="drgxObject && drgxObject.status == '1'">
                                <h6 class="my-2 subtitle">Dragon Social Wallet</h6>
                                <div class="alert alert-warning" role="alert">
                                    <small class="d-block">
                                        <b>คำเตือน</b> : QR Code สามารถใช้ได้เพียงครั้งเดียวเท่านั้น !! ไม่สามารถใช้ซ้ำได้ กรณีหากลูกค้าใช้ QR Code ซ้ำ ทางทีมงานจะไม่คืนเงินทุกกรณี ขอบคุณค่ะ
                                    </small>
                                    <small class="d-block">
                                        <b>วิธีการใช้งาน</b> :
                                        <a href="https://expgaming.com/dragon-coin/" target="_blank">คลิกที่นี่ Dragon Social Wallet</a>
                                    </small>
                                </div>
                                <div class="row animated fadeIn" v-show="!invoiceTopupDrgxShow" ref="formTopupDrgx">
                                    <div class="col-12 col-md-12 text-center">
                                        <!-- <img class="m-auto" style="width : 300px" src="~/assets/img/drgx.png" alt /> -->
                                    </div>
                                    <div class="col-12 col-md-12">
                                        <div class="form-group float-label active">
                                            <input type="tel" class="form-controls text-white" readonly :value="$auth.user.tel" />
                                            <label class="form-control-label">เบอร์โทรมือถือ</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-12">
                                        <div class="form-group float-label active">
                                            <input type="number" ref="topupDrgxAmount" class="form-controls text-white" placeholder="จำนวนเงิน" />
                                            <label class="form-control-label">จำนวนเงิน</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-12">
                                        <a class="btn btn-md btn-default text-white btn-block shadow mb-2" @click="acceptTopupDrgx">
                                            <span>เติมเงิน</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="row animated fadeIn" v-show="invoiceTopupDrgxShow">
                                    <div class="col-12 col-md-12">
                                        <div class="alert alert-success" role="alert">
                                            <p>
                                                ID :
                                                <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.id : ''}}</span>
                                            </p>
                                            <p>
                                                ORDER ID :
                                                <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.order : ''}}</span>
                                            </p>
                                            <p>
                                                SERVICE :
                                                <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.service.name : ''}}</span>
                                            </p>
                                            <p>
                                                จำนวนเงิน :
                                                <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.amount : ''}} บาท</span>
                                            </p>
                                            <a class="btn btn-md btn-default text-white btn-block shadow mb-2" :href="invoiceTopupDrgx ? invoiceTopupDrgx.value : ''" target="_blank">เข้าแอพพลิเคชั่น</a>
                                            <a class="btn btn-md btn-dark text-white btn-block shadow mb-2" @click="invoiceTopupDrgxShow = !invoiceTopupDrgxShow">กลับ</a>
                                        </div>
                                    </div>
                                </div>
                            </b-collapse>
                            <!-- <div class="alert note-info justify-content-center ml-5 pl-4 mt-2" role="alert" ref="formContainer">
                                    <div class="d-block small text-dark text-left"><b style="font-size:22px;">&bull;</b> กรุณาแคปภาพ QRCode เพื่อใช้โอนเงิน</div>
                                    <div class="d-block small text-dark text-left"><b style="font-size:22px;">&bull;</b> ท่านมีเวลา 5 นาทีในการโอนเงิน</div>
                                    <div class="d-block small text-dark text-left"><b style="font-size:22px;">&bull;</b> เงินจะเข้าสู่ระบบอัตโนมัติภายใน 1-2 นาที</div>
                                </div> -->
                            <div class="border bg-white" style="margin:15px 0;border-radius: 10px;">
                                <!-- <div class="text-right">
                                        <h6 class="text-template mb-1" @click="fetchUser">{{ $auth.user.money | toCurrencyString }} THB
                                            <i class="material-icons overlay bg-template text-template" :class="{'spin' : isSpin}" style="transform: rotate(45deg); cursor : pointer;">autorenew</i>
                                        </h6>
                                    </div> -->
                                <a class="text-dark py-3" v-for="(item, index) in promptPayArray" :key="index">
                                    <div class="row justify-content-center pb-lg-4">
                                        <div class="col-md-12 col-sm-12">

                                            <div class="row justify-content-center">
                                                <div class="col-lg-12 text-center">
                                                    <h6 class="text-template text-center pt-3" style="font-weight: 100;white-space: nowrap;">
                                                        ชื่อบัญชี:
                                                        <span class="text-template text-center">{{ item.bank_fullname }}</span>
                                                    </h6>
                                                </div>
                                                <div v-if="item.qrcode_log.length!=0">
                                                    <div class="col-lg-12">
                                                        <h6 class="text-template text-center" style="font-weight: 100;white-space: nowrap;">
                                                            พร้อมเพย์: <span class="text-center text-template">{{item.prompt_pay}}</span>
                                                        </h6>
                                                    </div>
                                                    <div class="col-lg-12 text-center">
                                                        <button class="btn btn-md text-white mt-1 btn-clipboard" style="border:solid 1px #ccc; margin:6px 5px; font-size:16px; border-radius: 15px;" type="button" @click="copyPrompt(item.prompt_pay)">คัดลอก พร้อมเพย์</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- step กรอกเงิน -->
                                        <!-- <div v-if="item.qrcode_log.length==0" class="col-md-1"></div> -->
                                        <div v-if="item.qrcode_log.length==0" class="col-12 col-md-4 col-sm-12" style="margin-top: 5px;margin-bottom: 0px;">
                                        <div class="col-md-12">
                                            <small class="text-template">เลือกจำนวนเงิน</small>
                                            <p class="w-100 d-flex">
                                                <span class="btn-money"><button @click="showBox(null,item.id,100)" class="btn w-100 text-template bg-white">100</button></span>
                                                <span class="btn-money"><button @click="showBox(null,item.id,300)" class="btn w-100 text-template bg-white">300</button></span>
                                                <span class="btn-money"><button @click="showBox(null,item.id,500)" class="btn w-100 text-template bg-white">500</button></span>
                                            </p>
                                            <p class="w-100 d-flex" style="margin-top:-10px;">
                                                <span class="btn-money"><button @click="showBox(null,item.id,1000)" class="btn w-100 text-template bg-white">1,000</button></span>
                                                <span class="btn-money"><button @click="showBox(null,item.id,5000)" class="btn w-100 text-template bg-white">5,000</button></span>
                                                <span class="btn-money"><button @click="showBox(null,item.id,10000)" class="btn w-100 text-template bg-white">10,000</button></span>
                                            </p>
                                            <small class="text-template">ระบุจำนวน</small>
                                            <b-form-input size="lg" :ref="'amount'+item.id" :id="'amount'+item.id" type="number" placeholder="0" class="form-controls text-right text-template mb-2" style="display:block;background-color: #fff;"></b-form-input>
                                        </div>
                                            <b-button class="btn-topup"  @click="showBox('amount'+item.id,item.id)" variant="secondary">
                                                <i class="material-icons vm md-36" style="color:#F44336;">check_circle</i>
                                                เติมเงิน
                                            </b-button>
                                        </div>
                                        <div class="col-lg-3 col-11 bg-prompay" v-else>
                                            <h4 class="text-dark text-center my-2 font-weight-100">ยอดโอน {{item.qrcode_log.money}}</h4>
                                        </div>
                                    </div>
                                    <!-- step แสดง qr code -->
                                    <div class="row justify-content-center">
                                        <div id="app" v-if="item.qrcode_log.length!=0" class="col-lg-4 col-md-6 text-center">
                                            <b-card no-body class="text-center">
                                                <div class="bg-white">

                                                    <b-img :src="require('@/assets/img/thaibanks/pp.png')" style="max-width: 230px;width: 100%; margin-bottom: -10px;"></b-img>
                                                    <promptpay-qr :id="item.prompt_pay" :amount=" parseFloat(item.qrcode_log.money)"></promptpay-qr>
                                                </div>
                                            </b-card>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div v-if="item.qrcode_log.length!=0" class="col-12">
                                            <h6 class="text-template text-center">เหลือเวลาโอนเงิน</h6>
                                            <h4 class="text-template text-center">
                                                <countdown :time="genTime(item.qrcode_log.create_at,item.qrcode_log.create_end)" @end="getPromptpay()">
                                                    <template slot-scope="props">{{ setDigit(props.minutes) }} : {{ setDigit(props.seconds) }} น.</template>
                                                </countdown>
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div v-if="item.qrcode_log.length!=0" class="col-12 text-center" style="margin:auto">
                                            <b-button @click="showMsgBox(item.qrcode_log.player_qrcode_log)" class="text-center" block variant="danger" style="border-bottom-radius: 5px; border-top-radius: 0px;">
                                                <i class="text-white material-icons vm md-36 text-template">cancel</i>
                                                ยกเลิก
                                            </b-button>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="container bg-white rounded-lg border">
                                <div class="row p-3">
                                <small class="d-block mt-1 text-dark">&bull; กรุณาคัดลอกเลชบัญชีหรือแคปภาพหน้าจอ</small>
                                <small class="d-block mt-1 text-dark">&bull; โอนเงินให้ตรงกับยอดโอนเท่านั้น <span class="text-danger"><u>ห้ามปัดเศษ</u></span> เพราะระบบอ้างอิงยอดจาก <span class="text-danger"><u>ทศนิยม</u></span></small>
                                <small class="d-block mt-1 text-dark">&bull; เงินจะเข้าสู่ระบบอัตโนมัติภานใน 1-2 นาที</small>
                                </div>
                            </div>
                            <div class="mt-2 mb-4">
                                <div class="text-dark my-2">รายการฝากเงิน (โชว์รายการล่าสุด 5 รายการ)</div>
                                <b-table class="border card px-2 text-sm rounded-lg text-white white-space" small :fields="tablePromtpay.fields" :items="tablePromtpay.items" responsive :th-class="text-dark"></b-table>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
        <!-- toggle bank -->

        <!-- Notbank -->
        <div class="card shadow border-0 my-3 text-center" v-if="!bankArray.length && !promptPayArray.length">
            <div class="card-body">
                <div class="avatar avatar-60 no-shadow border-0">
                    <div class="overlay bg-template"></div>
                    <i class="material-icons vm md-36 text-template">report</i>
                </div>
                <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการบัญชีธนาคาร</h4>
                <p class="text-secondary text-mute small">กรุณาติดต่อพนักงาน</p>
            </div>
        </div>
    </div>

    <!-- page content ends -->
    <b-modal id="modal-warning" ref="modal-warning" centered content-class="rounded" header-class="shadow" body-class hide-footer no-close-on-backdrop>
        <template v-slot:modal-header="{ close }">
            <i class="f7-icons" style="position:absolute;right:10px;color:#000;" @click="$bvModal.hide('modal-warning')">multiply</i>
            <p class="text-center w-100 text-center" style="font-weight:100; font-size:18px;color:#000;">แจ้งเตือนหลังจากโอนเงิน</p>
        </template>
        <template v-slot:modal-footer="{ cancel }"></template>
        <div class="row justify-content-center">
            <div class="col-12 text-center text-dark">
                <span class="material-icons fs-75 text-warning">notifications_active</span>
            </div>
            <div class="col-12 text-center font-weight-100 text-dark">เมื่อโอนเงินสำเร็จกรุณากดปุ่ม "โอนแล้ว"</div>
            <div class="col-12 text-center">
                <button type="button" class="btn bg-dark font-weight-100 btn-outline-secondary mt-3 px-5" @click="$bvModal.hide('modal-warning')" style=" color:#000;">ตกลง</button>
            </div>
        </div>
    </b-modal>

    <!-- alert-dialog -->
    <alert-dialog 
        title="แจ้งเตือน" 
        acceptText="ยืนยัน"
        :active="topupPrompayActive" 
        @hide="hideTopupPrompayDialog" 
        
       
    > 
    <div class="text-center py-4">
          <p class="text-white">กรุณาโอนเงินพร้อมกับทศนิยมเท่านั้น ยอดเงินจะเข้าอัตโนมัติ</p>
    </div>
   
    </alert-dialog>

    <!-- Dialog -->
    <confirm-dialog 
        title="แจ้งเตือน" 
        acceptText="ยืนยัน"
        cancelText="ยกเลิก"
        :active="cancelTopupActive" 
        @hide="hideCancelTopupDialog" 
        @submit="onSubmitCancelTopup"
    > 
    <div class="text-center py-4">
         <p class="text-white">คุณต้องการยกเลิกการเติมเงิน ?</p>
    </div>
   
    </confirm-dialog>
</div>
</template>



<script>
import Info from "~/components/Info.vue";
import AlertDialog from "~/components/common/AlertDialog.vue";
import ConfirmDialog from "~/components/common/ConfirmDialog.vue";
export default {
    head() {
        return {
            title: "Deposit",
            itemId:"",
            money:"",
            amount:""
        };
    },
    data: () => ({
        invoiceTopupDrgx: null,
        invoiceTopupDrgxShow: false,
        promptPayArray: [],
        isSpin: false,
        isMarquee: false,
        tablePromtpay: {
            fields: [{
                    key: 'create_at',
                    label: 'วัน/เวลา',
                    class: 'text-left fontSizeTable text-dark small'
                },
                {
                    key: 'money',
                    label: 'จำนวนเงิน',
                    sortable: false,
                    class: 'text-right fontSizeTable text-dark small'
                },
                {
                    key: 'status_accept',
                    label: 'สถานะ',
                    sortable: false,
                    class: 'text-right fontSizeTable text-dark small'
                }
            ],
            items: [],
        },
        cancelTopupActive: false,
        topupPrompayActive: false,
        promptPayId: null,
       
    }),
    components: {
        "page-info": Info,
        "confirm-dialog": ConfirmDialog,
        "alert-dialog":AlertDialog,
    },
    asyncData: async function ({
        $axios
    }) {
        const topupDrgx = await $axios.$get("/api/drgx-topup");
        const topupBank = await $axios.$get("/api/bank-topup");
        return {
            bankArray: topupBank.success ? topupBank.data : [],
            drgxObject: topupDrgx.success ? topupDrgx.data : null,
        };
    },
    mounted() {
        this.getPromptpay();
        this.getHistory();
    },
    methods: {
    hideCancelTopupDialog(val) {
        this.cancelTopupActive = val
    },
    hideTopupPrompayDialog(val) {
        this.saveLog(this.amount,this.itemId,this.money);
        this.topupPrompayActive = val
    },
    onSubmitCancelTopup() {
        this.destroyLog(this.promptPayId);
        this.cancelTopupActive = false
    },
           copyAffiliate: function (target) {
            this.$refs[target].select();
            document.execCommand("copy");
            this.$toast.global.success({
                message: "คัดลอกลงคลิปบอร์ดแล้ว",
            });
        },
        fetchUser: function () {
            const loader = this.$loading.show({
                "is-full-page": true
            });
            this.isSpin = true;
            this.$auth
                .fetchUser()
                .then((res) => {
                    this.$toast.global.success({
                        message: "อัพเดทข้อมูลเรียบร้อย"
                    });
                    this.getPromptpay();
                    this.getHistory();
                    this.isSpin = false;
                    loader.hide();
                })
                .catch((e) => {
                    this.isSpin = false;
                    loader.hide();
                });
        },
        async getHistory() {
            this.loading = true
            await this.$axios
                .request({
                    method: "GET",
                    url: "/api/get-qr-code/history"
                })
                .then((response) => response.data).then((response) => {
                    if (response.success) {
                        this.tablePromtpay.items = response.data
                    } else {
                        this.tablePromtpay.items = []
                    }
                })
                .catch((error) => {
                    noty.showNoty("error", "ไม่สามารถดึงข้อมูล History Promtpay ได้", "topCenter");
                });
            this.loading = false
        },
        async showMsgBox(id) {
            this.cancelTopupActive = true
            this.promptPayId = id
            
        },
        async showBox(id,itemId,money) {
            this.topupPrompayActive = true
            this.itemId = itemId
            this.money = money
            this.amount = id
           },
        copyPrompt: async function (text) {
            var textInput = document.createElement("input");
            textInput.type = "text";
            textInput.value = text;
            document.body.appendChild(textInput);
            textInput.select();
            document.execCommand("copy");
            await textInput.remove();
            this.$toast.global.success({
                message: "คัดลอกเบอร์ " + text + " เรียบร้อย",
            });
        },
        copyBank: async function (text) {
            var textInput = document.createElement("input");
            textInput.type = "text";
            textInput.value = text;
            document.body.appendChild(textInput);
            textInput.select();
            document.execCommand("copy");
            await textInput.remove();
            this.$toast.global.success({
                message: "คัดลอกเลขบัญชีธนาคาร " + text + " เรียบร้อย",
            });
        },
        acceptTopupDrgx: async function () {
            const reg = /^\d+$/;
            if (!reg.test(this.$refs.topupDrgxAmount.value))
                return this.$toast.global.error({
                    message: "กรุณาใส่จำนวนเงินให้ถูกต้อง",
                });

            const loader = this.$loading.show({
                container: this.$refs.formTopupDrgx,
            });
            const checkTopupDrgx = await this.$axios.$post(
                "/api/topup-bonus/check-drgx-topup", {
                    amount: this.$refs.topupDrgxAmount.value,
                }
            );
            if (!checkTopupDrgx.success) {
                loader.hide();
                return this.$toast.global.error({
                    message: checkTopupDrgx.msg,
                });
            }
            const initTopupDrgx = await this.$axios.$post("/api/coin/login", {
                amount: "100",
                phone: this.$auth.user.tel,
            });

            if (!initTopupDrgx.result) {
                loader.hide();
                return this.$toast.global.error({
                    message: initTopupDrgx.message ?
                        initTopupDrgx.message : "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (501) / กรุณาติดต่อพนักงาน",
                });
            }
            this.invoiceTopupDrgx = initTopupDrgx.result;
            this.invoiceTopupDrgxShow = true;
            this.$refs.topupDrgxAmount.value = "";
            loader.hide();
        },
        genTime(DateStart, DateEnd) {
            DateStart = new Date();
            DateEnd = new Date(DateEnd.replace(/-/g, "/"));
            return DateEnd - DateStart;
        },
        getPromptpay() {
            const loader = this.$loading.show({
                "is-full-page": true,
            });
            this.$axios
                .request({
                    method: "GET",
                    url: "/api/prompt-pay-topup",
                })
                .then((response) => response.data)
                .then((Response) => {
                    loader.hide();
                    if (Response.success) {
                        this.promptPayArray = Response.data;
                        this.getHistory()
                    } else {
                        this.promptPayArray = [];
                    }
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.global.error({
                        message: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (500) / กรุณาติดต่อพนักงาน",
                    });
                });
        },
        saveLog(amount, scr_bank_id, money) {
            const loader = this.$loading.show({
                "is-full-page": true,
            });
            this.$axios
                .request({
                    method: "POST",
                    url: "/api/get-qr-code",
                    data: {
                        money: amount != null ? $("#" + amount).val() : money,
                        scr_bank_id: scr_bank_id,
                    },
                })
                .then((response) => response.data)
                .then((Response) => {
                    loader.hide();
                    if (Response.success) {
                        this.$toast.global.success({
                            message: "สร้าง QR Code ชำระเงินสำเร็จ !!",
                        });
                        $("#" + amount).val(0);
                        this.getPromptpay();
                        // this.$refs["modal-warning"].show();
                    } else {
                        this.$toast.global.error({
                            message: Response.message,
                        });
                    }
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.global.error({
                        message: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (500) / กรุณาติดต่อพนักงาน",
                    });
                });
        },
        acceptLog(player_qrcode_log) {
            const loader = this.$loading.show({
                "is-full-page": true,
            });
            this.$axios
                .request({
                    method: "POST",
                    url: "/api/get-qr-code/update",
                    data: {
                        player_qrcode_log: player_qrcode_log,
                    },
                })
                .then((response) => response.data)
                .then((Response) => {
                    loader.hide();
                    if (Response.success) {
                        this.$toast.global.success({
                            message: "ยืนยันการชำระเงินสำเร็จ กรุณารอสักครู่...",
                        });
                        this.getPromptpay();
                    } else {
                        this.$toast.global.error({
                            message: Response.message,
                        });
                    }
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.global.error({
                        message: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (500) / กรุณาติดต่อพนักงาน",
                    });
                });
        },
        destroyLog(player_qrcode_log) {
            const loader = this.$loading.show({
                "is-full-page": true,
            });
            this.$axios
                .request({
                    method: "POST",
                    url: "/api/get-qr-code/destroy",
                    data: {
                        player_qrcode_log: player_qrcode_log,
                    },
                })
                .then((response) => response.data)
                .then((Response) => {
                    loader.hide();
                    if (Response.success) {
                        this.$toast.global.success({
                            message: "ยกเลิกการชำระเงินสำเร็จ",
                        });
                        this.getPromptpay();
                    } else {
                        this.$toast.global.error({
                            message: Response.message,
                        });
                    }
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.global.error({
                        message: "ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (500) / กรุณาติดต่อพนักงาน",
                    });
                });
        },
        setDigit(digit) {
            if (digit > 9) {
                return digit;
            } else {
                return "0" + digit;
            }
        },
    },
};
</script>
<style scoped>

.font-bank2{
    width:70%;
    float:right;
    font-size:11px;
    padding-left:2px;
}
.font-bank{
    width:30%;
    float:left;
    font-size:10px;
}
.border .border-green{
   border-color: #259690
}


.text-yellow {
    color: #ffc107;
}

.click-active:active {
    background-color: #dadada;
}

.bg-rgba {
    background: rgba(0, 0, 0.4);
}

*,
*:after,
*:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.btn-ocean {
     background: linear-gradient(0deg,#410c0c 0,#991515);
    filter: drop-shadow(3px 3px 1px black);
}

.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}

body {
    /* font-family: sans-serif; */
    background: #f6f9fa;
}

h1 {
    color: #ccc;
    text-align: center;
}

a {
    color: #ccc;
    text-decoration: none;
    outline: none;
}

/*Fun begins*/
.tab_container {
    width: 90%;
    margin: 0 auto;
    padding-top: ๅ0px;
    position: relative;
}

input,
section {
    clear: both;
    padding-top: 10px;
    display: none;
}

label {
    font-weight: 100;
    font-size: 18px;
    display: block;
    float: left;
    width: 20%;
    padding: 0.5em 4px;
    color: #050505;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    background: #fff;
    /* background-image: linear-gradient(rgb(0 0 0), rgb(56 56 56), rgb(0, 0, 0)); */
    list-style-type: circle;

    font-weight: 400;
    border-radius: 10px;
    filter: drop-shadow(0px 2px 2px black);
}

#tab1:checked~#content1,
#tab2:checked~#content2,
#tab3:checked~#content3,
#tab4:checked~#content4,
#tab5:checked~#content5 {
    display: block;
    padding: 0 20px;
    background: rgba(0, 0, 0, 0%);
    color: #999;
}

.tab_container .tab-content p,
.tab_container .tab-content h3 {
    -webkit-animation: fadeInScale 0.7s ease-in-out;
    -moz-animation: fadeInScale 0.7s ease-in-out;
    animation: fadeInScale 0.7s ease-in-out;
}

.tab_container .tab-content h3 {
    text-align: center;
}



.tab_container [id^="tab"]:checked+label .fa {
    color: #e00;
}

label .fa {
    font-size: 1.3em;
    margin: 0 0.4em 0 0;
}



/*Media query*/
@media only screen and (max-width: 930px) {
    label span {
        font-size: 14px;
    }

    label .fa {
        font-size: 14px;
    }
}

@media only screen and (max-width: 768px) {
    label span {
        display: none;
    }

    label .fa {
        font-size: 16px;
    }

    .tab_container {
        width: 98%;
    }
}

/*Content Animation*/
@keyframes fadeInScale {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>

<style>
.note-info {
  color: #fff;
  background-color: #000000;
  border-color: #666;
}
.alert {
  position: relative;
  padding: 0.5rem 0.2rem;
  /* margin-bottom: 1rem; */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-radius: 0.25rem;
  line-height: 1em;
  background: #fff0;
  margin-bottom: -10px;
  margin-top: -5px;
}
#app svg {
  width: 90%;
  height: 90%;
}
button.form-controls,
input.form-controls {
  color: #ccc;
  border: 1px solid #555;
  background-color: #a74e4e;
  width: 100%;
  border-radius: 5px;
}

/* .btn-money button { background: #fff; } */

</style>

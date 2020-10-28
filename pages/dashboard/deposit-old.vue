<template>
  <div>
    <!-- <page-info /> -->
    <div class="container">
      <h6 class="subtitle">เลือกช่องทางการเติมเงิน</h6>
      <div class="row">
        <div class="col-md-12 col-xs-12 mb-3">
          <div class="card shadow border-0 text-center click-active" v-b-toggle.bank>
            <div class="card-body">
              <div class="avatar avatar-60 no-shadow border-0">
                <div class="overlay bg-template"></div>
                <!-- iconbank -->
                <i class="material-icons vm md-36 text-template">account_balance</i> 
              </div>
              <!-- textbank -->
              <h4 class="mt-3 mb-0 font-weight-normal text-dark">บัญชีธนาคาร</h4>
              <p class="text-secondary text-mute small">ระบบจะเติมเครดิตเข้ากระเป๋าหลักอัตโนมัติ</p>
            </div>
          </div>
        </div>
        
        <!-- dragon Social wallet -->
        <div class="col-md-12 col-xs-12" v-if="drgxObject && drgxObject.status == '1'">
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
      <!-- toggle bank -->
      <div class="row" >
        <div class="col-12">
          <b-collapse id="bank" visible accordion="my-bank" role="tabpanel">
            <h6 class="my-2 subtitle">บัญชีธนาคาร</h6>
            <div class="alert alert-warning" role="alert"   ref="formContainer">
              <small class="d-block">* กรุณาใช้บัญชีที่ท่านสมัครโอนมาเท่านั้น </small>
              <small class="d-block">* ระบบจะเติมเครดิตเข้ากระเป๋าหลักอัตโนมัติ ภายในเวลา 1-2 นาที</small>
            </div>
            <small class="text-danger">*คลิกเพื่อคัดลอกเลขบัญชีธนาคาร</small>
            <div class="list-group list-group-flush" v-if="bankArray.length">
              <a class="list-group-item border-top text-dark click-active" @click="copyBank(item.bank_account)" v-for="(item, index) in bankArray" :key="index">
                <div class="row">
                  <div class="col-auto align-self-center">
                    <img style="width: 50px;" :src="require('~/assets/img/thaibanks/'+ item.shortname +'.png')" alt="">
                    <!-- <i class="material-icons text-template-primary">local_mall</i> -->
                  </div>
                  <div class="col pl-0">
                    <div class="row mb-1">
                      <div class="col">
                        <p class="m-0 small text-white">เลขบัญชี: <span class="text-warning">{{item.bank_account}}</span> </p>
                        <p class="m-0 small text-white">ชื่อบัญชี: <span class="text-warning">{{ item.bank_fullname }}</span> </p>
                        <p class="m-0 small text-white">ธนาคาร: <span class="text-warning">{{ item.name }}</span> </p>
                      </div>
                    </div>
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
          </b-collapse>
          
          <!-- toggle.dragon -->
          <b-collapse id="dragon"  accordion="my-bank" role="tabpanel"  v-if="drgxObject && drgxObject.status == '1'">
            <h6 class="my-2 subtitle">Dragon Social Wallet</h6>
            <div class="alert alert-warning" role="alert">
              <small class="d-block"><b>คำเตือน</b> : QR Code สามารถใช้ได้เพียงครั้งเดียวเท่านั้น !! ไม่สามารถใช้ซ้ำได้ กรณีหากลูกค้าใช้ QR Code ซ้ำ ทางทีมงานจะไม่คืนเงินทุกกรณี ขอบคุณค่ะ</small>
              <small class="d-block"><b>วิธีการใช้งาน</b> : <a href="https://expgaming.com/dragon-coin/" target="_blank"> คลิกที่นี่ Dragon Social Wallet</a></small>
            </div>
            <div class="row animated fadeIn" v-show="!invoiceTopupDrgxShow" ref="formTopupDrgx"> 
              <div class="col-12 col-md-12 text-center">
                <img class="m-auto" style="width : 300px" src="~/assets/img/drgx.png" alt="">
              </div>
              <div class="col-12 col-md-12">
                <div class="form-group float-label active">
                  <input type="text" class="form-control text-white" readonly :value="$auth.user.tel">
                  <label class="form-control-label">เบอร์โทรมือถือ</label>
                </div>
              </div>
              <div class="col-12 col-md-12">
                <div class="form-group float-label active">
                  <input type="tel" ref="topupDrgxAmount" class="form-control text-white" placeholder="จำนวนเงิน">
                  <label class="form-control-label">จำนวนเงิน</label>
                </div>
              </div>
              <div class="col-12 col-md-12">
                <a class="btn btn-md btn-default text-white btn-block shadow mb-2"
                  @click="acceptTopupDrgx"><span>เติมเงิน</span></a>
              </div>
            </div>
            <div class="row animated fadeIn" v-show="invoiceTopupDrgxShow">
              <div class="col-12 col-md-12">
            <div class="alert alert-success" role="alert">
                <p>ID : <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.id : ''}}</span></p>
                <p>ORDER ID : <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.order : ''}}</span> </p>
                <p>SERVICE : <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.service.name : ''}}</span></p>
                <p>จำนวนเงิน : <span class="text-template">{{ invoiceTopupDrgx ? invoiceTopupDrgx.amount : ''}} บาท</span></p>
                <a class="btn btn-md btn-default text-white btn-block shadow mb-2" :href="invoiceTopupDrgx ? invoiceTopupDrgx.value : ''" target="_blank">เข้าแอพพลิเคชั่น</a>
                <a class="btn btn-md btn-dark text-white btn-block shadow mb-2" @click="invoiceTopupDrgxShow = !invoiceTopupDrgxShow">กลับ</a>
              </div>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
    <!-- page content ends -->
  </div>
</template>

<style  scoped>
    .click-active:active{
        background-color: #dadada;
    }
</style>
<script>
import Info from '~/components/Info.vue'
export default {
    head() {
      return {
        title: 'Deposit',
      }
    },
    data : () => ({
      invoiceTopupDrgx : null,
      invoiceTopupDrgxShow : false,
    }),
    components: {
        'page-info' : Info,
    },
    asyncData : async function({ $axios }) {
        const  topupDrgx = await $axios.$get('/api/drgx-topup');
        const  topupBank = await $axios.$get('/api/bank-topup');
        return {bankArray : topupBank.success ? topupBank.data : [], drgxObject : topupDrgx.success ? topupDrgx.data : null}
    },
    mounted : function(){
    //  console.log(this.drgxObject)
    },
    methods : {
        copyBank : async function(text) {
            var textInput = document.createElement("input");
            textInput.type = "text";
            textInput.value = text;
            document.body.appendChild(textInput);
            textInput.select();
            document.execCommand("copy");
            await textInput.remove(); 
            this.$toast.global.success({message :'คัดลอก ' + text + ' ลงคลิปบอร์ดแล้ว'});
        },
        acceptTopupDrgx : async function(){
          const reg = /^\d+$/;
          if(!reg.test(this.$refs.topupDrgxAmount.value)) return this.$toast.global.error({message :'กรุณาใส่จำนวนเงินให้ถูกต้อง'});

          const loader = this.$loading.show({container:  this.$refs.formTopupDrgx});
          const checkTopupDrgx = await this.$axios.$post('/api/topup-bonus/check-drgx-topup',{amount : this.$refs.topupDrgxAmount.value});
          if(!checkTopupDrgx.success){ loader.hide(); return this.$toast.global.error({message :checkTopupDrgx.msg}); };
          const initTopupDrgx = await this.$axios.$post('/api/coin/login',{  amount : '100',  phone : this.$auth.user.tel  });

          if(!initTopupDrgx.result) { loader.hide(); return this.$toast.global.error({message : initTopupDrgx.message ? initTopupDrgx.message : 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ (501) / กรุณาติดต่อพนักงาน'}) }; 
          this.invoiceTopupDrgx = initTopupDrgx.result;
          this.invoiceTopupDrgxShow = true;
          this.$refs.topupDrgxAmount.value = '';
          loader.hide();
        }
    }
}
</script>
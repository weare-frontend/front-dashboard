<template>
<div>
  
  <div class="container">
    <div class="col-4 text-left" style="top:25px; position:absolute;">
       <nuxt-link :to="{name:'dashboard-activity'}">
            <i  class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
     <div class="col-12">
        <h5 class="text-center font-weight-100 text-white mb-0 mt-4">เปิดกล่อง</h5>
          <h4 class="text-center text-danger mt-3">{{this.boxSetting.message}}</h4>
      </div>
 
      <div
        class="row position-relative"
        ref="formOpenBox"
        v-if="this.boxSetting.message =='เริ่มลุ้นรางวัลในกล่องได้เลย'"
      >
        <div class="col-4 text-center " v-for="(item,index) in itemBoxArray" :key="index">
          <div class="box">
            <img class="item-box img-fluid" :disabled="resultOpen" @click="openItemBox(index)" :src="isOpenImg" alt="">
          </div>
        <h5 class="mb-2 text-center item-text p-1 " :class="[{'bg-warning' : resultOpen == null|| resultOpen == index ,'text-white bg-dark' :  resultOpen != null &&resultOpen != index }]">{{resultItems[index] ? resultItems[index] : `กล่องที่ ${index+1}`}}</h5>
      </div>
      <!-- <div class="col-12">
          <button v-if="resultOpen != null" @click="resetOpenBox" class="btn btn-default btn-lg my-2 btn-rounded shadow btn-block">ตกลง</button>
      </div> -->
    </div>

    <!-- page content here -->
    <h4 class="text-template subtitle">ประวัติการรับรางวัล</h4>
    <div class="card shadow border-0 mb-3" v-for="(item,index) in historyArray" :key="index">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h5 class="font-weight-normal mb-1"> {{item.detail}} <span class="text-mute small text-white mb-0">ได้รับแล้ว</span></h5>

            <p class="text-mute small text-secondary">วันที่ : {{item.create_at}}</p>

          </div>
          <div class="col-auto pl-0">
            <button class="avatar avatar-50 no-shadow border-0 bg-template">
              <i class="material-icons">check</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow border-0 mb-3 text-center" v-if="!historyArray.length">
      <div class="card-body">
        <div class="avatar avatar-60 shadow border-0 bg-template" style="border-radius:50%;">
  
          <i class="material-icons vm md-36 text-white">card_giftcard</i>
        </div>
        <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการรับรางวัล </h4>
        <p class="text-secondary text-mute small">จะแสดงรายการรางวัลที่ได้รับทั้งหมด</p>
      </div>
    </div>
    <!-- page content ends -->
  </div>
  <b-modal
        id="modal-exchange"
        ref="modal-exchange"
        centered
        content-class="rounded"
        header-class="shadow"
        body-class=" bg-white"
        hide-footer
        hide-header
      >

        <template v-slot:modal-header="{ close }">
          <i
            class="f7-icons"
            style="position:absolute;right:10px;color:#ec1415;"
            @click="$bvModal.hide('modal-exchange')"
          >multiply</i>
          <p class="text-center w-100" style="font-weight:100; font-size:18px;">รางวัลที่ออก</p>
        </template>
        <template v-slot:modal-footer="{ cancel }"></template>
        <div class="row mt-3 justify-content-center">
        <div class="col-12">
          <i
            class="f7-icons"
            style="position:absolute;right:10px;color:#ec1415;"
            @click="$bvModal.hide('modal-exchange')"
          >multiply</i>
          <h5 class="display-none text-center" id="textbox">{{result}}</h5>
          <img :src="require('assets/img/boxs/'+this.imgbox)" class="w-100" alt id="img" />
        </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-8">
            <button
              type="button"
              class="btn btn-block btn-outline-secondary"
              @click="resetOpenBox"
            >ตกลง</button>
          </div>
        </div>
      </b-modal>
</div>
</template>



<script>
import imgItemBoxClose from '~/assets/img/boxs/ChestRibbon_01.png'
import imgItemBoxOpen from '~/assets/img/boxs/ChestRibbon_15.png'
import importAudio from '~/assets/audio/tick.mp3';
export default {
    head() {
      return {
        title: 'Box',
      }
    },
    data : () => ({
        historyArray : [],
        isSpin : false,
        result : "",
        resultItems : [],
        resultOpen : null,
        imgbox : "ChestRibbon_01.png"

    }),
    asyncData : async function({$axios ,redirect}){
      const itemBox = await $axios.$get('/api/get-chests/item');
      const boxSetting = await $axios.$get('/api/get-chests');
      const historyArray = await $axios.$get('/api/get-chests/history');
      const jsonItemBox = JSON.parse(itemBox.data.values_json);

      if(!boxSetting || boxSetting.data.status =='0') return redirect('/dashboard/activity');
      return {boxSetting:boxSetting,itemBoxArray : jsonItemBox , historyArray : historyArray.data ? historyArray.data : []}
    },
    computed: {
      isOpenImg : function(){
        return this.resultOpen != null ? imgItemBoxOpen : imgItemBoxClose;
      }
    },
    mounted :async function() {
      const boxSetting = await this.$axios.$get('/api/get-chests');
    },
    methods : {
      openItemBox : async function(index){
        
      //  document.getElementById("img").style.display = "block";
      
      
  
    
        if (this.resultOpen != null) return this.$toast.global.error({
          message: 'กรุณากดเริ่มเกมใหม่'
        });

        const loader = this.$loading.show({
          container: this.$refs.formOpenBox
        });

        const openBox = await this.$axios.$post("/api/get-chests/open", {
          index: index
        });
       
        loader.hide();

        if (!openBox.success){
          return this.$toast.global.error({
          message: openBox.msg
        });

        }else{
          this.$refs["modal-exchange"].show();
           setTimeout(() => {
        this.imgbox="ChestRibbon_01.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_02.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_03.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_04.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_05.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_06.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_07.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_08.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_09.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_10.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_11.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_12.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_13.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_14.png";
        setTimeout(() => {
        this.imgbox="ChestRibbon_15.png";
      },200);
       setTimeout(() => {
       document.getElementById("textbox").style.marginTop="0px";
      },200);
      },200);
      },200);
       setTimeout(() => {
       document.getElementById("textbox").style.display="block";
       document.getElementById("textbox").style.marginTop="10px";
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
      },200);
        }
        this.getHistory();
        this.resultItems = openBox.items;
        this.resultOpen = openBox.result.id;
        this.result = openBox.result.detail;
        return this.$toast.global.success({
          message: openBox.result.detail
        });

      },
      resetOpenBox : async function(index){
        window.location.reload();
        this.resultItems = [];
        this.resultOpen = null;
      },
       getHistory :async function(){
        const getHistory = await this.$axios.$get('/api/get-chests/history');
        this.historyArray =  getHistory.data
      }
    }
}
</script>
<style >
.item-box:hover {
  animation: shake 0.5s;
  animation-iteration-count: infinite;

}.display-none{
  display: none;
}


@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }

}
.item-text {
      font-size: 16px;
  }
  
.box:hover {
  -webkit-transform: scale(1.10, 1.10q);
  transform: scale(1.10, 1.10);
}

.box:hover::after {
    opacity: 1;
}

.select-open-box{
  -webkit-transform: scale(1.10, 1.10q);
  transform: scale(1.10, 1.10);
}
</style>

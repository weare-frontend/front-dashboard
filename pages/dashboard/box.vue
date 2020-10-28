<template>
<div>
  <div class="container"><br>
    <h4 class="subtitle text-center">เปิดกล่อง</h4>
    <div class="row position-relative"  ref="formOpenBox">
        <div class="col-4 text-center " v-for="(item,index) in itemBoxArray" :key="index">
          <div class="box">
            <img class="item-box img-fluid" :disabled="resultOpen" @click="openItemBox(index)" :src="isOpenImg" alt="">
          </div>
        <h5 class="mb-2 text-center item-text p-1 " :class="[{'bg-warning' : resultOpen == null|| resultOpen == index ,'text-white bg-dark' :  resultOpen != null &&resultOpen != index }]">{{resultItems[index] ? resultItems[index] : `กล่องที่ ${index+1}`}}</h5>
      </div>
      <div class="col-12">
          <button v-if="resultOpen != null" @click="resetOpenBox" class="btn btn-default btn-lg my-2 btn-rounded shadow btn-block">กดเพื่อเริ่มเกมใหม่</button>
      </div>
    </div>
     
    <!-- page content here -->
    <h4 class="subtitle">ประวัติการรับรางวัล</h4>
    <div class="card shadow border-0 mb-3" v-for="(item,index) in historyArray" :key="index">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h5 class="font-weight-normal mb-1"> {{item.detail}} </h5>
            <p class="text-mute small text-success mb-0">ได้รับแล้ว</p>
            <p class="text-mute small text-secondary mb-2">วันที่ : {{item.create_at}}</p>
            <div class="progress h-4">
              <div class="progress-bar bg-success w-100" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
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
        <div class="avatar avatar-60 no-shadow border-0">
          <div class="overlay bg-template"></div>
          <i class="material-icons vm md-36 text-template">card_giftcard</i>
        </div>
        <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการรับรางวัล </h4>
        <p class="text-secondary text-mute small">จะแสดงรายการรางวัลที่ได้รับทั้งหมด</p>
      </div>
    </div>
    <!-- page content ends -->
  </div>
</div>
  
                
</template>

<style  scoped>
.item-box:hover {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  
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
      font-size: 1.5vw;
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

<script>
import imgItemBoxClose from '~/assets/img/boxs/close.png'
import imgItemBoxOpen from '~/assets/img/boxs/open.png'
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
        resultItems : [],
        resultOpen : null
    }),
    asyncData : async function({$axios ,redirect}){
      const itemBox = await $axios.$get('/api/get-chests/item');
      const boxSetting = await $axios.$get('/api/get-chests');
      const historyArray = await $axios.$get('/api/get-chests/history');
      const jsonItemBox = JSON.parse(itemBox.data.values_json);

      // if(!boxSetting.success) return redirect('/dashboard');
      return {itemBoxArray : jsonItemBox , historyArray : historyArray.data ? historyArray.data : []}
    },
    computed: {
      isOpenImg : function(){
        return this.resultOpen != null ? imgItemBoxOpen : imgItemBoxClose;
      }
    },
    mounted :async function() {
      const boxSetting = await this.$axios.$get('/api/get-chests');
      // console.log(boxSetting)
    },
    methods : {
      openItemBox : async function(index){

        if (this.resultOpen != null) return this.$toast.global.error({
          message: 'กรุณากดเริ่มเกมใหม่'
        });

        const loader = this.$loading.show({
          container: this.$refs.formOpenBox
        });

        const openBox = await this.$axios.$post("api/backend/api/get-chests/open", {
          index: index
        });
        loader.hide();

        if (!openBox.success) return this.$toast.global.error({
          message: openBox.msg
        });
        
        this.getHistory();
        this.resultItems = openBox.items;
        this.resultOpen = openBox.result.id;
        return this.$toast.global.success({
          message: openBox.result.detail
        });

      },
      resetOpenBox : async function(index){
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
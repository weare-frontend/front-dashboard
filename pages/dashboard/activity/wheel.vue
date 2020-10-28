<template>
  <div>
    <div class="container">
 <div class="col-4 text-left"  style="top:25px; position:absolute;">
       <nuxt-link :to="{name:'dashboard'}">
            <i  class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
      <div class="row mt-2 mb-3 justify-content-center">
        <!-- <div class="col-2 text-left">
        <nuxt-link :to="{name:'dashboard-activity'}" class="mt-4 ">
          <i class="f7-icons text-pink ">chevron_left_circle_fill</i>
        </nuxt-link>
        </div>-->
        <div class="col-8 pt-4">
          <h5 class="text-center text-white font-weight-100">กิจกรรมหมุนวงล้อ</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex justify-content-center position-relative"
            ref="formLuckywheel"
            width="350px"
            height="350px"
          >
            <img class="mt-4" ref="btnPin" src="~/assets/img/winwheel/btn-pin.png" alt />
            <div class="winwheel-main d-flex align-items-center justify-content-center">
              <img ref="btnCenter" src="~/assets/img/winwheel/btn-center.png" alt />
              <canvas
                class="m-auto winwheel-item"
                id="canvas"
                width="400"
                height="400"
                data-responsive-min-width="400"
                data-responsive-scale-height="true"
                data-responsive-margin="40 "
              ></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="row text-center mb-3">
        <div class="col-3" style="margin-top:-18px;">
          <div
            class="avatar avatar-40 bg-template no-shadow border-0 d-flex text-center align-items-center justify-content-center"
          >
            <h3 class="m-0 text-white">{{$auth.user.luckydraw}}</h3>
          </div>
          <p class="text-template small" style="white-space: nowrap;">สิทธิ์คงเหลือ</p>
        </div>
        <div class="col-6 mt-2">
          <button
            disabled
            style="border-radius: 5px;"
            class="btn bg-template btn-sm mb-2 shadow btn-block"
            v-if="$auth.user.luckydraw<1"
            id="isSpin"
          >สิทธิ์ไม่เพียงพอ</button>
          <button
            :disabled="this.isSpin"
            @click="spinLuckyWheel"
            class="btn bg-template rounded btn-sm mb-2 shadow btn-block"
            id="isSpin"
            v-else
          >{{isSpinText}}</button>
          <button
            :disabled="this.isSpin"
            class="btn bg-template rounded btn-sm mb-2 shadow btn-block"
            id="isSpindisable"
          >กรุณารอผล..</button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11 text-center p-2 bg-template" style=" border-radius:6px;">
          <p class="text-white font-weight-100">
            ยอดเติมรับโบนัสตั้งแต่ {{prodata.data.minimum_money}} บาทขึ้นไป
            <br />รับ
            <span>1</span> สิทธิ์ทันที
          </p>
        </div>
      </div>

      <!-- page content here -->
      <h6 class="mt-2 text-template">ประวัติการรับรางวัล</h6>
      <div class="card shadow border-0 mb-3" v-for="(item,index) in historyArray" :key="index">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="font-weight-normal mb-1">
                {{item.bonus_result}}
                <span class="small text-success mb-0">ได้รับแล้ว</span>
              </h5>

              <p class="text-mute small text-secondary mb-2">วันที่ : {{item.create_at}}</p>
            </div>
            <div class="col-auto pl-0">
              <button class="avatar avatar-50 no-shadow border-0 bg-template">
                <i class="material-icons">check</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card shadow border-0 mb-5 text-center" v-if="!historyArray.length">
        <div class="card-body">
          <div class="avatar avatar-60 shadow border-0 bg-template" style="border-radius: 50%;">
            <i class="material-icons vm md-36 text-white">card_giftcard</i>
          </div>
          
          </div>
          <h5 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการรับรางวัล</h5>
          <p class="text-secondary text-mute small">จะแสดงรายการรางวัลที่ได้รับทั้งหมด</p>
        </div>
      </div>
      <div class="row py-5"></div>
      <!-- page content ends -->

      <!-- Dialog -->
    <alert-dialog 
        title="รางวัลวงล้อ" 
        acceptText="ยืนยัน"
        :active="wheelActive" 
        @hide="hideWheelDialog" 
        @submit="onSubmitWheelDialog"
    > 
    <div class="text-center py-4">
        <vnodes :vnodes="messageVNode"/>
    </div>
   
    </alert-dialog>
    </div>
    
  
</template>



<script>
import AlertDialog from "~/components/common/AlertDialog.vue";
import importAudio from "~/assets/audio/tick.mp3";
// import AlertDialogVue from '../../../components/common/AlertDialog.vue';
export default {
  head() {
    return {
      title: "WinWheel",
    };
  },
  data: () => ({
    theWheel: null,
    isSpin: false,
    wheelActive:false,
    messageVNode: null
  }),
  components:{
      "alert-dialog":AlertDialog,
        Vnodes: {
          functional: true,
          render: (h, ctx) => ctx.props.vnodes
        }
  },
  computed: {
    isSpinText: function () {
      return this.isSpin ? "กำลังเริ่มหมุน...." : "เริ่มหมุน";
    },
  },
  asyncData: async function ({ env, $axios, redirect }) {
    const getPromotion = await $axios.$get("/api/luckywheel/promotion-data");
    const getHistory = await $axios.$get("/api/luckywheel/history");

    if (!getPromotion || getPromotion.data.status == "0")
      return redirect("/dashboard/activity");
    var items = JSON.parse(getPromotion.data.values_json);
    items = await items.map((item, index) => {
      let newItem = {};
      newItem.image = `${env.API}backend/web/spin/${item.img}`;
      newItem.text = item.detail;
      return newItem;
    });
    return {
      wheelItems: items,
      historyArray: getHistory.success ? getHistory.data : [],
      prodata: getPromotion,
    };
  },
  mounted: async function () {
    // Create new wheel object specifying the parameters at creation time.
    this.theWheel = await new Winwheel({
      responsive: false,
      numSegments: this.wheelItems.length, // Specify number of segments.
      drawMode: "segmentImage",
      segments: this.wheelItems,

      // Specify the animation to use.
      animation: {
        type: "spinToStop",
        duration: 10, // Duration in seconds.
        spins: 3, // Default number of complete spins.
        callbackFinished: this.alertPrize,
        callbackSound: this.playSound, // Function to call when the tick sound is to be triggered.
        soundTrigger: "pin", // Specify pins are to trigger the sound, the other option is 'segment'.
      },
      // Turn pins on.
      pins: {
        number: 24,
        fillStyle: "silver",
        outerRadius: 0,
        responsive: true,
      },
    });

    this.$nextTick(() => {
      this.$refs.btnCenter.classList.add("position-absolute");
      this.$refs.btnPin.classList.add("position-absolute");
    });
  },
  methods: {
    hideWheelDialog(val) {
        this.wheelActive = val
    },
    onSubmitWheelDialog() {
        this.getHistory(this.getHistory);
        this.wheelActive = false
    },
    alertPrize: function (indicatedSegment) {
      const h = this.$createElement;
      const messageVNode = h("div", { class: ["text-center"] }, [
        h("img", {
          attrs: { class: ["img-fluid mb-3"], src: [indicatedSegment.image] },
        }),
        h("h5", { class: ["text-center text-white"] }, [
          `คุณที่ได้รับรางวัล : ${indicatedSegment.text}`,
        ]),
      ]);
        this.wheelActive = true
        this.isSpin = false
        this.getHistory()
        this.messageVNode = messageVNode
      // this.$bvModal
      //   .msgBoxConfirm(messageVNode, {
      //     title: "แจ้งเตือน",
      //     size: "md",
      //     buttonSize: "md",
      //     okVariant: "success",
      //     okTitle: "ยืนยัน",
      //     cancelTitle: "ปิด",
      //     footerClass: "p-2",
      //     hideHeaderClose: false,
      //     centered: true,
      //   })
      //   .then(() => {});
      // this.isSpin = false;
      // this.getHistory();
    },
    playSound: function () {
      let audio = new Audio(importAudio);
      // Stop and rewind the sound if it already happens to be playing.
      audio.pause();
      audio.currentTime = 0;
      // Play the sound.
      audio.play();
    },
    spinLuckyWheel: async function () {
      document.getElementById("isSpindisable").style.display = "block";
      document.getElementById("isSpin").style.display = "none";
      setTimeout(() => {
        document.getElementById("isSpin").style.display = "block";
        document.getElementById("isSpindisable").style.display = "none";
        loader.hide();
      }, 2400);
      this.isSpin = true;
      this.theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
      this.theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
      this.theWheel.draw(); // Call draw to render changes to the wheel.
      const loader = this.$loading.show({
        container: this.$refs.formLuckywheel,
      });
      const spinLuckyWheel = await this.$axios.$get(
        "/api/luckywheel/spin-luckywheelv2"
      );
      loader.hide();
      this.$auth.fetchUser();
      if (!spinLuckyWheel.success) {
        this.isSpin = false;
        return this.$toast.global.error({ message: spinLuckyWheel.msg });
      }
      this.theWheel.animation.stopAngle = this.theWheel.getRandomForSegment(
        spinLuckyWheel.data.id + 1
      );
      this.theWheel.startAnimation();
    },
    getHistory: async function () {
      const getHistory = await this.$axios.$get("/api/luckywheel/history");
      this.historyArray = getHistory.data;
    },
  },
};
</script>
<style scoped>
.btn-ocean {
  width: 100%;
  border-radius: 5px;
  background-image: linear-gradient(
    rgb(191, 191, 191),
    rgb(255, 255, 255),
    rgb(220, 220, 220)
  );
}
.winwheel-main {
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  -webkit-animation-duration: 1.4s; /* Safari 4.0 - 8.0 */
  -webkit-animation: fade-img 1.4s infinite;
  animation: fade-img 1.4s infinite;
  animation-duration: 1.4s;
}
.winwheel-item {
  max-width: 500px;
  width: 100%;
}

@keyframes fade-img {
  0% {
    background-image: url("~assets/img/winwheel/background-1.png");
  }
  50% {
    background-image: url("~assets/img/winwheel/background-2.png");
  }
  100% {
    background-image: url("~assets/img/winwheel/background-1.png");
  }
}
@keyframes lucky-light-bg {
  0% {
    background-image: url("https://i.imgur.com/sn7j1ye.png");
  }
  50% {
    background-image: url("https://i.imgur.com/qCfDNDX.png");
  }
  100% {
    background-image: url("https://i.imgur.com/sn7j1ye.png");
  }
}
#isSpindisable {
  display: none;
  margin-top: -2px;
}
</style>

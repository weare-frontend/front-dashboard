<template>
  <div>
    <!-- <page-info /> -->
    <div class="container">
      <b-modal
        id="modal-exchange"
        ref="modal-exchange"
        centered
        content-class="rounded"
        header-class="shadow"
        footer-class="shadow"
        no-close-on-backdrop
        body-class="bg-body-modal"
      >
        <template v-slot:modal-header="{ close }">
          <h5 class="text-center text-dark w-100">
            แลกเครดิตฟรีเข้าเกม
          </h5>
          <i
            class="f7-icons text-white multiply-circle"
            @click="$bvModal.hide('modal-exchange')"
            >multiply_circle</i
          >
        </template>
        <template v-slot:modal-footer="{ cancel }">
          <div class="row justify-content-center">
            <div class="col-6">
              <button
                type="button"
                class="btn text-white py-2 px-4 bg-button-cc"
                @click="$bvModal.hide('modal-exchange')"
              >
                ยกเลิก
              </button>
            </div>
            <div class="col-6">
              <button
                type="button"
                @click="$refs['modal-download'].show()"
                class="btn btn-block py-2 px-4 btn-outline-secondary bg-button-cf"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </template>
        <div
          class="row mt-3 justify-content-center"
          v-if="$route.name != 'dashboard-withdraw'"
        >
          <div class="col-4 text-center mb-1">
            <h6 class="m-0 w-100 mb-2" style="white-space: nowrap; color: #fff">
              กระเป๋าเครดิตฟรี
            </h6>
            <img
              class="mb-1"
              src="~/assets/img/wallet.png"
              style="height: 80px; padding: 1px"
            />
            <h6 class="text-white">
              {{ $auth.user.credit_bonus | toCurrencyString }}
            </h6>
          </div>
          <div class="f7-demo-icon">
            <i
              class="icon-intab-ani-ltr text-white f7-icons"
              style="margin-top: 4.5rem"
              >arrow_right_circle</i
            >
          </div>
          <div class="col-4 text-center mb-1">
            <h6 class="m-0 w-100 mb-2" style="white-space: nowrap; color: #fff">
              ยอดเงินในเกม
            </h6>
            <img
              class="mb-1"
              src="~/assets/img/coin.png"
              style="height: 80px; padding: 1px"
            />
            <h6 class="text-white mb-1">
              {{ $auth.user.money | toCurrencyString }} 
            </h6>
          </div>

          <div class="position-absolute icon-exchange">
            <span class="text-muted"></span>
            <!-- <i class="f7-icons text-template">chevron_left_2</i> -->
          </div>
        </div>
        <b-modal
          id="modal-download"
          ref="modal-download"
          centered
          content-class="rounded"
          header-class="shadow"
          body-class="bg-body-modal"
          footer-class="shadow"
          no-close-on-backdrop
        >
          <template v-slot:modal-header="{ close }">
            <i
              class="f7-icons text-white multiply-circle2"
              @click="$bvModal.hide('modal-download')"
              >multiply_circle</i
            >
            <p
              class="text-dark text-center w-100"
              style="font-weight: 100; font-size: 18px;"
            >
              ยืนยันแลกเครดิตฟรี
            </p>
          </template>
          <template v-slot:modal-footer="{ cancel }">
            <div class="row justify-content-center">
              <div class="col-6">
                <button
                  type="button"
                  class="btn text-white py-2 px-4 bg-button-cc"
                  @click="$bvModal.hide('modal-download')"
                >
                  ยกเลิก
                </button>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  @click="exchangeCredit"
                  class="btn btn-block btn-outline-secondary py-2 px-4 bg-button-cf"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </template>
          <div
            class="row justify-content-center"
            v-if="this.$auth.user.game.toLowerCase() != 'csroyale'"
          >
            <div class="col-12 text-center">
              <span class="material-icons fs-75 text-danger"
                >error_outline</span
              >
            </div>
            <div class="col-12 text-center mb-2 text-white" style="margin-bottom: -5px">
              <h5>คุณต้องการแลกเครดิตฟรีใช่หรือไม่ ?</h5>
              <label>เครดิตฟรีไม่สามารถนำไปเล่นเกมประเภทออนไลน์ได้</label>
              <p>
                <small class="text-danger" font-size="10px"
                  >หมายเหตุ :
                  หากทำผิดเงื่อนไขเครดิตจะถูกตัดออกทั้งหมดทันที</small
                >
              </p>
            </div>
          </div>

          <div class="row justify-content-center" v-else>
            <div class="col-12 text-center">
              <span class="material-icons fs-75 text-danger"
                >error_outline</span
              >
            </div>
            <div
              class="col-12 text-center text-template mb-2"
              style="margin-bottom: -5px"
            >
              <label style="color: white"
                >คุณต้องการแลกเครดิตฟรีใช่หรือไม่ ?</label
              >
            </div>
            <!-- <div class="col-4">
              <button
                type="button"
                @click="exchangeCredit"
                class="btn btn-block btn-outline-secondary bg-black text-white"
              >ยืนยัน</button>
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-block btn-light text-white"
                @click="$bvModal.hide('modal-download')"
              >ยกเลิก</button>
            </div> -->
          </div>
        </b-modal>

        <div class="row justify-content-center">
          <div class="col-9 mt-1">
            <div class="form-group mx-3">
              <!-- <label for="" class="text-template">จำนวนเงิน</label> -->
              <input
                type="number"
                ref="exchange"
                placeholder="จำนวนเงิน"
                class="text-center text-template form-control rounded"
              />
            </div>
          </div>
        </div>
      </b-modal>
      <div class="container" v-if="getSettingObject.show_announce">
        <div class="marquees-text">
          <p v-html="getSettingObject.text_announce"></p>
        </div>
      </div>
      <div class="container-sm" style="max-width: 500px">
        <div
          class="mt-4 mt-md-4 fetch-main"
          v-if="$route.name != 'dashboard-withdraw'"
        >
          <div class="mb-2 d-flex align-items-center">
            <div class="card card-body mx-2 pb-2 shadow" ref="formInfoUser">
              <div class="row justify-content-center">
                <div class="fetch justify-content-center">
                  <button
                    class="btn btn-default border-1 btn-rounded-54 p-1 shadow"
                    @click="fetchUser"
                  >
                    <i
                      class="material-icons text-template size-20 bg-white"
                      :class="{ spin: isSpin }"
                      style="border-radius: 50%; filter: opacity(0.6)"
                      >refresh</i
                    >
                  </button>
                </div>
                <div class="col-12 mb-0 mt-2 text-center">
                  <span class="text-template">
                    <h5 class="font-weight-100">ยอดเงินในเกม</h5>
                    <h4 class="text-template font-weight-100 size-22">
                      {{ $auth.user.money | toCurrencyString }}
                    </h4>
                  </span>
                  <!-- <button class="btn small material-icons text-template size-10 radius-20">เติมเงินนอัตโนมัติ</button> -->
                </div>
                <div
                  class="col-12 text-center pt-2"
                  style="border-top: 1px solid #e4e9f0"
                >
                  <div
                    class="row text-template justify-content-center d-flex align-items-center"
                  >
                    <div
                      class="bg-template"
                      style="position: absolute;width: 60px;left: 2%;border-radius: 50%;"
                    >
                      <img
                        src="~/assets/icon/Wallet-revert.png"
                        class="w-100"
                        style="filter: invert(1)"
                      />
                    </div>
                    <div class="text-center w-100" style="height: 80px">
                      <h6 class="font-weight-100 my-2">กระเป๋าเครดิตฟรี</h6>
                      <h4
                        class="text-template font-weight-100 size-22"
                        style="position: absolute;padding: 1px;right: 3%;width: 70%;"
                      >
                        {{ $auth.user.credit_bonus | toCurrencyString }}
                        <button
                          class="btn small font-weight-100 text-template size-13 radius-20 py-0 px-1"
                          style="margin-left: 5%"
                          @click="modalExchange"
                        >
                          โอนเครดิต
                        </button>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-sm" style="max-width: 500px">
      <div
        class="bg-shadow-menu-right bg-white row text-center pt-2 mt-3 justify-content-center"
      >
        <div
          class="col-3 bg-shadow p-0"
          id="btn-topup"
        >
          <nuxt-link :to="{ name: 'dashboard-deposit' }">
            <div class="border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <!-- <i class="f7-icons size-22">money_dollar_circle</i> -->
                    <!-- <i class="f7-icons" style="position:absolute;">device_tablet_portrait</i> -->
                    <img
                      src="~/assets/icon/Deposit-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <div>
                  <small
                    style="white-space: nowrap"
                    class="text-template mb-0 font-weight-100 size-14"
                    >เติมเงิน</small>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="col-3 p-0" id="btn-withdraw">
          <nuxt-link :to="{ name: 'dashboard-withdraw' }">
            <div class="border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <img
                      src="~/assets/icon/Withdraw-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <small
                  style="white-space: nowrap"
                  class="text-template mb-0 font-weight-100 size-14"
                  >ถอนเงิน</small
                >
                <!-- <p class="text-secondary text-mute small">สามารถถอนเงินออกจากระบบได้</p> -->
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="col-3 p-0" id="btn-promotion">
          <nuxt-link :to="{ name: 'dashboard-promotions' }">
            <div class="border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <img
                      src="~/assets/icon/Promotion-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <small
                  style="white-space: nowrap"
                  class="text-template mb-0 font-weight-100 size-14"
                  >โปรโมชั่น</small
                >
                <!-- <p class="text-secondary text-mute small">แสดงรายชื่อเพื่อนที่ชวนทั้งหมด</p> -->
              </div>
            </div>
          </nuxt-link>
        </div>
        <div
          class="col-3 p-0"
          id="btn-referral"
          v-if="getPromotionObjects[121] && getPromotionObjects[121].status"
        >
          <div class="caadow border-0 mb-0" @click="affiliate()">
            <div class="text-center">
              <div class="border-0">
                <div class="overlay bg-template mb-0 mx-auto">
                  <img
                    src="~/assets/icon/Affilate-revert.png"
                    class="icon-template"
                  />
                </div>
              </div>
              <small
                style="white-space: nowrap"
                class="text-template mb-0 font-weight-100 size-14"
                >ชวนเพื่อน</small
              >
            </div>
          </div>
        </div>
        <div class="col-3 p-0" v-else-if="getPromotionObjects[101].status">
          <nuxt-link :to="{ name: 'dashboard-affiliate' }">
            <div class="border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <img
                      src="~/assets/icon/Affilate-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <small
                  style="white-space: nowrap"
                  class="text-template mb-0 font-weight-100 size-14"
                  >ชวนเพื่อน</small
                >
                <!-- <p class="text-secondary text-mute small">สามารถแลกเป็นของรางวัลได้</p> -->
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="col-3 p-0" id="btn-referral" v-else>
          <div class="caadow border-0 mb-0">
            <div class="text-center">
              <div class="border-0">
                <div
                  class="overlay bg-template mb-0 mx-auto"
                  style="filter: brightness(0.4)"
                >
                  <img
                      src="~/assets/icon/Affilate-revert.png"
                    class="icon-template"
                  />
                </div>
              </div>
              <small
                style="white-space: nowrap"
                class="text-template mb-0 font-weight-100 size-14"
                >ชวนเพื่อน</small
              >
              <!-- <p class="text-secondary text-mute small">กดแชร์ facebook รับครดิตทันที</p> -->
            </div>
          </div>
        </div>

      </div>
      <div
        class="bg-shadow-menu-left bg-white row text-center justify-content-center mt-3 pt-2"
      >
        <div
          class="col-3 p-0"
          id="btn-reward"
          v-if="getPromotionObjects[102].status"
        >
          <nuxt-link :to="{ name: 'dashboard-point' }">
            <div class="border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <img
                      src="~/assets/icon/Reward-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <small
                  style="white-space: nowrap"
                  class="text-template mb-0 font-weight-100 size-14"
                  >สะสมแต้ม</small
                >
                <!-- <p class="text-secondary text-mute small">สามารถรับของรางวัลต่าง ๆ ได้เมื่อฝากทุกวัน</p> -->
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="col-3 p-0" id="btn-reward" v-else>
          <div class="caadow border-0 mb-0">
            <div class="text-center">
              <div class="border-0">
                <div
                  class="overlay bg-template mb-0 mx-auto"
                  style="filter: brightness(0.4)"
                >
                  <img
                    src="~/assets/icon/Reward-revert.png"
                    class="icon-template"
                  />
                </div>
              </div>
              <small
                style="white-space: nowrap"
                class="text-template mb-0 font-weight-100 size-14"
                >สะสมแต้ม</small
              >
              <!-- <p class="text-secondary text-mute small">กดแชร์ facebook รับครดิตทันที</p> -->
            </div>
          </div>
        </div>

        <div
          class="col-3 p-0"
          id="btn-topup-daily"
          v-if="getPromotionObjects[106].status"
        >
          <nuxt-link :to="{ name: 'dashboard-daily' }">
            <div class="border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <img
                      src="~/assets/icon/Daily-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <small
                  style="white-space: nowrap"
                  class="text-template mb-0 font-weight-100 size-14"
                  >ฝากประจำ</small
                >
                <!-- <p class="text-secondary text-mute small">สามารถรับของรางวัลต่าง ๆ ได้เมื่อฝากทุกวัน</p> -->
              </div>
            </div>
          </nuxt-link>
        </div>

        <div class="col-3 p-0" v-else>
          <div class="border-0 mb-0">
            <div class="text-center">
              <div class="border-0">
                <div
                  class="overlay bg-template mb-0 mx-auto"
                  style="filter: brightness(0.4)"
                >
                  <img
                    src="~/assets/icon/Daily-revert.png"
                    class="icon-template"
                  />
                </div>
              </div>
              <small
                style="white-space: nowrap"
                class="text-template mb-0 font-weight-100 size-14"
                >ฝากประจำ</small
              >
              <!-- <p class="text-secondary text-mute small">ยอดฝากที่รับโบนัส มีกิจกรรมแจกฟรีมากมมาย</p> -->
            </div>
          </div>
        </div>

        <div
          class="bg-shadow col-3 p-0"
          id="btn-luckywheel"
          v-if="getPromotionObjects[111].status"
        >
          <nuxt-link :to="{ name: 'dashboard-activity-wheel' }">
            <div class="caadow border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <img
                      src="~/assets/icon/Wheel-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <small
                  style="white-space: nowrap"
                  class="text-template mb-0 font-weight-100 size-14"
                  >วงล้อลุ้นโชค</small
                >
                <!-- <p class="text-secondary text-mute small">กดแชร์ facebook รับครดิตทันที</p> -->
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="col-3 p-0" v-else>
          <div class="caadow border-0 mb-0">
            <div class="text-center">
              <div class="border-0">
                <div
                  class="overlay bg-template mb-0 mx-auto"
                  style="filter: brightness(0.4)"
                >
                  <img
                    src="~/assets/icon/Wheel-revert.png"
                    class="icon-template"
                  />
                </div>
              </div>
              <small
                style="white-space: nowrap"
                class="text-template mb-0 font-weight-100 size-14"
                >วงล้อลุ้นโชค</small
              >
              
            </div>
          </div>
        </div>

        <div
          class="col-3 p-0"
          id="btn-activity"
          v-if="
            this.getPromotionObjects[111].status ||
            this.getPromotionObjects[103].status ||
            this.getPromotionObjects[116].status ||
            this.getPromotionObjects[126].status
          "
        >
          <nuxt-link :to="{ name: 'dashboard-activity' }">
            <div class="caadow border-0 mb-0">
              <div class="text-center">
                <div class="border-0">
                  <div class="overlay bg-template mb-0 mx-auto">
                    <img
                      src="~/assets/icon/Event-revert.png"
                      class="icon-template"
                    />
                  </div>
                </div>
                <small
                  style="white-space: nowrap"
                  class="text-template mb-0 font-weight-100 size-14"
                  >กิจกรรม</small
                >
                <!-- <p class="text-secondary text-mute small">กดแชร์ facebook รับครดิตทันที</p> -->
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="col-3 p-0" id="btn-activity" v-else>
          <div class="caadow border-0 mb-0">
            <div class="text-center">
              <div class="border-0">
                <div
                  class="overlay bg-template mb-0 mx-auto"
                  style="filter: brightness(0.4)"
                >
                  <img
                    src="~/assets/icon/Event-revert.png"
                    class="icon-template"
                  />
                </div>
              </div>
              <small
                style="white-space: nowrap"
                class="text-template mb-0 font-weight-100 size-14"
                >กิจกรรม</small
              >
              <!-- <p class="text-secondary text-mute small">กดแชร์ facebook รับครดิตทันที</p> -->
            </div>
          </div>
        </div>
      </div>
      <!-- Carousel -->
      <div class="row py-3 mb-5">
        <div style="width: 100%; margin-left: auto; margin-right: auto">
          <carousel-3d
            :display="3"
            :autoplay="true"
            :autoplay-timeout="2400"
            :height="360"
            class="width c-bill"
           
          >
            <slide v-for="(item, i) in promotionArray" :index="i" :key="i">
              <img
                :src="item.img"
                class="w-100"
                alt="promotion"
                style="overflow: hidden"
              />
            </slide>
          </carousel-3d>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.w-50 {
  width: 50%;
}

.carousel-indicators li {
  border-radius: 50%;
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  margin-left: 3px;
  text-indent: -999px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: 0.5;
  transition: opacity 0.6s ease;
}

.modal-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

.size-9 {
  font-size: 9px;
}

.size-10 {
  font-size: 10px;
}

.size-12 {
  font-size: 12px;
}

.size-14 {
  font-size: 14px;
}

.size-16 {
  font-size: 16px;
}

.size-18 {
  font-size: 18px;
}

.size-20 {
  font-size: 20px;
}

.size-21 {
  font-size: 21px;
}

.size-22 {
  font-size: 22px;
}

.size-24 {
  font-size: 24px;
}

.size-25 {
  font-size: 25px;
}

.size-30 {
  font-size: 30px;
}

.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  /* Fix of Webkit flickering */
  z-index: 1;
  height: 100px;
}

.swiper-container-no-flexbox .swiper-slide {
  float: left;
}

.swiper-container-vertical > .swiper-wrapper {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  -o-transition-property: transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

.swiper-container-android .swiper-slide,
.swiper-wrapper {
  -webkit-transform: translate3d(0px, 0, 0);
  transform: translate3d(0px, 0, 0);
}

.swiper-container-multirow > .swiper-wrapper {
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.swiper-container-free-mode > .swiper-wrapper {
  -webkit-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  margin: 0 auto;
}

.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  -o-transition-property: transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
}

png {
  background-color: ccc;
  background-image: url("https://pngshare.com/i/9Eo.png");
  background-position: center;
  background-size: 100%;
}

a.list-group-item:hover {
  color: #ffffff !important;
  background: #ffffff2e !important;
}

a {
  text-decoration: none !important;
}

input,
textarea {
  user-select: auto;
}

.swiper-init {
  height: 600px;
}

.ribbontwo {
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;
}

.ribbontwo span {
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#9bc90d 0%, #79a70a 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  right: -21px;
}

.ribbontwo span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #79a70a;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}

.ribbontwo span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #79a70a;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}

.ribbon {
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;
}

.ribbon span {
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#f70505 0%, #8f0808 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  right: -21px;
}

.ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #8f0808;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #8f0808;
}

.ribbon span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #8f0808;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #8f0808;
}

.icon-template {
  width: 60px;
  height: 60px;
  margin-top: -2px;
  margin-left: -2px;
  border-radius: 50%;
  /* filter: invert(1);*/
  filter: brightness(50);
}

.theme-dark .icon-template {
  width: 100%;
  filter: invert(0);
}

img.img-fluid.w-100.d-block {
  width: 25%;
  margin: auto;
}

.parallax {
  border: solid 0px #222;
  position: absolute;
  transform: rotate(45deg);
  height: 200px;
  width: 200px;
  left: -25%;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 43px #000000;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  backdrop-filter: saturate(125%) blur(10px);
}

.logo-detail {
  width: 60%;
  max-width: 250px;
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

.gogame {
  -webkit-animation-duration: 1.4s;
  /* Safari 4.0 - 8.0 */
  -webkit-animation: rotater 1.4s infinite;
  animation: rotater 1.4s infinite;
  animation-duration: 1.4s;
}

@keyframes rotater {
  0% {
    transform: rotate(0deg);
  }

  10% {
    -webkit-transform: rotate(-30deg);
  }

  34% {
    -webkit-transform: rotate(-30deg);
  }

  35% {
    transform: rotate(0deg);
  }

  40% {
    -webkit-transform: rotate(30deg);
  }

  45% {
    transform: rotate(0deg);
  }

  46% {
    margin-top: -2px;
    margin-bottom: 2px;
  }

  48% {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>

<script>
import Info from "~/components/Info.vue";
import Promotions from "~/components/Promotions.vue";
import Color from "~/components/Color.vue";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  head() {
    return {
      title: "Home",
      pathimg: process.env.API,
    };
  },
  data() {
    return {
      mobileslide: [
        {
          img: "Slide-mobile-01.png",
        },
        {
          img: "Slide-mobile-02.png",
        },
        {
          img: "Slide-mobile-03.png",
        },
      ],
      dataImg: [],
      isSpin: false,
    };
  },
  asyncData: async function ({ $axios, env }) {},
  components: {
    "page-info": Info,
    "page-promotions": Promotions,
    "page-color": Color,
  },
  computed: {
    getImageButtonGame: function () {
      let game = this.colors.find(
        (item) => item.name == this.gameName.toLowerCase()
      );
      return game ? game.image : null;
    },
    getSettingObject: function () {
      return this.$store.getters.getSettingObject;
    },
    getPromotionObjects: function () {
      return this.$store.getters.getPromotionObjects;
    },
    getPromotionActives: function () {
      return this.$store.getters.getPromotionActives;
    },
  },
  mounted: async function () {
    this.$nextTick(() => {
      if (this.proSheare && this.proSheare.data) {
        let shareUrl = JSON.parse(this.proSheare.data.values_json);
        window.fbAsyncInit = function () {
          FB.init({
            appId: shareUrl.appID,
            autoLogAppEvents: true,
            xfbml: true,
            version: "v6.0",
          });
        };
      }
    });
  },
  async asyncData({ $axios, $auth, env, isAndroid, isIos, isDesktop }) {
    const promotionDataArray = await $axios.$get(
      "/api/get-promotion/get-all-path-photo"
    );
    const checkProSheare = await $axios.$get(
      "api/free-bonus/check-pro-facebookshare"
    );

    let promotionArray = promotionDataArray.data.map((item) => {
      item.img = env.API + item.img;
      return item;
    });
    return {
      promotionArray: promotionArray,
      lunchGameUrlMoblie: null,
      lunchGameUrlWeb: null,
      proSheare: checkProSheare,
    };
  },
  methods: {
    setThemeColor: async function (color) {
      await this.$store.dispatch("SET_THEME_COLOR", color);
    },
    setThemeBackground: async function (e) {
      await this.$store.dispatch("SET_THEME_BACKGROUND", e.target.value);
    },
    checkProShare() {
      this.$store.dispatch("setLoading", true);
      this.$axios
        .$post("api/free-bonus/check-pro-facebookshare", "")
        .then((response) => {
          this.check103 = response;
        });
    },
    // async facebookShare() {
    //   let shareUrl = JSON.parse(this.proSheare.data.values_json);
    //   var self = this;
    //   await this.$axios
    //     .$get("api/free-bonus/check-topup-facebook")
    //     .then(response => {
    //       if (response.success) {
    //         FB.ui(
    //           {
    //             method: "feed",
    //             link: shareUrl.url
    //           },
    //           function(response) {
    //             if (response) {
    //               if (response.length == 0) {
    //                 self.$axios
    //                   .$get("api/free-bonus/get-credit-facebook")
    //                   .then(response => {
    //                     if (response.success) {
    //                       self.$toast.global.success({
    //                         message: response.message
    //                       });
    //                     } else {
    //                       self.$toast.global.error({
    //                         message: response.message
    //                       });
    //                     }
    //                   });
    //               }
    //             } else {
    //               self.$toast.global.error({
    //                 message: "คุณแชร์ Facebook ไม่สำเร็จ !!"
    //               });
    //             }
    //           }
    //         );
    //       } else {
    //         self.$toast.global.error({ message: response.message });
    //       }
    //     });
    // },

    // รับเคดิตฟรี
    // this.$auth.fetchUser(); อัปเดต
    async freecredit() {
      var self = this;
      await this.$axios.$get("api/free-bonus/").then((response) => {
        if (response.success) {
          this.$auth.fetchUser();
          self.$toast.global.success({
            message: response.message,
          });
        } else {
          self.$toast.global.error({
            message: response.message,
          });
        }
      });
    },
    async affiliate() {
      this.$axios
        .$get("api/get-link-affiliate")
        .then((response) => {
          if (response.success === true) {
            // let url = response.link_front;
            // window.open(url,'_blank');
            this.$toast.global.success({
              message: "กรุณารอสักครู่...",
            });
            window.location.href = response.link_front;
          } else {
            this.$toast.global.error({
              message: "ไม่สามารถใช้งานได้ กรุณาแจ้งพนักงาน",
            });
          }
        })
        .catch((error) => {
          this.$toast.global.error({
            message: "ไม่สามารถใช้งานได้ กรุณาแจ้งพนักงาน",
          });
        });
    },

    fetchUser: function () {
      const loader = this.$loading.show({
        "is-full-page": true,
      });
      this.isSpin = true;
      this.$auth
        .fetchUser()
        .then((res) => {
          this.$toast.global.success({
            message: "อัพเดทข้อมูลเรียบร้อย",
          });
          this.isSpin = false;
          loader.hide();
        })
        .catch((e) => {
          this.isSpin = false;
          loader.hide();
        });
    },
    modalExchange: function () {
      this.$refs["modal-exchange"].show();
    },
    exchangeCredit: async function () {
      const loader = this.$loading.show({
        "is-full-page": true,
      });
      // const loader = this.$loading.show({ container: this.$refs.formInfoUser });
      const { success, message } = await this.$axios.$post("/api/topup-bonus", {
        val: this.$refs.exchange.value,
      });
      if (success) {
        this.$root.$emit("bv::toggle::collapse", "collapse-exchange");
        this.$refs.exchange.value = "";
        this.$auth.fetchUser();
        this.$toast.global.success({
          message: message,
        });
        loader.hide();
        this.$refs['modal-download'].hide()
        this.$refs['modal-exchange'].hide()
        } else {
        this.$refs['modal-download'].hide()
        this.$refs.exchange.focus();
        this.$toast.global.error({
          message: message,
        });
        loader.hide();
      }
    },
  },
};
</script>

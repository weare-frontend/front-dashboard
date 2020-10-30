<template>
  <div v-if="$auth.loggedIn">
    <div class="sidebar bg-template">
      <div class="mt-4 mb-3">
        <div class="row">
          <div class="col-auto">
            <figure class="avatar avatar-60 border-0" style="border-radius: 50%;">
              <i class="f7-icons text-template size-30">suit_spade_fill</i>
            </figure>
          </div>
          <div class="col pl-0 align-self-center" v-if="$auth.loggedIn">
            <h5 class="mb-1">{{ $auth.user.fullname }}</h5>
            <p class="text-mute small">{{ $auth.user.agent_name }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="list-group main-menu">
            <nuxt-link
              :to="{ name : 'dashboard' }"
              class="list-group-item list-group-item-action close-menu text-template"
            >
              <i class="material-icons icons-raised">home</i>หน้าแรก
            </nuxt-link>
            <nuxt-link
              :to="{ name : 'dashboard-deposit' }"
              class="list-group-item list-group-item-action close-menu text-template"
            >
              <i class="material-icons icons-raised">account_balance_wallet</i>เติมเงิน
            </nuxt-link>
            <nuxt-link
              :to="{ name : 'dashboard-withdraw' }"
              class="list-group-item list-group-item-action close-menu text-template"
            >
              <i class="material-icons icons-raised">account_balance</i>ถอนเงิน
            </nuxt-link>
            <nuxt-link
              :to="{ name : 'dashboard-profile' }"
              class="list-group-item list-group-item-action close-menu text-template"
            >
              <i class="material-icons icons-raised">account_circle</i>ข้อมูลส่วนตัว
            </nuxt-link>
            <a
              target="_blank"
              :href="getSettingObject.link_front"
              class="list-group-item list-group-item-action close-menu text-template"
            >
              <i class="material-icons icons-raised">language</i>เข้าสู่เว็บไซต์
            </a>
            <!-- <a
              v-b-modal.modalColor
              class="list-group-item list-group-item-action close-menu text-template"
            >
              <i class="material-icons icons-raised">invert_colors</i>เปลี่ยนสีธีม
            </a> -->
            <a @click="userLogout" class="list-group-item list-group-item-action close-menu">
              <i class="material-icons icons-raised bg-red">power_settings_new</i>ออกจากระบบ
            </a>
          </div>
        </div>
      </div>
    </div>

    <a href="javascript:void(0)" class="closesidemenu border-2" style="width: auto;">
      <i class="material-icons icons-raised shadow text-white">close</i>
    </a>
    <b-modal
      id="modal-logout"
      ref="modal-logout"
      centered
      content-class="rounded"
      header-class="shadow"
      no-close-on-backdrop
    >
      <template v-slot:modal-header="{ close }">
        <i
          class="f7-icons"
          style="position:absolute;right:10px;color:#ec1415;"
          @click="$bvModal.hide('modal-logout')"
        >multiply</i>
        <h6 class="text-center m-0 w-100">ยืนยันออกจากระบบ</h6>
      </template>
      <div class="row">
        <div class="col-12 text-center">
          <span class="material-icons fs-75 text-danger">power_settings_new</span>
        </div>
        <div class="col-12 text-center">
          <p class="text-black">ต้องการออกจากระบบ หรือไม่?</p>
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel }">
        <div class="row w-100 justify-content-center">
          <div class="col-6">
            <button
              type="button"
              class="btn bg-white text-body btn-block btn-outline-secondary"
              @click="cancel()"
            >ยกเลิก</button>
          </div>
          <div class="col-6">
            <button
              type="button"
              @click="userLogout"
              class="btn btn-block btn-outline-secondary bg-black text-white"
            >ยืนยัน</button>
          </div>
        </div>
      </template>
    </b-modal>
    <!-- <div class="marquees-text" v-if="getSettingObject.show_announce">
      <p v-html="getSettingObject.text_announce"></p>
    </div>-->
  </div>
</template>


<script>
export default {
  computed: {
    linkLine: function (params) {
      return "http://line.me/ti/p/" + this.$auth.user.line_agent;
    },
    getSettingObject: function () {
      return this.$store.getters.getSettingObject;
    },
    getThemeObjectBackground: function () {
      return this.$store.getters.getThemeObjectBackground;
    },
  },
  methods: {
    userLogout: async function () {
      this.$nuxt.$loading.start();
      this.$toast.global.success({
        message: "ออกจากระบบสำเร็จแล้ว",
      });
      this.$auth.logout();
      if (
        this.getSettingObject.link_front &&
        !this.getSettingObject.link_front.includes("localhost")
      ) {
        window.location.replace(this.getSettingObject.link_front);
      }
    },
    // setThemeColor: async function(color) {
    //   await this.$store.dispatch("SET_THEME_COLOR", color);
    // },
    // setThemeBackground: async function(e) {
    //   await this.$store.dispatch("SET_THEME_BACKGROUND", e.target.value);
    // }
  },
};
</script>

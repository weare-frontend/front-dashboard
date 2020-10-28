<template>
  <div class="bg-black">
    <page-sidebar />
    <div class="wrapper homepagen" style="min-height: 115vh; " >
      <page-header />
      <nuxt />
      <page-footer />
      <!-- <div class="x-ocean">
        <div class="-live-chat-container">
          <a v-b-toggle.collapse-color>
            <i class="material-icons icons-raised text-template">invert_colors</i>
          </a>
        </div>
        <b-collapse id="collapse-color" class="mx-5">
          <div class="row justify-content-center">
            <div class="col-12">
              <i
                class="f7-icons"
                style="position:absolute;right:0px; margin-top:-30px;color:#ec1415;"
                v-b-toggle.collapse-color
              >multiply</i>
              <div class="text-center theme-color justify-content-center">
                <button
                  class="m-2 btn red-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('red-theme')"
                  data-theme="red-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn blue-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('blue-theme')"
                  data-theme="blue-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn yellow-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('yellow-theme')"
                  data-theme="yellow-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn green-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('green-theme')"
                  data-theme="green-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn pink-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('pink-theme')"
                  data-theme="pink-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn orange-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('orange-theme')"
                  data-theme="orange-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn purple-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('purple-theme')"
                  data-theme="purple-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn deeppurple-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('deeppurple-theme')"
                  data-theme="deeppurple-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn lightblue-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('lightblue-theme')"
                  data-theme="lightblue-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn teal-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('teal-theme')"
                  data-theme="teal-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn lime-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('lime-theme')"
                  data-theme="lime-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn deeporange-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('deeporange-theme')"
                  data-theme="deeporange-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn gray-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('gray-theme')"
                  data-theme="gray-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
                <button
                  class="m-2 btn black-theme-bg text-white btn-rounded-36 shadow-sm"
                  @click="setThemeColor('black-theme')"
                  data-theme="black-theme"
                >
                  <i class="material-icons w-50">color_lens_outline</i>
                </button>
              </div>
            </div>
           
            <div class="col-6 my-3">
              <select
                class="custom-select form-control form-control-lg text-default"
                style="font-size:12px;height: 29px;"
                @change="setThemeBackground"
              >
                <option value :selected="getThemeObjectBackground != 'theme-dark'">LIGHT</option>
                <option value="theme-dark" :selected="getThemeObjectBackground == 'theme-dark'">DARK</option>
              </select>
            </div>
          </div>
        </b-collapse>
      </div> -->
    </div>
    <Idle v-if="Idle" />
    <!-- <page-notification /> -->
  </div>
</template>
<style>
body {
  border-radius: 0;
  background: #292929;
}
@media screen and (min-width: 641px) {
  .cycle-money {
    position: fixed;
    margin-top: 0px;
  }
}
@media screen and (max-width: 640px) {
  .cycle-money {
    position: fixed;
    margin-top: -15vw;
  }
}
.x-ocean {
  z-index: 999;
  position: fixed;
  bottom: 50%;
  right: -45px;
  padding: 8px;
  overflow: hidden;
  background: hsla(0, 1%, 65%, 0.2);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  backdrop-filter: saturate(125%) blur(10px);
}
.x-ocean:hover {
  z-index: 999;
  position: fixed;
  bottom: 50%;
  right: -15px;
  padding: 8px;
  overflow: hidden;
  background: hsla(0, 1%, 65%, 0.2);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
/* i {
  color: #fff;
} */
</style>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Sidebar from "~/components/Sidebar.vue";
import Loading from "~/components/Loading.vue";
import Notification from "~/components/Notification.vue";
import Idle from "~/components/IdleModal.vue";
import { mapGetters } from "vuex";
export default {
  middleware: ["auth", "lockscreen"],
  head() {
    return {
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "robots", name: "robots", content: "index,follow" },
        {
          property: "description",
          hid: "description",
          name: "description",
          content: this.getSettingObject.title,
        },
        {
          property: "og:description",
          hid: "og:description",
          name: "og:description",
          content: this.getSettingObject.title,
        },
        {
          property: "og:type",
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
      ],
      htmlAttrs: {
        // class: this.getThemeObjectColor + " " + this.getThemeObjectBackground,
      },
    };
  },
  components: {
    "page-header": Header,
    "page-sidebar": Sidebar,
    "page-footer": Footer,
    "page-loading": Loading,
    "page-notification": Notification,
    Idle,
  },
  mounted: async function () {
    // if (this.$device.isDesktop || this.$device.android || this.$device.isIos) {
    //   document.body.scrollTop = 0;
    //   document.documentElement.scrollTop = 0;
    // window.document.addEventListener(
    //   "touchmove",
    //   (e) => {
    //     if (e.scale !== 1) {
    //       e.preventDefault();
    //     }
    //   },
    //   { passive: false }
    // );
    //}
  },
  computed: {
    Idle: function () {
      return this.isAppIdle;
    },
    getSettingObject: function () {
      return this.$store.getters.getSettingObject;
    },
    getThemeObjectColor: function () {
      return this.$store.getters.getThemeObjectColor;
    },
    getThemeObjectBackground: function () {
      return this.$store.getters.getThemeObjectBackground;
    },
  },
  methods: {
    setThemeColor: async function (color) {
      const loader = this.$loading.show({ "is-full-page": true });
      this.$toast.global.success({
        message: "อัพเดทสธีม " + color + " เรียบร้อย",
      });
      await this.$store.dispatch("SET_THEME_COLOR", color);
      setTimeout(function () {
        loader.hide();
      }, 2400);
    },
    setThemeBackground: async function (e) {
      const loader = this.$loading.show({ "is-full-page": true });
      this.$toast.global.success({
        message: "เปลี่ยน Moode เรียบร้อย",
      });
      await this.$store.dispatch("SET_THEME_BACKGROUND", e.target.value);
      setTimeout(function () {
        loader.hide();
      }, 800);
    },
    setThemeDefault: async function () {
      await this.$store.dispatch("SET_THEME_COLOR", "black-theme");
      await this.$store.dispatch("SET_THEME_BACKGROUND", "theme-dark");
    },
  },
};
</script>

